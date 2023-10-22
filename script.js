// Selecting form and input elements by their IDs
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password1 = document.getElementById("password");
const password2 = document.getElementById("re-password");

// Adding an event listener for when the form is submitted
// เช็คว่ามีการกดปุ่ม(submitไหม ,ถ้ามีจะให้ทำอะไรต่อ=callback function)
form.addEventListener("submit", function (e) {
  // Prevent the default form submission behavior
  // preventDefault เคลียจอให้ไม่มีการกระพริบหน้าจอ
  e.preventDefault();
  // Check and validate the input fields

  checkInput([username, email, password1, password2]); // Send the inputs to the checkInput function
  //send to checkinput function
  // เมื่อกด submit ก็จะเช็คว่ามีการกรอก username หรือเปล่า

  // Check if the email is in a valid format
  if (!validateEmail(email.value.trim())) {
    showerror(email, "Please input email");
  } else {
    showsuccess(email);
  }
  // Check if the passwords match
  checkPassword(password1, password2);
  // Check the length of the username and password
  checkInputLength(username, 5, 10); //ป้อน username มากกว่า5 ไม่เกิน10 ตัวอักษร
  checkInputLength(password1, 5, 12);
});

// Function to display an error message and change the input's style
function showerror(input, message) {
  // Move the focus to the parent element // ย้ายการทำงานไปที่ตัวแม่
  const formControl = input.parentElement;
  // Change the style to indicate an error
  formControl.className = "form-control error";
  // Find the error message element
  const small = formControl.querySelector("small");
  // Set the error message
  small.innerText = message;
}

// Function to change the input's style to indicate success
function showsuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Function to validate an email format
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Function to check if the input is empty and display an error message
function checkInput(inputArray) {
  inputArray.forEach(function (input) {
    if (input.value.trim() === "") {
      showerror(input, `Please input ${getInputCase(input)}`);
    } else {
      showsuccess(input);
    }
  });
}

// Function to capitalize the first letter of an input's name
function getInputCase(input) {
  //charAt เอา char ตัวที่0ให้เป็นuppercase
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Function to check if the passwords match
function checkPassword(password1, password2) {
  if (password1.value !== password2.value) {
    showerror(password2, "Passwords do not match");
  }
}
// Function to check the length of the input
function checkInputLength(input, min, max) {
  if (input.value.length <= min) {
    showerror(
      input,
      `${getInputCase(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showerror(
      input,
      `${getInputCase(input)}  must be less than ${max} characters`
    );
  } else {
    showsuccess(input);
  }
}
