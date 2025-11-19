document.addEventListener("DOMContentLoaded", () => {
      const form = document.getElementById("signinForm");
      const message = document.getElementById("signin-message");

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = form.email.value.trim();
        const password = form.password.value.trim();

        if (!email || !password) {
          message.textContent = "Please fill in both fields.";
          message.style.color = "red";
        } else {
          message.textContent = "Sign in successful! Redirecting...";
          message.style.color = "green";
          form.reset();
          window.location.href = "index.html";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          message.textContent = "Invalid email format.";
          message.style.color = "red";
        return;
        }

      });
    });