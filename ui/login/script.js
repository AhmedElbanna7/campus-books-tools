// Tabs Selectors

let tabs = document.querySelectorAll(".tab"); 
let forms = document.querySelectorAll(".auth-form"); 
let indicator = document.querySelector(".tabs__indicator"); 
let switches = document.querySelectorAll("[data-switch]"); 


// Tab Switching

tabs.forEach((tab) => { 
  tab.addEventListener("click", () => { 
    tabs.forEach((tab) => { 
      tab.classList.remove("active"); 
    }); 
 
    tab.classList.add("active"); 
 
    forms.forEach((form) => { 
      form.classList.remove("active"); 
    }); 
 
    let formId = tab.dataset.tab; 
 
    document.getElementById(formId).classList.add("active"); 
 
    if (formId === "register") { 
      indicator.classList.add("to-register"); 
    } else { 
      indicator.classList.remove("to-register"); 
    } 
  }); 
}); 


// Switch Buttons

switches.forEach((button) => { 
  button.addEventListener("click", () => { 
    let formId = button.dataset.switch; 
 
    tabs.forEach((tab) => { 
      tab.classList.remove("active"); 
    }); 
 
    document 
      .querySelector(`[data-tab="${formId}"]`) 
      .classList.add("active"); 
 
    forms.forEach((form) => { 
      form.classList.remove("active"); 
    }); 
 
    document.getElementById(formId).classList.add("active"); 
 
    if (formId === "register") { 
      indicator.classList.add("to-register"); 
    } else { 
      indicator.classList.remove("to-register"); 
    } 
  }); 
}); 


// Login Selectors

let loginForm = document.getElementById("login"); 
let loginEmail = document.getElementById("login-email"); 
let loginPassword = document.getElementById("login-password"); 
let remember = document.getElementById("remember"); 
 
let loginBtn = loginForm.querySelector(".btn-submit"); 
let loginBtnText = loginBtn.querySelector("span"); 
let loginLoader = loginBtn.querySelector("i"); 
let loginNote = loginForm.querySelector(".form-note"); 
let loginFields = loginForm.querySelectorAll(".field"); 


// Login Validation

loginForm.addEventListener("submit", (event) => { 
  event.preventDefault(); 
 
  clearLoginErrors(); 
 
  let email = loginEmail.value.trim(); 
  let password = loginPassword.value.trim(); 
 
  let isValid = true; 
 
  if (email === "") { 
    showLoginError(loginEmail, "University email is required"); 
    isValid = false; 
  } else if (!isValidEmail(email)) { 
    showLoginError(loginEmail, "Enter a valid university email"); 
    isValid = false; 
  } 
 
  if (password === "") { 
    showLoginError(loginPassword, "Password is required"); 
    isValid = false; 
  } else if (password.length < 6) { 
    showLoginError( 
      loginPassword, 
      "Password must be at least 6 characters" 
    ); 
    isValid = false; 
  } 
 
  if (!isValid) { 
    return; 
  } 
 
  loginUser(email, password); 
}); 


// Show Error

function showLoginError(input, message) { 
  let field = input.closest(".field"); 
  let error = field.querySelector(".field__error"); 
 
  error.textContent = message; 
  field.classList.add("error"); 
} 


// Clear Errors

function clearLoginErrors() { 
  loginFields.forEach((field) => { 
    field.classList.remove("error"); 
 
    let error = field.querySelector(".field__error"); 
 
    if (error) { 
      error.textContent = ""; 
    } 
  }); 
 
  loginNote.textContent = ""; 
 
  loginNote.classList.remove("success", "error"); 
} 


// Email Validation

function isValidEmail(email) { 
let emailPattern = /^[^\s@]+@[^\s@]+**\\.**[^\s@]+$/;
 
  return emailPattern.test(email); 
} 


// Login

function loginUser(email, password) { 
  loginBtn.disabled = true; 
 
  loginBtnText.textContent = "Logging in..."; 
 
  loginLoader.classList.add("loading"); 
 
  setTimeout(() => { 
    let success = true; 
 
    if (success) { 
      loginNote.textContent = "Logged in successfully"; 
 
      loginNote.classList.add("success"); 
 
      console.log({ 
        email: email, 
        remember: remember.checked, 
      }); 
    } else { 
      loginNote.textContent = 
        "The university email or password is incorrect"; 
 
      loginNote.classList.add("error"); 
    } 
 
    loginBtn.disabled = false; 
 
    loginBtnText.textContent = "Login"; 
 
    loginLoader.classList.remove("loading"); 
  }, 1500); 
}; 


// Clear Email Error

loginEmail.addEventListener("input", () => { 
  let field = loginEmail.closest(".field"); 
 
  field.classList.remove("error"); 
 
  field.querySelector(".field__error").textContent = ""; 
}); 


// Clear Password Error

loginPassword.addEventListener("input", () => { 
  let field = loginPassword.closest(".field"); 
 
  field.classList.remove("error"); 
 
  field.querySelector(".field__error").textContent = ""; 
}); 


// Show / Hide Password

let passwordToggles = 
  document.querySelectorAll(".field__toggle"); 
 
passwordToggles.forEach((toggle) => { 
  toggle.addEventListener("click", () => { 
    let passwordInput = 
      toggle.closest(".field").querySelector("input"); 
 
    if (passwordInput.type === "password") { 
      passwordInput.type = "text"; 
    } else { 
      passwordInput.type = "password"; 
    } 
  }); 
});
