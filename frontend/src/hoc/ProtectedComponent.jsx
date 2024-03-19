import { useAuth } from '../contexts/AuthContext';

function ProtectedComponent(WrappedComponent, role) {
  function Protected(props) {
    const { user, isLoading, isAuthenticated } = useAuth();

    if (isLoading | !isAuthenticated) return <></>;
    if (role && user.role !== role) return <></>;

    return <WrappedComponent {...props} />;
  }

  return Protected;
}

export default ProtectedComponent;
