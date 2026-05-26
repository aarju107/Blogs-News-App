import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { account } from './appwrite';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const loggedInUser = await account.get();
        setUser(loggedInUser);
      } catch {
        setUser(null);
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, []);

  if (checking) return <div className="text-white p-4">Checking authentication...</div>;

  return user ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
