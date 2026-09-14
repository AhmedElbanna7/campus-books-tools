import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthPage from "../components/Login&Register/AuthPage";

function Register() {
  const { user, loading } = useAuth();

  if (!loading && user) return <Navigate to="/" replace />;

  return <AuthPage initialTab="register" />;
}

export default Register;
