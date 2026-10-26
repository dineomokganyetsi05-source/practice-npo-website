

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

    lightboxLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const thumbnail = link.querySelector("img");

            enlargedImage.src = link.href;
            enlargedImage.alt = thumbnail
                ? thumbnail.alt
                : "Enlarged image";

            overlay.classList.add("active");
            document.body.style.overflow = "hidden";

            closeButton.focus();
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
});