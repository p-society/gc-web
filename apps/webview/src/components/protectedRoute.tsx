import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const auth = useAuth();
  
  if (!auth) {
    // Handle the case where auth context is not available
    return <Navigate to="/login" />;
  }

  if (!auth.userData) {
    // User is not logged in
    return <Navigate to="/login" />;
  }

  // User is logged in, render the protected component
  return element;
};
