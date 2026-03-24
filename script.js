// ===== DARK MODE =====

var themeToggle = document.getElementById("theme-toggle");
var savedTheme = localStorage.getItem("parvis-theme");
var systemDark = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(isDark) {
    if (isDark) {
        document.body.classList.add("dark");
        if (themeToggle) themeToggle.querySelector(".toggle-icon").textContent = "🌙";
    } else {
        document.body.classList.remove("dark");
        if (themeToggle) themeToggle.querySelector(".toggle-icon").textContent = "☀️";
    }
}

// On load: use saved preference, otherwise follow device setting
if (savedTheme) {
    applyTheme(savedTheme === "dark");
} else {
    applyTheme(systemDark.matches);
}

// Listen for device theme changes (e.g. sunrise/sunset auto switch)
systemDark.addEventListener("change", function (e) {
    // Only follow system if user hasn't manually chosen
    if (!localStorage.getItem("parvis-theme")) {
        applyTheme(e.matches);
    }
});

// Manual toggle
if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        var isDark = !document.body.classList.contains("dark");
        applyTheme(isDark);
        localStorage.setItem("parvis-theme", isDark ? "dark" : "light");
    });
}


// ===== SCROLL FADE-IN =====

var animatedElements = document.querySelectorAll(
    ".problem-card, .solution-card, .how-step, .industry-item, .result-card, " +
    ".testimonial-card, .pricing-card, .roi-card, .pillar-content, .pillar-visual, " +
    ".contact-form, .contact-info-side, .demo-text, .demo-phone, .hero-content, " +
    ".cta-box, .dashboard-mockup, .included-item, .platform-feature"
);

animatedElements.forEach(function (el) {
    el.classList.add("fade-in");
});

var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.08 });

animatedElements.forEach(function (el) {
    observer.observe(el);
});


// ===== MOBILE MENU =====

var mobileMenu = document.getElementById("mobile-menu");
var navLinks = document.getElementById("nav-links");

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", function () {
        navLinks.classList.toggle("mobile-open");
    });
}


// ===== FAQ ACCORDION =====

var faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    question.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        faqItems.forEach(function (other) { other.classList.remove("open"); });
        if (!isOpen) item.classList.add("open");
    });
});


// ===== CONTACT FORM =====

var contactForm = document.getElementById("contact-form");
var contactResponse = document.getElementById("contact-response");

if (contactForm && contactResponse) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        contactResponse.textContent = "Thanks! We'll reach out within 24 hours to schedule your free demo.";
        contactResponse.style.color = "#534AB7";
        contactForm.reset();
    });
}
