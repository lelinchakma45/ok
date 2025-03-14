import React, { useState } from 'react';

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async () => {
    if (editText.trim() && editText !== todo.text && !isLoading) {
      setIsLoading(true);
      await editTodo(todo.id, editText);
      setIsLoading(false);
      setIsEditing(false);
    } else {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const handleToggle = async () => {
    if (!isLoading) {
      setIsLoading(true);
      await toggleTodo(todo.id, todo.completed);
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!isLoading) {
      setIsLoading(true);
      await deleteTodo(todo.id);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  // Format the date
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <li className="group hover:bg-gray-50 transition-colors duration-150">
      <div className="px-4 py-3 flex items-center">
        <button
          onClick={handleToggle}
          disabled={isLoading}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-colors duration-200 ${
            isLoading 
              ? 'opacity-50 cursor-not-allowed' 
              : todo.completed
                ? 'bg-success border-success text-white'
                : 'border-gray-300 hover:border-primary'
          }`}
        >
          {isLoading ? (
            <span className="loader" style={{ width: '12px', height: '12px', borderWidth: '2px' }}></span>
          ) : (
            todo.completed && <i className="bi bi-check text-sm"></i>
          )}
        </button>

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-white border border-primary rounded px-2 py-1 focus:outline-none"
            autoFocus
            disabled={isLoading}
          />
        ) : (
          <div className="flex-grow">
            <p
              className={`text-gray-800 ${
                todo.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {todo.text}
            </p>
            <span className="text-xs text-gray-400">
              Added {formatDate(todo.created_at)}
            </span>
          </div>
        )}

        <div className="flex-shrink-0 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {!isEditing && !isLoading && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-primary p-1 rounded"
              title="Edit"
            >
              <i className="bi bi-pencil"></i>
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className={`text-gray-400 hover:text-error p-1 rounded ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title="Delete"
          >
            {isLoading ? (
              <span className="loader" style={{ width: '12px', height: '12px', borderWidth: '2px' }}></span>
            ) : (
              <i className="bi bi-trash"></i>
            )}
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
