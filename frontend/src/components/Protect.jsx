import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Protect({ children, role }) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate('/login');
  }, [isAuthenticated, isLoading]);

  if (isLoading) return <></>;
  if (!isAuthenticated) return <></>;
  if (role && user.role !== role) return <></>;

  return children;
}

export default Protect;
