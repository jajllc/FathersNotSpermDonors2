import React, { createContext, useContext, useState, useEffect } from 'react';

interface Notification {
  id: string;
  type: 'new_upload' | 'approval_needed' | 'system_alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Send email notification to admin
    sendEmailNotification(newNotification);

    // Show browser notification if permission granted
    if (Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico'
      });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const sendEmailNotification = async (notification: Notification) => {
    // In a real implementation, this would call your backend API
    const emailData = {
      to: 'admin@fathersrights.org',
      subject: `[Gallery Admin] ${notification.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1e40af; color: white; padding: 20px; text-align: center;">
            <h1>Gallery Administration Alert</h1>
          </div>
          <div style="padding: 20px; background: #f9fafb;">
            <h2 style="color: #1f2937;">${notification.title}</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              ${notification.message}
            </p>
            <div style="margin: 20px 0; padding: 15px; background: white; border-left: 4px solid #f59e0b;">
              <strong>Priority:</strong> ${notification.priority.toUpperCase()}<br>
              <strong>Time:</strong> ${new Date(notification.timestamp).toLocaleString()}
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${window.location.origin}/admin" 
                 style="background: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Review in Admin Panel
              </a>
            </div>
          </div>
          <div style="background: #e5e7eb; padding: 15px; text-align: center; color: #6b7280; font-size: 14px;">
            <p>This is an automated notification from the Fathers Rights Gallery system.</p>
          </div>
        </div>
      `
    };

    try {
      // This would be your actual email API call
      console.log('Email notification would be sent:', emailData);
      
      // Example API call (replace with your email service):
      // await fetch('/api/send-notification-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(emailData)
      // });
    } catch (error) {
      console.error('Failed to send email notification:', error);
    }
  };

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Hook for triggering notifications when images are uploaded
export const useImageUploadNotification = () => {
  const { addNotification } = useNotifications();

  const notifyNewUpload = (uploaderName: string, title: string) => {
    addNotification({
      type: 'new_upload',
      title: 'New Photo Uploaded',
      message: `${uploaderName} has uploaded a new photo titled "${title}" that requires review and approval.`,
      priority: 'medium'
    });
  };

  const notifyApprovalNeeded = (count: number) => {
    addNotification({
      type: 'approval_needed',
      title: 'Photos Awaiting Approval',
      message: `You have ${count} photo${count > 1 ? 's' : ''} waiting for review in the admin panel.`,
      priority: count > 5 ? 'high' : 'medium'
    });
  };

  return {
    notifyNewUpload,
    notifyApprovalNeeded
  };
};