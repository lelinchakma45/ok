import React from 'react';

const TodoHeader = ({ user, onSignOut }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-primary flex items-center">
          <i className="bi bi-check2-circle mr-2"></i>
          Task Master
        </h1>
        <button 
          onClick={onSignOut}
          className="flex items-center text-gray-600 hover:text-primary transition-colors"
        >
          <span className="mr-2">Sign Out</span>
          <i className="bi bi-box-arrow-right"></i>
        </button>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex items-center">
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-3">
          <span className="text-lg font-medium">{user.email.charAt(0).toUpperCase()}</span>
        </div>
        <div>
          <p className="text-gray-800 font-medium">Welcome back!</p>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
      </div>
      
      <p className="text-gray-600 text-center">
        Stay organized and boost your productivity with our intuitive todo app. 
        Your tasks are now synced across all your devices.
      </p>
    </div>
  );
};

export default TodoHeader;
