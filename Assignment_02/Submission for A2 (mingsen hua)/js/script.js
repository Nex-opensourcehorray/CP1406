// script.js
(function () {
  // Attach once DOM is ready instead of using inline onsubmit
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bookingForm");
    if (!form) return;

    form.addEventListener("submit", validateForm);
  });

  function validateForm(event) {
    event.preventDefault();

    // clear previous messages
    document.querySelectorAll(".error").forEach(e => e.remove());
    setFormMessage(""); // clear form-level message

    let isValid = true;

    // get form values
    const firstNameEl = document.getElementById("firstname");
    const lastNameEl = document.getElementById("lastname");
    const emailEl = document.getElementById("email");
    const passwordEl = document.getElementById("psw");
    const confirmEl = document.getElementById("psw-repeat");
    const appointmentDateEl = document.getElementById("appointmentDate");

    const firstName = (firstNameEl?.value || "").trim();
    const lastName  = (lastNameEl?.value || "").trim();
    const email     = (emailEl?.value || "").trim();
    const password  = (passwordEl?.value || "").trim();
    const confirm   = (confirmEl?.value || "").trim();
    const selectedDate = new Date(appointmentDateEl.value);
    const today = new Date();
    today.setHours(0,0,0,0);
    const referralEl = document.getElementById("referral");
    // helper to show inline error under a field
    const showError = (el, msg) => {
      if (!el) return;
      const p = document.createElement("p");
      p.className = "error";
      p.textContent = msg;
      el.insertAdjacentElement("afterend", p);
    };

    // rules
    const namePattern = /^[A-Za-z\s'-]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName || !namePattern.test(firstName)) {
      showError(firstNameEl, "Please enter a valid first name (letters only).");
      isValid = false;
    }

    if (!lastName || !namePattern.test(lastName)) {
      showError(lastNameEl, "Please enter a valid last name (letters only).");
      isValid = false;
    }

    if (!email || !emailPattern.test(email)) {
      showError(emailEl, "Please enter a valid email address.");
      isValid = false;
    }

    // stronger password policy: ≥8 chars, 1 letter, 1 number
    const strongPassword = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!strongPassword.test(password)) {
      showError(passwordEl, "Password must be ≥ 8 chars and include a letter and a number.");
      isValid = false;
    }

    if (password !== confirm) {
      showError(confirmEl, "Passwords do not match.");
      isValid = false;
    }

    if (!appointmentDateEl.value) {
      showError(appointmentDateEl, "Please select an appointment date.");
      isValid = false;
    }

    

    if (!appointmentDateEl.value || selectedDate < today) {
      showError(appointmentDateEl, "Please choose a date today or later.");
      isValid = false;

    
    if (!referralEl.value) {
      showError(referralEl, "Please choose an option.");
      isValid = false;
}

}



    if (isValid) {
      setFormMessage("Booking form submitted successfully!", "success");
      document.getElementById("bookingForm").reset();
      return true;
    }
      setFormMessage("Please fix the errors above and try again.", "error");
      return false;
  }

})();

function setFormMessage(msg, type = "success") {
  let region = document.getElementById("form-messages");
  if (!region) {
    // create the region if missing
    region = document.createElement("div");
    region.id = "form-messages";
    region.className = "form-messages";
    region.setAttribute("role", "status");
    region.setAttribute("aria-live", "polite");
    document.getElementById("bookingForm")?.insertAdjacentElement("afterend", region);
  }

  region.textContent = msg || "";
  region.classList.remove("is-error", "is-success");
  region.classList.add(type === "error" ? "is-error" : "is-success");

  // bring into view & announce
  region.scrollIntoView({ behavior: "smooth", block: "center" });
  region.tabIndex = -1;
  region.focus({ preventScroll: true });
}
