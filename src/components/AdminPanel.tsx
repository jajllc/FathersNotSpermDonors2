import React, { useState } from 'react';
import { CheckCircle, X, Eye, Clock, Mail, Bell, Trash2 } from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  description: string;
  uploaderName: string;
  uploaderEmail?: string;
  status: 'approved' | 'pending' | 'rejected';
  uploadDate: string;
  reviewDate?: string;
  reviewedBy?: string;
}

interface AdminPanelProps {
  images: GalleryImage[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  images, 
  onApprove, 
  onReject, 
  onDelete 
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const pendingImages = images.filter(img => img.status === 'pending');
  const approvedImages = images.filter(img => img.status === 'approved');
  const rejectedImages = images.filter(img => img.status === 'rejected');

  const handleApprove = (image: GalleryImage) => {
    onApprove(image.id);
    // Send approval email notification
    sendNotificationEmail(image, 'approved');
    setSelectedImage(null);
  };

  const handleReject = (image: GalleryImage) => {
    onReject(image.id);
    // Send rejection email notification
    sendNotificationEmail(image, 'rejected');
    setSelectedImage(null);
  };

  const sendNotificationEmail = (image: GalleryImage, status: 'approved' | 'rejected') => {
    // In a real implementation, this would call an API endpoint
    console.log(`Sending ${status} notification to ${image.uploaderName} at ${image.uploaderEmail}`);
    
    // Simulate email notification
    const subject = status === 'approved' 
      ? `Your photo "${image.title}" has been approved!`
      : `Update on your photo submission "${image.title}"`;
      
    const message = status === 'approved'
      ? `Great news! Your photo "${image.title}" has been approved and is now live in our gallery. Thank you for contributing to our cause!`
      : `Thank you for your submission "${image.title}". While we appreciate your contribution, this particular image doesn't align with our current gallery guidelines. Please feel free to submit other photos.`;
      
    // In production, this would integrate with an email service like SendGrid, Mailgun, etc.
    alert(`Email notification sent to ${image.uploaderName}: ${subject}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Gallery Administration</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Bell className="h-5 w-5" />
                {pendingImages.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {pendingImages.length}
                  </span>
                )}
              </button>
              <div className="text-sm text-gray-600">
                <div>Pending: <span className="font-semibold text-amber-600">{pendingImages.length}</span></div>
                <div>Approved: <span className="font-semibold text-green-600">{approvedImages.length}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Panel */}
        {showNotifications && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Email Notifications
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-800">New uploads trigger instant email alerts to admin@fathersrights.org</span>
                <span className="text-green-600 font-semibold">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-green-800">Approval notifications sent to uploaders automatically</span>
                <span className="text-green-600 font-semibold">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <span className="text-amber-800">Daily digest of pending reviews sent at 9 AM</span>
                <span className="text-green-600 font-semibold">Active</span>
              </div>
            </div>
          </div>
        )}

        {/* Pending Reviews */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Clock className="h-6 w-6 text-amber-600 mr-3" />
            Pending Reviews ({pendingImages.length})
          </h2>
          
          {pendingImages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No images pending review</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingImages.map((image) => (
                <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => setSelectedImage(image)}
                      className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{image.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{image.description}</p>
                    <div className="text-xs text-gray-500 mb-4">
                      <div>By: {image.uploaderName}</div>
                      <div>Uploaded: {new Date(image.uploadDate).toLocaleDateString()}</div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(image)}
                        className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(image)}
                        className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700 transition-colors flex items-center justify-center"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Approved Images */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
            Approved Images ({approvedImages.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {approvedImages.map((image) => (
              <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <h4 className="font-medium text-sm text-gray-900 mb-1">{image.title}</h4>
                  <div className="text-xs text-gray-500">
                    <div>By: {image.uploaderName}</div>
                    <div>Approved: {image.reviewDate ? new Date(image.reviewDate).toLocaleDateString() : 'N/A'}</div>
                  </div>
                  <button
                    onClick={() => onDelete(image.id)}
                    className="mt-2 w-full bg-red-100 text-red-700 py-1 px-2 rounded text-xs hover:bg-red-200 transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Detail Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full max-h-96 object-contain bg-gray-100"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedImage.title}</h3>
              <p className="text-gray-700 text-lg mb-6">{selectedImage.description}</p>
              <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <strong>Uploader:</strong> {selectedImage.uploaderName}
                </div>
                <div>
                  <strong>Upload Date:</strong> {new Date(selectedImage.uploadDate).toLocaleDateString()}
                </div>
                <div>
                  <strong>Status:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    selectedImage.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                    selectedImage.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedImage.status.charAt(0).toUpperCase() + selectedImage.status.slice(1)}
                  </span>
                </div>
              </div>
              
              {selectedImage.status === 'pending' && (
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleApprove(selectedImage)}
                    className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Approve & Notify
                  </button>
                  <button
                    onClick={() => handleReject(selectedImage)}
                    className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <X className="h-5 w-5 mr-2" />
                    Reject & Notify
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};