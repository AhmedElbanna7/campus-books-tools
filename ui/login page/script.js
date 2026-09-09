// ==============================
// Tabs
// ==============================

// بنجيب كل العناصر اللي واخدة class اسمه tab
// يعني أزرار Login و Register
let tabs = document.querySelectorAll(".tab");

// بنجيب كل الفورمات اللي واخدة class auth-form
// عندنا Login Form و Register Form
let forms = document.querySelectorAll(".auth-form");

// بنجيب الخط المتحرك اللي تحت الـ Tabs
let indicator = document.querySelector(".tabs__indicator");

// بنجيب الأزرار اللي عندها data-switch
// زي زرار "Create Account" الموجود تحت Login
let switches = document.querySelectorAll("[data-switch]");


// ==============================
// Tab Switching
// ==============================

// forEach بتلف على كل Tab واحد واحد
tabs.forEach((tab) => {

  // بنقول لما المستخدم يدوس على الـ Tab ده
  tab.addEventListener("click", () => {

    // بنلف على كل الـ Tabs
    tabs.forEach((tab) => {

      // بنشيل active من كل Tab
      tab.classList.remove("active");
    });

    // بنضيف active للـ Tab اللي المستخدم ضغط عليه
    tab.classList.add("active");

    // بنلف على كل الفورمات
    forms.forEach((form) => {

      // بنخفي كل الفورمات عن طريق إزالة active
      form.classList.remove("active");
    });

    // بنجيب قيمة data-tab من الـ Tab
    // لو عندنا data-tab="login"
    // يبقى formId = "login"
    let formId = tab.dataset.tab;

    // بنجيب الفورم عن طريق الـ id
    // وبعد كده بنضيف لها active عشان تظهر
    document.getElementById(formId).classList.add("active");

    // بنشوف المستخدم اختار Register ولا Login
    if (formId === "register") {

      // لو Register نحرك الخط ناحية Register
      indicator.classList.add("to-register");

    } else {

      // لو Login نرجع الخط لمكانه الطبيعي
      indicator.classList.remove("to-register");
    }
  });
});


// ==============================
// Switch Buttons
// ==============================

// بنلف على كل زرار عنده data-switch
switches.forEach((button) => {

  // لما المستخدم يدوس على الزرار
  button.addEventListener("click", () => {

    // بنجيب قيمة data-switch
    // مثال: data-switch="register"
    // يبقى formId = "register"
    let formId = button.dataset.switch;

    // بنلف على كل الـ Tabs
    tabs.forEach((tab) => {

      // بنشيل active من كل الـ Tabs
      tab.classList.remove("active");
    });

    // بنجيب الـ Tab اللي data-tab بتاعه
    // يساوي formId
    // وبنضيف له active
    document
      .querySelector(`[data-tab="${formId}"]`)
      .classList.add("active");

    // بنلف على كل الفورمات
    forms.forEach((form) => {

      // بنخفي كل الفورمات
      form.classList.remove("active");
    });

    // بنظهر الفورم المطلوبة
    document.getElementById(formId).classList.add("active");

    // بنحرك الخط حسب الفورم
    if (formId === "register") {

      // نحرك الخط ناحية Register
      indicator.classList.add("to-register");

    } else {

      // نرجع الخط ناحية Login
      indicator.classList.remove("to-register");
    }
  });
});


// ==============================
// Login Selectors
// ==============================

// بنجيب فورم Login عن طريق الـ id
let loginForm = document.getElementById("login");

// بنجيب input الإيميل
let loginEmail = document.getElementById("login-email");

// بنجيب input الباسورد
let loginPassword = document.getElementById("login-password");

// بنجيب checkbox بتاع Remember Me
let remember = document.getElementById("remember");

// بنجيب زرار Login الموجود داخل الفورم
let loginBtn = loginForm.querySelector(".btn-submit");

// بنجيب الـ span الموجود داخل الزرار
// عشان نقدر نغير الكلام اللي جواه
let loginBtnText = loginBtn.querySelector("span");

// بنجيب الـ icon الموجود داخل الزرار
// وده مسؤول عن Loading
let loginLoader = loginBtn.querySelector("i");

// بنجيب المكان اللي هنظهر فيه رسالة النجاح أو الخطأ
let loginNote = loginForm.querySelector(".form-note");

// بنجيب كل الـ fields الموجودة داخل Login
let loginFields = loginForm.querySelectorAll(".field");


// ==============================
// Login Validation
// ==============================

// بنراقب عملية Submit بتاعت الفورم
loginForm.addEventListener("submit", (event) => {

  // بنمنع الفورم من عمل Reload للصفحة
  event.preventDefault();

  // بنمسح أي Errors قديمة
  clearLoginErrors();

  // بنجيب قيمة الإيميل
  // trim() بتشيل المسافات من البداية والنهاية
  let email = loginEmail.value.trim();

  // بنجيب قيمة الباسورد
  let password = loginPassword.value.trim();

  // بنفترض في البداية إن البيانات صحيحة
  let isValid = true;


  // ==========================
  // Email Validation
  // ==========================

  // لو الإيميل فاضي
  if (email === "") {

    // نظهر رسالة Error للإيميل
    showLoginError(
      loginEmail,
      "University email is required"
    );

    // البيانات غير صحيحة
    isValid = false;

  // لو الإيميل مش فاضي
  // ولكن شكله غير صحيح
  } else if (!isValidEmail(email)) {

    // نظهر رسالة Error
    showLoginError(
      loginEmail,
      "Enter a valid university email"
    );

    // البيانات غير صحيحة
    isValid = false;
  }


  // ==========================
  // Password Validation
  // ==========================

  // لو الباسورد فاضي
  if (password === "") {

    // نظهر رسالة Error
    showLoginError(
      loginPassword,
      "Password is required"
    );

    // البيانات غير صحيحة
    isValid = false;

  // لو الباسورد أقل من 6 characters
  } else if (password.length < 6) {

    // نظهر رسالة Error
    showLoginError(
      loginPassword,
      "Password must be at least 6 characters"
    );

    // البيانات غير صحيحة
    isValid = false;
  }


  // لو فيه أي Error
  if (!isValid) {

    // نوقف تنفيذ الكود هنا
    // وممنوع نعمل Login
    return;
  }

  // لو كل البيانات صحيحة
  // نبدأ عملية Login
  loginUser(email, password);
});


// ==============================
// Show Error
// ==============================

// Function مسؤولة عن إظهار Error
function showLoginError(input, message) {

  // بنجيب الـ field اللي حوالين الـ input
  let field = input.closest(".field");

  // بنجيب العنصر المسؤول عن عرض رسالة الخطأ
  let error = field.querySelector(".field__error");

  // بنحط رسالة الخطأ داخله
  error.textContent = message;

  // بنضيف class error للـ field
  // والـ CSS بيغير شكله
  field.classList.add("error");
}


// ==============================
// Clear Errors
// ==============================

// Function مسؤولة عن مسح كل Errors
function clearLoginErrors() {

  // بنلف على كل Login Fields
  loginFields.forEach((field) => {

    // بنشيل class error
    field.classList.remove("error");

    // بنجيب مكان رسالة الخطأ
    let error = field.querySelector(".field__error");

    // نتأكد إن عنصر الخطأ موجود
    if (error) {

      // نمسح رسالة الخطأ
      error.textContent = "";
    }
  });

  // نمسح رسالة النجاح أو الفشل
  loginNote.textContent = "";

  // نشيل classes بتوع success و error
  loginNote.classList.remove("success", "error");
}


// ==============================
// Email Validation
// ==============================

// Function بتختبر هل الإيميل شكله صحيح ولا لا
function isValidEmail(email) {

  // Regex للتحقق من شكل الإيميل
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // test() بترجع true لو الإيميل صحيح
  // و false لو الإيميل غلط
  return emailPattern.test(email);
}


// ==============================
// Login
// ==============================

// Function مسؤولة عن تنفيذ عملية Login
function loginUser(email, password) {

  // بنقفل زرار Login
  // عشان المستخدم مينفعش يدوس عليه كذا مرة
  loginBtn.disabled = true;

  // بنغير الكلام الموجود في الزرار
  loginBtnText.textContent = "Logging in...";

  // بنضيف loading للـ icon
  loginLoader.classList.add("loading");

  // setTimeout هنا مجرد Simulation
  // لحد ما الـ Backend يتوصل
  setTimeout(() => {

    // مؤقتًا بنفترض إن Login نجح
    let success = true;

    // لو Login نجح
    if (success) {

      // نظهر رسالة نجاح
      loginNote.textContent = "Logged in successfully";

      // نضيف class success
      loginNote.classList.add("success");

      // نطبع بيانات بسيطة في Console
      console.log({
        email: email,
        remember: remember.checked,
      });

    } else {

      // لو Login فشل
      loginNote.textContent =
        "The university email or password is incorrect";

      // نضيف class error
      loginNote.classList.add("error");
    }

    // نفتح زرار Login تاني
    loginBtn.disabled = false;

    // نرجع الكلام الطبيعي للزرار
    loginBtnText.textContent = "Login";

    // نوقف الـ Loading
    loginLoader.classList.remove("loading");

  // نستنى 1500 milliseconds
  // يعني ثانية ونص
  }, 1500);
};


// ==============================
// Clear Email Error
// ==============================

// لما المستخدم يبدأ يكتب في الإيميل
loginEmail.addEventListener("input", () => {

  // بنجيب الـ field
  let field = loginEmail.closest(".field");

  // بنشيل شكل الـ Error
  field.classList.remove("error");

  // بنمسح رسالة الخطأ
  field.querySelector(".field__error").textContent = "";
});


// ==============================
// Clear Password Error
// ==============================

// لما المستخدم يبدأ يكتب في الباسورد
loginPassword.addEventListener("input", () => {

  // بنجيب الـ field
  let field = loginPassword.closest(".field");

  // بنشيل شكل الـ Error
  field.classList.remove("error");

  // بنمسح رسالة الخطأ
  field.querySelector(".field__error").textContent = "";
});


// ==============================
// Show / Hide Password
// ==============================

// بنجيب كل أزرار Show / Hide Password
let passwordToggles =
  document.querySelectorAll(".field__toggle");

// بنلف على كل زرار
passwordToggles.forEach((toggle) => {

  // لما المستخدم يدوس على الزرار
  toggle.addEventListener("click", () => {

    // بنجيب الـ input الموجود في نفس الـ field
    let passwordInput =
      toggle.closest(".field").querySelector("input");

    // لو نوع الـ input password
    if (passwordInput.type === "password") {

      // نخليه text عشان الباسورد يظهر
      passwordInput.type = "text";

    } else {

      // لو كان ظاهر نخليه password عشان يختفي
      passwordInput.type = "password";
    }
  });
});