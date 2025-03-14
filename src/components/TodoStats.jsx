import React from 'react';

const TodoStats = ({ stats, clearCompleted }) => {
  return (
    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center text-sm">
      <div className="flex space-x-4">
        <div className="flex items-center">
          <span className="inline-flex items-center justify-center w-5 h-5 bg-primary text-white rounded-full text-xs mr-1">
            {stats.total}
          </span>
          <span className="text-gray-600">Total</span>
        </div>
        <div className="flex items-center">
          <span className="inline-flex items-center justify-center w-5 h-5 bg-success text-white rounded-full text-xs mr-1">
            {stats.completed}
          </span>
          <span className="text-gray-600">Completed</span>
        </div>
        <div className="flex items-center">
          <span className="inline-flex items-center justify-center w-5 h-5 bg-accent text-white rounded-full text-xs mr-1">
            {stats.active}
          </span>
          <span className="text-gray-600">Active</span>
        </div>
      </div>
      
      {stats.completed > 0 && (
        <button
          onClick={clearCompleted}
          className="text-gray-500 hover:text-error transition-colors duration-200"
        >
          Clear completed
        </button>
      )}
    </div>
  );
};

export default TodoStats;
