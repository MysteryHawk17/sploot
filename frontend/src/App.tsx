import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAppStore } from "./store";
import LandingPage from "./components/Login";
import RegisterPage from "./components/Register";
import BlogsPage from "./components/BlogsPage";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useAppStore((state) => state.user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  const user = useAppStore((state) => state.user);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/blogs" replace /> : <LandingPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/blogs" replace /> : <RegisterPage />}
        />
        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <BlogsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
