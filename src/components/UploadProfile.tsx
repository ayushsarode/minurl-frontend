import React, { useState, useRef } from 'react';
import { useAuthStore } from '../store/authStore';

const ProfileComponent: React.FC = () => {
  const { user, uploadProfilePic, logout } = useAuthStore();
  const [isUploading, setIsUploading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await uploadProfilePic(file);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Trigger file selection dialog
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Simulate loading completion
  React.useEffect(() => {
    // Add a small delay to simulate loading user data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w- mx-auto rounded-xl shadow-md overflow-hidden md:max-w-4xl">
        {/* Cover Photo Area - Loading State */}
        <div className="h-50 bg-gradient-to-r from-blue-200 to-indigo-200 animate-pulse"></div>
        
        {/* Profile Content - Loading State */}
        <div className="px-8 pb-8">
          {/* Profile Picture - Loading State */}
          <div className="relative -mt-16 flex justify-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200 animate-pulse"></div>
          </div>
          
          {/* User Info - Loading State */}
          <div className="text-center mt-4">
            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mx-auto mb-2"></div>
            <div className="h-4 w-32 bg-gray-200 rounded-lg animate-pulse mx-auto mb-3"></div>
            
            {/* Status Badge - Loading State */}
            <div className="mt-3 flex justify-center">
              <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Actions Section - Loading State */}
          <div className="mt-8 flex justify-center space-x-4">
            <div className="h-10 w-28 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-10 w-28 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w- mx-auto rounded-xl shadow-md overflow-hidden md:max-w-4xl">
      {/* Cover Photo Area */}
      <div className="h-50 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
      
      {/* Profile Content */}
      <div className="px-8 pb-8">
        {/* Profile Picture with Upload Overlay */}
        <div className="relative -mt-16 flex justify-center">
          <div 
            className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {user?.profile_pic ? (
              <img 
                src={user.profile_pic} 
                alt={`${user.name}'s profile`} 
                className="w-full h-full object-cover"
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
                <span className="text-gray-700 text-3xl font-bold">
                  {user?.name?.charAt(0).toUpperCase() || '?'}
                </span>
              </div>
            )}
            
            {/* Hover Overlay */}
            <div 
              className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-200 ${
                isHovering ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={handleUploadClick}
            >
              <span className="text-white text-sm font-medium">
                {isUploading ? 'Uploading...' : 'Change Photo'}
              </span>
            </div>
          </div>
          
          {/* Hidden File Input */}
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        
        {/* User Info */}
        {user && (
          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600 mt-1">{user.email}</p>
            
            {/* Status Badge */}
            <div className="mt-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                Active
              </span>
            </div>
          </div>
        )}
        
        {/* Actions Section */}
        <div className="mt-8 flex justify-center space-x-4">
          <button 
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors"
            onClick={handleUploadClick}
            disabled={isUploading}
          >
            {isUploading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : 'Update Photo'}
          </button>
          
          <button 
            className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;