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

  // where to send the user after a successful login/register —
  // set by ProtectedRoute when it redirects an unauthorized visitor here
  const redirectTo = location.state?.from?.pathname || "/";

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  function handleTabChange(tab) {
    setActiveTab(tab);
    // carry the redirect state along when switching tabs, so it isn't lost
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

          <LoginForm active={activeTab === "login"} onSwitch={handleTabChange} redirectTo={redirectTo} />
          <RegisterForm active={activeTab === "register"} onSwitch={handleTabChange} redirectTo={redirectTo} />
        </div>
      </main>
    </div>
  );
}
