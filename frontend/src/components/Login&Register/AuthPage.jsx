import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Showcase from "./Showcase";
import AuthTabs from "./AuthTabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./auth.css";

export default function AuthPage({ initialTab = "login" }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const navigate = useNavigate();
  const location = useLocation();
  
  const loginredirectTo = location.state?.from?.pathname || "/";
  const registerredirectTo = location.state?.from?.pathname || "/login";
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  function handleTabChange(tab) {
    setActiveTab(tab);

    navigate(tab === "login" ? "/login" : "/register", {
      replace: true,
      state: location.state,
    });
  }

  return (
    <div className="auth_page">
      <Showcase />

      <main className="auth-panel">
        <div className="auth-card">
          <div className="auth-card__head">
            <h2>Welcome to CampusShare</h2>
            <p>Start your journey of exchanging knowledge</p>
          </div>

          <AuthTabs activeTab={activeTab} onChange={handleTabChange} />

          <LoginForm active={activeTab === "login"} onSwitch={handleTabChange} redirectTo={loginredirectTo} />
          <RegisterForm active={activeTab === "register"} onSwitch={handleTabChange} redirectTo={registerredirectTo} />
        </div>
      </main>
    </div>
  );
}
