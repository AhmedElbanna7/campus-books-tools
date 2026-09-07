# Auth Components (Login / Register)

Converted from the static `login.zip` mockup into React components while keeping the
exact same CSS classes, so `auth.css` is a straight copy of the original `style.css`
and needs no changes on your side.

## Structure

```
src/components/auth/
├── AuthPage.jsx              # top-level page: Showcase + AuthCard, owns activeTab state
├── Showcase.jsx               # left branding panel (static content)
├── AuthTabs.jsx                # Login / Create Account tab switcher + sliding indicator
├── LoginForm.jsx                # login form: state, validation, fake submit
├── RegisterForm.jsx              # register form: state, validation, fake submit
├── FormField.jsx                  # shared label + icon + input wrapper + error message
├── PasswordInput.jsx               # password input with show/hide eye toggle
├── PasswordStrengthMeter.jsx        # weak/medium/strong meter + getPasswordStrength()
├── Checkbox.jsx                      # custom checkbox (remember me / terms)
├── SubmitButton.jsx                   # submit button with loading spinner state
├── validation.js                       # shared EMAIL_PATTERN / isValidEmail()
└── auth.css                             # unchanged copy of the original style.css
```

## Usage

```jsx
import AuthPage from "./components/auth/AuthPage";

export default function App() {
  return <AuthPage />;
}
```

## Notes / things to wire up

1. **Fonts & icons** — the original `index.html` loads Google Fonts (El Messiri,
   IBM Plex Sans Arabic) and Font Awesome from CDN links in `<head>`. Add those
   same `<link>` tags to your app's main `index.html` (or install
   `@fortawesome/fontawesome-free` and import it) — they aren't bundled in the
   components themselves.
2. **Fake submit logic** — both forms simulate an API call with `setTimeout`
   (same as the original `script.js`). Replace the `TODO` blocks in
   `LoginForm.jsx` / `RegisterForm.jsx` with your real `fetch`/axios calls.
3. **Email regex bug fixed** — the original `script.js` had a broken regex
   (`/^[^\s@]+@[^\s@]+**\\.**[^\s@]+$/`, which doesn't actually match a dot).
   Fixed to `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` in `validation.js`.
4. **Register validation added** — the original static version had no JS
   validation wired up for the register form (only the `login` form had it).
   `RegisterForm.jsx` now validates name, email, faculty, password length, and
   the terms checkbox, matching the same error-message style as login.
5. **Password strength** — implemented in `PasswordStrengthMeter.jsx` based on
   length + character variety (upper+digit, symbols). Tune `getPasswordStrength()`
   if you want different rules.
