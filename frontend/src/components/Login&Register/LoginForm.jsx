import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FormField from "./FormField";
import PasswordInput from "./PasswordInput";
import Checkbox from "./Checkbox";
import SubmitButton from "./SubmitButton";
import { isValidEmail } from "./validation";

export default function LoginForm({ active, onSwitch, redirectTo = "/" }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [note, setNote] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  function clearError(field) {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate() {
    const next = {};

    if (!email.trim()) {
      next.email = "University email is required";
    } else if (!isValidEmail(email)) {
      next.email = "Enter a valid university email";
    }

    if (!password.trim()) {
      next.password = "Password is required";
    } else if (password.trim().length < 6) {
      next.password = "Password must be at least 6 characters";
    }

    return next;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setNote({ text: "", type: "" });

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email: email.trim(),
        password,
      });

      login(res.data.token, res.data.user);
      setNote({ text: "Logged in successfully", type: "success" });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setNote({
        text: err.response?.data?.message || "The university email or password is incorrect",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={`auth-form${active ? " active" : ""}`} id="login" onSubmit={handleSubmit}>
      <FormField id="login-email" label="University Email" icon="fa-solid fa-envelope" error={errors.email}>
        <input
          type="email"
          id="login-email"
          placeholder="name@university.edu.eg"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError("email");
          }}
        />
      </FormField>

      <FormField id="login-password" label="Password" icon="fa-solid fa-lock" error={errors.password}>
        <PasswordInput
          id="login-password"
          value={password}
          placeholder="••••••••"
          onChange={(e) => {
            setPassword(e.target.value);
            clearError("password");
          }}
        />
      </FormField>

      <div className="field field--row">
        <Checkbox id="remember" checked={remember} onChange={(e) => setRemember(e.target.checked)}>
          Remember me
        </Checkbox>

        <a href="#" className="link-muted">Forgot password?</a>
      </div>

      <SubmitButton loading={loading}>Login</SubmitButton>

      <p className={`form-note${note.type ? ` ${note.type}` : ""}`}>{note.text}</p>

      <div className="switch-line">
        Don't have an account?
        <button type="button" data-switch="register" onClick={() => onSwitch("register")}>
          Create Account
        </button>
      </div>
    </form>
  );
}
