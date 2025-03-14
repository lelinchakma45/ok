import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';
import Loader from './Loader';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        toast.success('Check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        toast.success('Logged in successfully!');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: 'demo@example.com',
        password: 'demo12345',
      });
      
      if (error) throw error;
      toast.success('Logged in with demo account!');
    } catch (error) {
      // If demo account doesn't exist, create it
      try {
        const { error } = await supabase.auth.signUp({
          email: 'demo@example.com',
          password: 'demo12345',
        });
        
        if (error) throw error;
        
        // Auto sign in with the demo account
        await supabase.auth.signInWithPassword({
          email: 'demo@example.com',
          password: 'demo12345',
        });
        
        toast.success('Created and logged in with demo account!');
      } catch (signUpError) {
        toast.error(signUpError.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center">
          <i className="bi bi-check2-circle mr-2"></i>
          Task Master
        </h1>
        <p className="text-gray-600">
          Your tasks, synchronized across all devices.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </h2>
          
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                minLength={6}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-indigo-600 text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
            >
              {loading ? <Loader /> : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-6">
            <button
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
            >
              {loading ? <Loader /> : 'Try Demo Account'}
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary hover:text-indigo-700 text-sm"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Designed by WebSparks AI &copy; {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default Auth;
