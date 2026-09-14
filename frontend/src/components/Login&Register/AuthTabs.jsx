export default function AuthTabs({ activeTab, onChange }) {
  return (
    <div className="auth_tabs">
      <button
        className={`auth_tab${activeTab === "login" ? " active" : ""}`}
        type="button"
        onClick={() => onChange("login")}
      >
        Login
      </button>

      <button
        className={`auth_tab${activeTab === "register" ? " active" : ""}`}
        type="button"
        onClick={() => onChange("register")}
      >
        Create Account
      </button>

      <span className={`auth_tabs__indicator${activeTab === "register" ? " to-register" : ""}`}></span>
    </div>
  );
}
