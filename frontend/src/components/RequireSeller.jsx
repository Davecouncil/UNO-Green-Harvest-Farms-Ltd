import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RequireSeller({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user || user.role !== "seller") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}