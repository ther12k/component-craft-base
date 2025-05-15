
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect to dashboard if authenticated, otherwise to login
  return <Navigate to="/login" replace />;
};

export default Index;
