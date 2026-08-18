import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RequireSeller({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Checking authorization...</div>;
  }

  if (!user || user.role !== "seller") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}