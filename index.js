// Function to show an error message
function showError(field, message) {
  const errorDisplay = document.querySelector("#errorDisplay");
  const errorMessage = `${field}: ${message}`;
  errorDisplay.textContent = errorMessage;
  errorDisplay.style.display = "block";
}

// Function to hide the error message
function hideError() {
  const errorDisplay = document.querySelector("#errorDisplay");
  errorDisplay.style.display = "none"; // Hide the error display element
}

function hideSuccessMessage(element) {
  element.style.display = "none";
}


// Function to validate the registration form
function validateForm(event) {
  const form = document.getElementById("registration");
  if (!form.checkValidity()) {
    event.preventDefault(); // Prevent form submission if validation fails
    showError("Error", "Please fill in all the required fields.");
    return false;
  }
  return true; // Proceed with form submission if validation passes
}

// Function to check if password and passwordCheck match
function checkPasswordMatch() {
  const password = document.getElementsByName("password")[0].value;
  const passwordCheck = document.getElementsByName("passwordCheck")[0].value;
  const errorDisplay = document.getElementById("errorDisplay");

  if (password !== passwordCheck) {
    showError("Error", "Passwords do not match.");
  } else {
    hideError();
  }
}

// Function to toggle the submit button based on the terms checkbox
function toggleSubmitButton() {
  const termsCheckbox = document.getElementsByName("terms")[0];
  const registerButton = document.getElementById("registerButton");
  registerButton.disabled = !termsCheckbox.checked;
}

// Function to validate the login form
function validateLoginForm(event) {
  const form = document.getElementById("login");
  if (!form.checkValidity()) {
    event.preventDefault(); // Prevent form submission if validation fails
    showError("Error", "Please fill in all the required fields.");
    return false;
  }
  return true; // Proceed with form submission if validation passes
}

// Function to validate the username for registration
function validateUsername() {
  const usernameInput = document.getElementsByName("username")[0];
  const username = usernameInput.value.trim();
  const usernameError = document.getElementById("usernameError");
  const pattern = /^[a-zA-Z0-9]{4,}$/;

  if (username === "") {
    showError("Username", "Username cannot be blank.");
    usernameInput.focus();
    return false;
  }

  if (!pattern.test(username)) {
    showError(
      "Username",
      "Username must be at least four characters long, contain only alphanumeric characters, and cannot contain special characters or whitespace."
    );
    usernameInput.focus();
    return false;
  }

  hideError();
  return true;
}

// Function to validate the email for registration
function validateEmail() {
  const emailInput = document.getElementsByName("email")[0];
  const email = emailInput.value.trim();
  const emailError = document.getElementById("emailError");
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    showError("Email", "Email cannot be blank.");
    emailInput.focus();
    return false;
  }

  if (!pattern.test(email)) {
    showError("Email", "Please enter a valid email address.");
    emailInput.focus();
    return false;
  }

  if (email.includes("example.com")) {
    showError("Email", "Emails from example.com are not allowed.");
    emailInput.focus();
    return false;
  }

  hideError();
  return true;
}

// Function to validate the password for registration
function validatePassword() {
  const passwordInput = document.getElementsByName("password")[0];
  const password = passwordInput.value.trim();
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordInput = document.getElementsByName("passwordCheck")[0];
  const confirmPassword = confirmPasswordInput.value.trim();

  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{12,}$/;

  if (password === "") {
    showError("Password", "Password cannot be blank.");
    passwordInput.focus();
    return false;
  }

  if (!pattern.test(password)) {
    showError(
      "Password",
      "Password must be at least 12 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
    passwordInput.focus();
    return false;
  }

  if (password.toLowerCase().includes("password")) {
    showError("Password", "Password cannot contain the word 'password'.");
    passwordInput.focus();
    return false;
  }

  if (password === confirmPassword) {
    hideError();
    return true;
  } else {
    showError("Password", "Passwords do not match.");
    confirmPasswordInput.focus();
    return false;
  }
}

// Function to validate the terms checkbox for registration
function validateTerms() {
  const termsInput = document.getElementsByName("terms")[0];
  const termsError = document.getElementById("termsError");

  if (!termsInput.checked) {
    showError("Terms", "You must accept the terms and conditions.");
    termsInput.focus();
    return false;
  }

  hideError();
  return true;
}

// Function to submit the registration form
function submitRegistration(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Run the validation checks for the registration form
  if (
    validateUsername() &&
    validateEmail() &&
    validatePassword() &&
    validateTerms()
  ) {
    const usernameInput = document.getElementsByName("username")[0];
    const emailInput = document.getElementsByName("email")[0];
    const passwordInput = document.getElementsByName("password")[0];

    // Get the user data from the form
    const username = usernameInput.value.trim().toLowerCase();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    // Store the user data in localStorage
    const user = { username, email, password };
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    // Clear all form fields
    usernameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";

    // Show the success message
    const successMessage = document.getElementById("successMessageRegister");
    successMessage.textContent = "Registration successful.";
    successMessage.style.display = "block";

    // Focus on the username input field for convenience
    usernameInput.focus();
  }
}

// Attach the submitRegistration function to the registration form submit event
const registrationForm = document.getElementById("registration");
registrationForm.addEventListener("submit", submitRegistration);

// Function to validate the login form
function validateLogin() {
  const usernameInput = document.getElementsByName("username")[1];
  const username = usernameInput.value.trim().toLowerCase();
  const usernameError = document.getElementById("usernameErrorLogin");

  if (username === "") {
    showError("Username", "Username cannot be blank.");
    usernameInput.focus();
    return false;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const existingUser = users.find(
    (user) => user.username === username.toLowerCase()
  );

  if (!existingUser) {
    showError("Username", "Username does not exist.");
    usernameInput.focus();
    return false;
  }

  hideError();
  return true;
}

// Function to validate the password for login
function validatePasswordLogin() {
  const passwordInput = document.getElementsByName("password")[1];
  const password = passwordInput.value.trim();
  const passwordError = document.getElementById("passwordErrorLogin");

  if (password === "") {
    showError("Password", "Password cannot be blank.");
    passwordInput.focus();
    return false;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const usernameInput = document.getElementsByName("username")[1];
  const username = usernameInput.value.trim().toLowerCase();
  const existingUser = users.find(
    (user) => user.username === username.toLowerCase()
  );

  if (existingUser && existingUser.password !== password) {
    showError("Password", "Incorrect password.");
    passwordInput.focus();
    return false;
  }

  hideError();
  return true;
}

// Function to submit the login form
function submitLogin(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Run the validation checks for the login form
  if (validateLogin() && validatePasswordLogin()) {
    const usernameInput = document.getElementsByName("username")[1];
    const persistInput = document.getElementsByName("persist")[0];

    // Clear all form fields
    usernameInput.value = "";
    document.getElementsByName("password")[1].value = "";

    // Show the success message
    const successMessage = document.getElementById("successMessageLogin");
    successMessage.textContent = "Login successful.";
    if (persistInput.checked) {
      successMessage.textContent += " You are logged in.";
    }
    successMessage.style.display = "block";

    // Focus on the username input field for convenience
    usernameInput.focus();
  }
}

// Attach the submitLogin function to the login form submit event
const loginForm = document.getElementById("login");
loginForm.addEventListener("submit", submitLogin);


const successMessageLogin = document.getElementById("successMessageLogin");
const successMessageRegister = document.getElementById("successMessageRegister");

// Function to show the success message
function showSuccessMessage(element) {
  element.style.display = "block";
}

// Function to hide the success message
function hideSuccessMessage(element) {
  element.style.display = "none";
}
