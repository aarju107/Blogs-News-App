import React, { useState } from 'react';
import { account, ID } from './appwrite';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailTrimmed = email.trim();
    const passwordTrimmed = password.trim();

    if (!emailTrimmed || !passwordTrimmed) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login user
        await account.createEmailPasswordSession(emailTrimmed, passwordTrimmed);
        window.location.href = '/'; // Redirect to home after login
      } else {
        // Register user
        await account.create(ID.unique(), emailTrimmed, passwordTrimmed);
        await account.createEmailPasswordSession(emailTrimmed, passwordTrimmed);
        window.location.href = '/'; // Redirect after register + login
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 text-white p-8 rounded-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        {error && (
          <div className="mb-4 bg-red-700 text-white p-2 rounded">{error}</div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-6 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded text-white font-semibold"
        >
          {loading ? (isLogin ? 'Logging in...' : 'Registering...') : (isLogin ? 'Login' : 'Register')}
        </button>

        <p className="mt-6 text-center text-gray-400">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-500 hover:underline font-semibold"
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Auth;
