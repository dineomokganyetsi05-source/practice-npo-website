/* ==============================
   DOG PAW WEBSITE JAVASCRIPT
   ============================== */


/* MOBILE NAVIGATION */

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteNav) {

    menuToggle.addEventListener("click", function () {

        const isExpanded =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        siteNav.classList.toggle("is-open", !isExpanded);

    });

    const navLinks = siteNav.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            siteNav.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");

        });

    });
}


/* ==============================
   ENQUIRY FORM VALIDATION
   ============================== */

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

            if (field) {
                validateName(field);
            }

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


/* ==============================
   LIGHTBOX FUNCTIONALITY
   ============================== */

document.addEventListener("DOMContentLoaded", function () {

    const lightboxLinks = document.querySelectorAll("a.lightbox");

    if (lightboxLinks.length > 0) {

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

        lightboxLinks.forEach(function (link) {

            link.addEventListener("click", function (event) {

                event.preventDefault();

                enlargedImage.src = link.href;

                const thumbnail = link.querySelector("img");

                enlargedImage.alt = thumbnail
                    ? thumbnail.alt
                    : "Enlarged image";

                overlay.classList.add("active");
                document.body.style.overflow = "hidden";

            });

        });

        closeButton.addEventListener("click", closeLightbox);

        overlay.addEventListener("click", function (event) {

            if (event.target === overlay) {
                closeLightbox();
            }

        });

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeLightbox();
            }

        });

    }

});


/* ==============================
   SERVICE SEARCH FUNCTIONALITY
   ============================== */

const serviceSearch = document.querySelector("#service-search");
const searchButton = document.querySelector("#search-button");
const searchFeedback = document.querySelector("#search-feedback");

if (serviceSearch && searchButton && searchFeedback) {

    const serviceCards = document.querySelectorAll(".service-card");

    function searchServices() {

        const query = serviceSearch.value.trim().toLowerCase();

        if (query === "") {

            searchFeedback.textContent =
                "Please enter a service to search for.";

            return;

        }

        let foundService = null;

        serviceCards.forEach(function (card) {

            const cardText = card.textContent.toLowerCase();

            if (cardText.includes(query) && foundService === null) {

                foundService = card;

            }

        });

        if (foundService) {

            searchFeedback.textContent =
                "Service found! Taking you there...";

            serviceCards.forEach(function (card) {
                card.style.outline = "";
            });

            foundService.style.outline = "2px solid #D4B76A";

            foundService.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        } else {

            searchFeedback.textContent =
                "No matching service found. Try another keyword.";

        }

    }

    searchButton.addEventListener("click", searchServices);

    serviceSearch.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();
            searchServices();

        }

    });

}