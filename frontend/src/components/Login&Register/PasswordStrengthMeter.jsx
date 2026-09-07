export function getPasswordStrength(password) {
  if (!password) return "";
  if (password.length < 6) return "weak";

  let score = 0;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score >= 2) return "strong";
  if (score === 1) return "medium";
  return "weak";
}

export default function PasswordStrengthMeter({ password }) {
  const level = getPasswordStrength(password);

  return (
    <div className={`strength-meter${level ? ` ${level}` : ""}`}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
