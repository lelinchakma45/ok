import React from 'react';

const TodoFilter = ({ filter, setFilter }) => {
  return (
    <div className="flex justify-center p-3 bg-gray-50 border-b border-gray-200">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-4 py-1 text-sm font-medium rounded-l-lg ${
            filter === 'all'
              ? 'bg-primary text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setFilter('active')}
          className={`px-4 py-1 text-sm font-medium ${
            filter === 'active'
              ? 'bg-primary text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Active
        </button>
        <button
          type="button"
          onClick={() => setFilter('completed')}
          className={`px-4 py-1 text-sm font-medium rounded-r-lg ${
            filter === 'completed'
              ? 'bg-primary text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoFilter;
