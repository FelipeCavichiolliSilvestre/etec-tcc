import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute(WrappedComponent, role) {
  function Protected(props) {
    const { user, isLoading, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) navigate('/login');
    }, [isAuthenticated, isLoading]);

    if (isLoading) return <>LOADING</>;
    if (!isAuthenticated) return <>NOT AUTHENTICATED</>;
    if (role && user.role !== role) return <>ROLE</>;

    return <WrappedComponent {...props} />;
  }

  return Protected;
}

export default ProtectedRoute;
