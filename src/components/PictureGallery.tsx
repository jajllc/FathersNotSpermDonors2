import React, { useState } from 'react';
import { Camera, Upload, X, Eye, Clock, CheckCircle, Heart, Users } from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  description: string;
  uploaderName: string;
  status: 'approved' | 'pending';
  uploadDate: string;
}

export const PictureGallery: React.FC = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    uploaderName: '',
    email: '',
    file: null as File | null
  });
  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Initial approved images
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([
    {
      id: '1',
      src: '/images/LakeMichigan01.jpg',
      title: 'Father and Child at Lake Michigan',
      description: 'A beautiful moment captured at Lake Michigan, showing the special bond between father and child.',
      uploaderName: 'Gallery Admin',
      status: 'approved',
      uploadDate: '2025-06-01'
    },
    {
      id: '2',
      src: '/images/LakeMichigan02.png',
      title: 'Peaceful Moments at the Lake',
      description: 'Enjoying a quiet moment by Lake Michigan - these are the memories that matter most.',
      uploaderName: 'Gallery Admin',
      status: 'approved',
      uploadDate: '2025-06-01'
    },
    {
      id: '3',
      src: '/images/LakeMichigan03.jpg',
      title: 'Family Time at Lake Michigan',
      description: 'Creating lasting memories together at Lake Michigan - fathers and children sharing precious moments.',
      uploaderName: 'Gallery Admin',
      status: 'approved',
      uploadDate: '2025-06-01'
    }
  ]);

  const approvedImages = galleryImages.filter(img => img.status === 'approved');
  const pendingImages = galleryImages.filter(img => img.status === 'pending');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setUploadForm(prev => ({ ...prev, file }));
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadForm(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.file || !uploadForm.title || !uploadForm.uploaderName) return;

    // Send notification email to admin
    sendAdminNotification(uploadForm);

    const newImage: GalleryImage = {
      id: Date.now().toString(),
      src: URL.createObjectURL(uploadForm.file),
      title: uploadForm.title,
      description: uploadForm.description,
      uploaderName: uploadForm.uploaderName,
      uploaderEmail: uploadForm.email || '',
      status: 'pending',
      uploadDate: new Date().toISOString().split('T')[0]
    };

    setGalleryImages(prev => [...prev, newImage]);
    setUploadForm({ title: '', description: '', uploaderName: '', file: null });
    setUploadSuccess(true);
    
    setTimeout(() => {
      setUploadSuccess(false);
      setShowUploadModal(false);
    }, 2000);
  };

  const sendAdminNotification = (formData: typeof uploadForm) => {
    // In a real implementation, this would call an API endpoint
    const notificationData = {
      type: 'new_upload',
      uploaderName: formData.uploaderName,
      uploaderEmail: formData.email,
      title: formData.title,
      description: formData.description,
      timestamp: new Date().toISOString(),
      adminEmail: 'admin@fathersrights.org'
    };
    
    // This would typically be sent to your backend API
    console.log('Admin notification sent:', notificationData);
    
    // In production, you might use a service like:
    // - SendGrid for email notifications
    // - Slack webhook for instant notifications
    // - Push notifications for mobile admin apps
    // - SMS alerts for urgent reviews
  };

  const resetUploadModal = () => {
    setShowUploadModal(false);
    setUploadForm({ title: '', description: '', uploaderName: '', email: '', file: null });
    setUploadSuccess(false);
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Camera className="h-12 w-12 text-blue-600 mr-4" />
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Father & Child <span className="text-blue-600">Gallery</span>
            </h2>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium mb-8">
            Share your precious moments and celebrate the beautiful bond between fathers and their children. 
            Every photo tells a story of love, connection, and the irreplaceable role fathers play.
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="accessible-button bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto"
          >
            <Upload className="h-5 w-5" />
            <span>Share Your Photo</span>
          </button>
        </div>

        {/* Approved Gallery */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
            Featured Photos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {approvedImages.map((image) => (
              <div
                key={image.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approved
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{image.title}</h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{image.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>By {image.uploaderName}</span>
                    <span>{new Date(image.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Review Section */}
        {pendingImages.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <Clock className="h-6 w-6 text-amber-600 mr-3" />
              Pending Review
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pendingImages.map((image) => (
                <div
                  key={image.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden opacity-75"
                >
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Pending
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{image.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{image.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>By {image.uploaderName}</span>
                      <span>{new Date(image.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Stats */}
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center justify-center mb-3">
                <Heart className="h-8 w-8 text-red-500 mr-2" />
                <span className="text-3xl font-bold text-gray-900">{approvedImages.length}</span>
              </div>
              <p className="text-gray-600 font-medium">Photos Shared</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-3">
                <Users className="h-8 w-8 text-blue-500 mr-2" />
                <span className="text-3xl font-bold text-gray-900">{new Set(galleryImages.map(img => img.uploaderName)).size}</span>
              </div>
              <p className="text-gray-600 font-medium">Contributors</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-3">
                <Camera className="h-8 w-8 text-green-500 mr-2" />
                <span className="text-3xl font-bold text-gray-900">{pendingImages.length}</span>
              </div>
              <p className="text-gray-600 font-medium">Awaiting Review</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {uploadSuccess ? (
              <div className="p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Photo Submitted!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for sharing your photo. It will be reviewed and added to the gallery once approved.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-6 border-b">
                  <h3 className="text-2xl font-bold text-gray-900">Share Your Photo</h3>
                  <button
                    onClick={resetUploadModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Photo *
                    </label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      {uploadForm.file ? (
                        <div className="space-y-3">
                          <img
                            src={URL.createObjectURL(uploadForm.file)}
                            alt="Preview"
                            className="max-h-32 mx-auto rounded-lg"
                          />
                          <p className="text-sm text-gray-600">{uploadForm.file.name}</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                          <div>
                            <p className="text-gray-600">Drag and drop your photo here, or</p>
                            <label className="text-blue-600 hover:text-blue-700 cursor-pointer font-semibold">
                              click to select
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                      Photo Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      required
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                      className="accessible-input w-full"
                      placeholder="Give your photo a meaningful title"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={3}
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                      className="accessible-input w-full resize-none"
                      placeholder="Tell us about this special moment..."
                    />
                  </div>

                  {/* Uploader Name */}
                  <div>
                    <label htmlFor="uploaderName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="uploaderName"
                      required
                      value={uploadForm.uploaderName}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, uploaderName: e.target.value }))}
                      className="accessible-input w-full"
                      placeholder="How should we credit you?"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="uploaderEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="uploaderEmail"
                      required
                      value={uploadForm.email}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, email: e.target.value }))}
                      className="accessible-input w-full"
                      placeholder="your.email@example.com"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We'll notify you when your photo is reviewed
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={resetUploadModal}
                      className="accessible-button flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!uploadForm.file || !uploadForm.title || !uploadForm.uploaderName || !uploadForm.email}
                      className="accessible-button flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Photo
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 text-center">
                    All photos are reviewed before being added to the gallery to ensure they align with our mission.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Image Detail Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full max-h-96 object-cover"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedImage.title}</h3>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">{selectedImage.description}</p>
              <div className="flex items-center justify-between text-gray-600">
                <span className="font-medium">Shared by {selectedImage.uploaderName}</span>
                <span>{new Date(selectedImage.uploadDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};