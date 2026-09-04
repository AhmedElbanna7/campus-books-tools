import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;

  return children;
}

export default ProtectedRoute;