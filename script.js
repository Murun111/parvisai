// ===== THEME =====

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

if (savedTheme) {
    applyTheme(savedTheme === "dark");
} else {
    applyTheme(systemDark.matches);
}

systemDark.addEventListener("change", function (e) {
    if (!localStorage.getItem("parvis-theme")) applyTheme(e.matches);
});

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        var isDark = !document.body.classList.contains("dark");
        applyTheme(isDark);
        localStorage.setItem("parvis-theme", isDark ? "dark" : "light");
    });
}


// ===== PAGE TRANSITIONS =====

window.addEventListener("pageshow", function () {
    document.body.classList.remove("page-leaving");
    window.scrollTo(0, 0);
});

document.querySelectorAll("a.transition-link").forEach(function (link) {
    link.addEventListener("click", function (e) {
        var href = link.getAttribute("href");
        if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
        if (href === window.location.pathname.split("/").pop()) return;
        e.preventDefault();
        document.body.classList.add("page-leaving");
        setTimeout(function () { window.location.href = href; }, 400);
    });
});


// ===== STAGGERED SCROLL REVEAL =====

var fadeTargets = document.querySelectorAll(
    ".problem-card, .solution-card, .how-step, .industry-item, .result-card, " +
    ".testimonial-card, .pricing-card, .roi-card, .pillar-content, .pillar-visual, " +
    ".contact-form, .contact-info-side, .demo-text, .demo-phone, .hero-content, " +
    ".cta-box, .dashboard-mockup, .platform-feature, " +
    ".differentiator-content, .diff-card, .hero-tagline, .section-intro, " +
    ".pricing-note-box, .comparison-table-wrap, .contact-promise, .contact-block"
);

fadeTargets.forEach(function (el) { el.classList.add("fade-in"); });

function staggerSiblings(entries) {
    var groups = {};
    entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var parent = entry.target.parentElement;
        if (!parent) { entry.target.classList.add("visible"); return; }
        var key = parent.className;
        if (!groups[key]) groups[key] = [];
        groups[key].push(entry.target);
    });
    Object.keys(groups).forEach(function (key) {
        groups[key].forEach(function (el, i) {
            setTimeout(function () { el.classList.add("visible"); }, i * 80);
        });
    });
}

var observer = new IntersectionObserver(staggerSiblings, { threshold: 0.06, rootMargin: "0px 0px -40px 0px" });
fadeTargets.forEach(function (el) { observer.observe(el); });


// ===== MOBILE MENU =====

var mobileMenu = document.getElementById("mobile-menu");
var navLinks = document.getElementById("nav-links");

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", function () {
        navLinks.classList.toggle("mobile-open");
    });
}


// ===== FAQ ACCORDION =====

document.querySelectorAll(".faq-item").forEach(function (item) {
    item.querySelector(".faq-question").addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item").forEach(function (o) { o.classList.remove("open"); });
        if (!isOpen) item.classList.add("open");
    });
});


// ===== STAT COUNTER (homepage results) =====

var counted = false;
var resultNumbers = document.querySelectorAll(".result-number");

function animateCounters() {
    if (counted || !resultNumbers.length) return;
    counted = true;
    resultNumbers.forEach(function (el) {
        var text = el.textContent.trim();
        var match = text.match(/^([\d,.]+)/);
        if (!match) return;
        var target = parseFloat(match[1].replace(/,/g, ""));
        var suffix = text.replace(match[1], "");
        var duration = 1200;
        var start = performance.now();
        function tick(now) {
            var progress = Math.min((now - start) / duration, 1);
            var ease = 1 - Math.pow(1 - progress, 3);
            var current = Math.round(target * ease);
            el.textContent = (target >= 1000 ? current.toLocaleString() : current) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    });
}

if (resultNumbers.length) {
    var counterObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) { animateCounters(); counterObs.disconnect(); }
        });
    }, { threshold: 0.3 });
    resultNumbers.forEach(function (el) { counterObs.observe(el); });
}


// ===== CONTACT FORM (Google Forms via hidden iframe) =====

var contactForm = document.getElementById("contact-form");
var contactResponse = document.getElementById("contact-response");

if (contactForm && contactResponse) {
    var hiddenFrame = document.createElement("iframe");
    hiddenFrame.name = "hidden-google-frame";
    hiddenFrame.style.display = "none";
    document.body.appendChild(hiddenFrame);

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        var gForm = document.createElement("form");
        gForm.method = "POST";
        gForm.action = "https://docs.google.com/forms/d/e/1FAIpQLSeBu-qZZy-Gj-BKTw-17isboKMTt1g150IbHqcEGQemUUIUTA/formResponse";
        gForm.target = "hidden-google-frame";
        gForm.style.display = "none";

        var fields = {
            "entry.318120689": document.getElementById("c-name").value,
            "entry.281475272": document.getElementById("c-phone").value,
            "entry.563634571": document.getElementById("c-email").value,
            "entry.1245430311": document.getElementById("c-business").value,
            "entry.1754937528": document.getElementById("c-type").value,
            "entry.474141800": document.getElementById("c-calls").value,
            "entry.2026719459": document.getElementById("c-pain").value
        };

        for (var key in fields) {
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = fields[key];
            gForm.appendChild(input);
        }

        document.body.appendChild(gForm);
        gForm.submit();
        document.body.removeChild(gForm);

        contactResponse.textContent = "Thank you. We’ll reach out within 24 hours.";
        contactResponse.style.color = "var(--accent)";
        contactForm.reset();
    });
}
