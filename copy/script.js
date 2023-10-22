const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password1 = document.getElementById("password");
const password2 = document.getElementById("re-password");

// เช็คว่ามีการกดปุ่ม(submitไหม ,ถ้ามีจะให้ทำอะไรต่อ=callback function)
form.addEventListener("submit", function (e) {
  // preventDefault เคลียจอให้ไม่มีการกระพริบหน้าจอ
  e.preventDefault();
  checkInput([username, email, password1, password2]); //send to checkinput function
  // เมื่อกด submit ก็จะเช็คว่ามีการกรอก username หรือเปล่า

  if (!validateEmail(email.value.trim())) {
    showerror(email, "Please input email");
  } else {
    showsuccess(email);
  }
  checkPassword(password1, password2);
  checkInputLength(username, 5, 10); //ป้อน username มากกว่า5 ไม่เกิน10 ตัวอักษร
  checkInputLength(password1, 5, 12);
});

function showerror(input, message) {
  const formControl = input.parentElement; // ย้ายการทำงานไปที่ตัวแม่
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showsuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function checkInput(inputArray) {
  inputArray.forEach(function (input) {
    if (input.value.trim() === "") {
      showerror(input, `Please input ${getInputCase(input)}`);
    } else {
      showsuccess(input);
    }
  });
}

function getInputCase(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkPassword(password1, password2) {
  if (password1.value !== password2.value) {
    showerror(password2, "Invalid Password");
  }
}

function checkInputLength(input, min, max) {
  if (input.value.length <= min) {
    showerror(input, `${getInputCase(input)} must greater than ${min} letters`);
  } else if (input.value.length > max) {
    showerror(input, `${getInputCase(input)} must less than ${max} letters`);
  } else {
    showsuccess(input);
  }
}
