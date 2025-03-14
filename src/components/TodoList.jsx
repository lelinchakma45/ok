import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, toggleTodo, deleteTodo, editTodo }) => {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <img 
          src="https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" 
          alt="Empty todo list" 
          className="w-40 h-40 object-cover rounded-full mb-4 shadow-md"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/300x300/e2e8f0/a0aec0?text=No+Tasks";
          }}
          crossOrigin="anonymous"
        />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks yet</h3>
        <p className="text-gray-500 max-w-xs">
          Add a new task using the form above to get started on your productivity journey!
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
