export default function AuthTabs({ activeTab, onChange }) {
  return (
    <div className="tabs">
      <button
        className={`tab${activeTab === "login" ? " active" : ""}`}
        type="button"
        onClick={() => onChange("login")}
      >
        Login
      </button>

      <button
        className={`tab${activeTab === "register" ? " active" : ""}`}
        type="button"
        onClick={() => onChange("register")}
      >
        Create Account
      </button>

      <span className={`tabs__indicator${activeTab === "register" ? " to-register" : ""}`}></span>
    </div>
  );
}
