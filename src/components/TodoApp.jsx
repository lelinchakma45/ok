import React, { useState, useEffect } from 'react';
import TodoHeader from './TodoHeader';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoStats from './TodoStats';
import TodoFilter from './TodoFilter';
import Footer from './Footer';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';
import Loader from './Loader';

const TodoApp = ({ session }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Fetch todos from Supabase
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('todos')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setTodos(data || []);
      } catch (error) {
        toast.error('Error loading todos: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
    
    // Set up realtime subscription
    const subscription = supabase
      .channel('todos_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'todos',
        filter: `user_id=eq.${session.user.id}`
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setTodos(prev => [payload.new, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setTodos(prev => prev.map(todo => 
            todo.id === payload.new.id ? payload.new : todo
          ));
        } else if (payload.eventType === 'DELETE') {
          setTodos(prev => prev.filter(todo => todo.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [session]);

  const addTodo = async (text) => {
    if (!text.trim()) return;
    
    try {
      const newTodo = {
        user_id: session.user.id,
        text,
        completed: false,
      };
      
      const { error } = await supabase
        .from('todos')
        .insert([newTodo]);
        
      if (error) throw error;
      toast.success('Task added!');
    } catch (error) {
      toast.error('Error adding task: ' + error.message);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ completed: !completed })
        .eq('id', id);
        
      if (error) throw error;
    } catch (error) {
      toast.error('Error updating task: ' + error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      toast.success('Task deleted!');
    } catch (error) {
      toast.error('Error deleting task: ' + error.message);
    }
  };

  const editTodo = async (id, newText) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ text: newText })
        .eq('id', id);
        
      if (error) throw error;
      toast.success('Task updated!');
    } catch (error) {
      toast.error('Error updating task: ' + error.message);
    }
  };

  const clearCompleted = async () => {
    try {
      const completedIds = todos
        .filter(todo => todo.completed)
        .map(todo => todo.id);
        
      if (completedIds.length === 0) return;
      
      const { error } = await supabase
        .from('todos')
        .delete()
        .in('id', completedIds);
        
      if (error) throw error;
      toast.success('Completed tasks cleared!');
    } catch (error) {
      toast.error('Error clearing tasks: ' + error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      toast.error('Error signing out: ' + error.message);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length
  };

  return (
    <div className="max-w-2xl mx-auto">
      <TodoHeader user={session.user} onSignOut={handleSignOut} />
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <TodoForm addTodo={addTodo} />
        <TodoFilter filter={filter} setFilter={setFilter} />
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader />
          </div>
        ) : (
          <TodoList 
            todos={filteredTodos} 
            toggleTodo={toggleTodo} 
            deleteTodo={deleteTodo} 
            editTodo={editTodo}
          />
        )}
        
        <TodoStats stats={stats} clearCompleted={clearCompleted} />
      </div>
      <Footer />
    </div>
  );
};

export default TodoApp;
