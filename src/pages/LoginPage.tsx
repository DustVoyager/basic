// src/pages/LoginPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/");
  };

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
}
