// LOGIN 
console.log("Java Script connected....");

let loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", function () {

        let email = document.getElementById("email").value;

        let password = document.getElementById("password").value;
        let Email;
        let Password;
        if (email === "") {
            Email = "Email is balnk";
        } else {
            Email = email;
        }

        if (password === "") {
            Password = "Password is blank";
        } else {
            Password = password;
        }

        if (email === "" || password === "") {

            alert("Plz fill the credentials");
            // return;
        }

        console.log("Email: " + email + "\n" + "Password: " + password);

        alert("Email: " + Email + "\n" + "Password: " + Password);

    });
}


// OTP generator
let generatedOtp;

let otpBtn = document.getElementById("otpBtn");

if (otpBtn) {
    otpBtn.addEventListener("click", function () {

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let confirmPass = document.getElementById("confirmPassword").value;

        if (email === "" || password === "") {
            alert("Plz fill the credentials");
            return; // यहीं रुक जाओ, आगे मत बढ़ो
        }
        if (password !== confirmPass) {
            alert("Password didn't match....");
            return;
        }

        // यहाँ पहुंचे मतलब दोनों भरे हैं
        console.log("Email: " + email + "\n" + "Password: " + password);

        // पहला पॉपअप - वैल्यू दिखाने वाला
        alert("Email: " + email + "\nPassword: " + password);

        // दूसरा पॉपअप - OTP दिखाने वाला
        generatedOtp = Math.floor(1000 + Math.random() * 9000);
        alert("Your OTP is: " + generatedOtp);
    });
}

// EYE BUTTON

let eyebutton = document.querySelectorAll(".eye_btn");

eyebutton.forEach(function (button) {

    button.addEventListener("click", function () {

        console.log("Eye button clicked");

        let passwordInput = button.previousElementSibling;

        if (passwordInput.type === "password") {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = "password";
        }

    });

});

// OTP VERIFICATION

let otpVerified = false;

let otpInput = document.getElementById("otpInput");
if (otpInput) {
    otpInput.addEventListener("input", function () {
        let enteredOtp = Number(otpInput.value);
        
        if (otpInput.value.length === 4) {
            if (enteredOtp === generatedOtp) {
                otpVerified = true;
                alert("OTP Verified Successful");
            }
        }
    });
}

//SUBMIT OPTION

let submitBtn = document.getElementById("submitBtn");

if (submitBtn) {
    submitBtn.addEventListener("click", function () {
        if (otpVerified === true) {
            alert("Submit Successful");
        } else {
            alert("Please verify OTP first");
        }

    });
}
