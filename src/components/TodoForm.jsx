import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() && !isSubmitting) {
      setIsSubmitting(true);
      await addTodo(text);
      setText('');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-b border-gray-200">
      <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary focus-within:bg-white transition-all duration-200">
        <i className="bi bi-plus-circle text-primary text-xl mr-2"></i>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400"
          disabled={isSubmitting}
        />
        <button 
          type="submit" 
          className={`ml-2 bg-primary hover:bg-indigo-600 text-white px-4 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <span className="loader" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></span>
            </span>
          ) : (
            'Add'
          )}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
