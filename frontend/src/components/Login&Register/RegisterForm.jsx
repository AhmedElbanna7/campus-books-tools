import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FormField from "./FormField";
import PasswordInput from "./PasswordInput";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import Checkbox from "./Checkbox";
import SubmitButton from "./SubmitButton";
import { isValidEmail } from "./validation";

const FACULTIES = [
  { value: "engineering", label: "Engineering" },
  { value: "commerce", label: "Commerce" },
  { value: "science", label: "Science" },
  { value: "medicine", label: "Medicine" },
  { value: "arts", label: "Arts" },
];

const INITIAL_FORM = { name: "", email: "", faculty: "", password: "" };

export default function RegisterForm({ active, onSwitch, redirectTo = "/" }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [note, setNote] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate() {
    const next = {};

    if (!form.name.trim()) next.name = "Full name is required";

    if (!form.email.trim()) {
      next.email = "University email is required";
    } else if (!isValidEmail(form.email)) {
      next.email = "Enter a valid university email";
    }

    if (!form.faculty) next.faculty = "Please select your faculty";

    if (!form.password.trim()) {
      next.password = "Password is required";
    } else if (form.password.trim().length < 6) {
      next.password = "Password must be at least 6 characters";
    }

    if (!terms) next.terms = "You must agree to the Terms of Use";

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
      const res = await axios.post("http://localhost:5000/register", {
        name: form.name.trim(),
        email: form.email.trim(),
        faculty: form.faculty,
        password: form.password,
      });

      login(res.data.token, res.data.user);
      setNote({ text: "Account created successfully", type: "success" });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setNote({
        text: err.response?.data?.message || "Something went wrong, please try again",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={`auth-form${active ? " active" : ""}`} id="register" onSubmit={handleSubmit}>
      <FormField id="reg-name" label="Full Name" icon="fa-solid fa-user" error={errors.name}>
        <input
          type="text"
          id="reg-name"
          placeholder="Enter your full name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
      </FormField>

      <FormField id="reg-email" label="University Email" icon="fa-solid fa-envelope" error={errors.email}>
        <input
          type="email"
          id="reg-email"
          placeholder="name@university.edu.eg"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </FormField>

      <FormField id="reg-faculty" label="Faculty" icon="fa-solid fa-graduation-cap" error={errors.faculty}>
        <select id="reg-faculty" value={form.faculty} onChange={(e) => update("faculty", e.target.value)}>
          <option value="" disabled>Select your faculty</option>
          {FACULTIES.map((faculty) => (
            <option key={faculty.value} value={faculty.value}>
              {faculty.label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        id="reg-password"
        label="Password"
        icon="fa-solid fa-lock"
        error={errors.password}
        afterControl={<PasswordStrengthMeter password={form.password} />}
      >
        <PasswordInput
          id="reg-password"
          value={form.password}
          placeholder="••••••••"
          onChange={(e) => update("password", e.target.value)}
        />
      </FormField>

      <div className={`field${errors.terms ? " error" : ""}`}>
        <Checkbox
          id="terms"
          checked={terms}
          onChange={(e) => {
            setTerms(e.target.checked);
            setErrors((prev) => ({ ...prev, terms: "" }));
          }}
        >
          I agree to <a href="#" className="link-inline">Terms of Use</a>
        </Checkbox>

        {errors.terms && <small className="field__error">{errors.terms}</small>}
      </div>

      <SubmitButton loading={loading}>Create Account</SubmitButton>

      <p className={`form-note${note.type ? ` ${note.type}` : ""}`}>{note.text}</p>

      <div className="switch-line">
        Already have an account?
        <button type="button" data-switch="login" onClick={() => onSwitch("login")}>
          Login
        </button>
      </div>
    </form>
  );
}
