/* ==============================
   DOG PAW WEBSITE JAVASCRIPT
   ============================== */

/* Mobile navigation */

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", function () {
        const isExpanded =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        siteNav.classList.toggle("is-open", !isExpanded);
    });

    // Close the mobile menu after selecting a navigation link.
    const navLinks = siteNav.querySelectorAll("a");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            siteNav.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

/* Enquiry form */

const enquiryForm = document.querySelector("#enquiry-form");
const formFeedback = document.querySelector("#form-feedback");

if (enquiryForm && formFeedback) {
    enquiryForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Let the browser display its built-in validation messages.
        if (!enquiryForm.checkValidity()) {
            enquiryForm.reportValidity();

            formFeedback.textContent =
                "Please complete all required fields correctly.";

            return;
        }

        // This is a demonstration only. No data is sent to a server.
        formFeedback.textContent =
            "Your form is valid, but your enquiry has not been sent. " +
            "A form submission service must be connected first.";
    });
}