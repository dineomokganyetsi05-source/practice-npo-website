

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



const enquiryForm = document.querySelector("#enquiry-form");
const formFeedback = document.querySelector("#form-feedback");

if (enquiryForm && formFeedback) {
    enquiryForm.addEventListener("submit", function (event) {
        event.preventDefault();

        
        if (!enquiryForm.checkValidity()) {
            enquiryForm.reportValidity();

            formFeedback.textContent =
                "Please complete all required fields correctly.";

            return;
        }

       
        formFeedback.textContent =
            "Your form is valid, and your enquiry has been submitted. " +
            "We will get back to you soon.";
    });
}



document.addEventListener("DOMContentLoaded", function () {
    const lightboxLinks = document.querySelectorAll("a.lightbox");

    if (lightboxLinks.length === 0) return;

    const overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";

    overlay.innerHTML = `
        <button class="lightbox-close"
                aria-label="Close enlarged image">
            &times;
        </button>
        <img src="" alt="">
    `;

    document.body.appendChild(overlay);

    const enlargedImage = overlay.querySelector("img");
    const closeButton = overlay.querySelector(".lightbox-close");

    function closeLightbox() {
        overlay.classList.remove("active");
        enlargedImage.src = "";
        document.body.style.overflow = "";
    }


const enquiryForm = document.querySelector("#enquiry-form");
const formFeedback = document.querySelector("#form-feedback");

if (enquiryForm && formFeedback) {
    const nameField = document.querySelector("#name");
    const surnameField = document.querySelector("#surname");

    function validateName(field) {
        if (field.value.trim().length < 2) {
            field.setCustomValidity(
                "Please enter at least 2 characters."
            );
        } else {
            field.setCustomValidity("");
        }
    }

    [nameField, surnameField].forEach(function (field) {
        if (field) {
            field.addEventListener("input", function () {
                validateName(field);
                formFeedback.textContent = "";
            });
        }
    });

    enquiryForm.addEventListener("submit", function (event) {
        event.preventDefault();

        [nameField, surnameField].forEach(function (field) {
            if (field) validateName(field);
        });

        if (!enquiryForm.checkValidity()) {
            enquiryForm.reportValidity();

            formFeedback.textContent =
                "Please correct the highlighted fields and try again.";

            return;
        }

        formFeedback.textContent =
            "Validation successful! Your details are complete. " +
            "This demonstration form does not send enquiries yet.";
    });
}



const serviceSearch = document.querySelector("#service-search");
const searchFeedback = document.querySelector("#search-feedback");

if (serviceSearch && searchFeedback) {
    const serviceCards = document.querySelectorAll(".service-card");

    serviceSearch.addEventListener("input", function () {
        const query = serviceSearch.value.trim().toLowerCase();
        let visibleCount = 0;

        serviceCards.forEach(function (card) {
            const cardText = card.textContent.toLowerCase();
            const matches = cardText.includes(query);

            card.hidden = !matches;

            if (matches) {
                visibleCount++;
            }
        });

        if (query === "") {
            searchFeedback.textContent =
                "Showing all " + visibleCount + " services.";
        } else if (visibleCount === 0) {
            searchFeedback.textContent =
                "No services found. Try another keyword.";
        } else {
            searchFeedback.textContent =
                visibleCount +
                (visibleCount === 1 ? " service found." : " services found.");
        }
    });
}