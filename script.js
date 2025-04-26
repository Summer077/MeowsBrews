document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    const signupForm = document.getElementById("signup-form");
    const signinForm = document.getElementById("signin-form");
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            document.querySelector(".tab.active")?.classList.remove("active");
            tab.classList.add("active");

            const isSignup = tab.dataset.form === "signup";
            signupForm.classList.toggle("hidden", !isSignup);
            signinForm.classList.toggle("hidden", isSignup);
        });
    });

    togglePassword?.addEventListener("click", () => {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    });

    function validateGmail(email) {
        return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email.trim());
    }

    signupForm.addEventListener("submit", (event) => {
        const emailInput = signupForm.querySelector('input[name="email"]');
        if (!validateGmail(emailInput.value)) {
            event.preventDefault();
            alert("Please enter a valid @gmail.com email address.");
            emailInput.focus();
        }
    });

    signinForm.addEventListener("submit", (event) => {
        const emailInput = signinForm.querySelector('input[name="email"]');
        if (!validateGmail(emailInput.value)) {
            event.preventDefault();
            alert("Please enter a valid @gmail.com email address.");
            emailInput.focus();
        }
    });
});

