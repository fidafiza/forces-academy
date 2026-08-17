// Navbar Background on Scroll

window.addEventListener("scroll", function () {

    const navbar = document.getElementById("mainNav");

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});
// Gallery Filter

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("btn-warning");
            btn.classList.add("btn-outline-warning");
        });

        button.classList.remove("btn-outline-warning");
        button.classList.add("btn-warning");

        const filter = button.getAttribute("data-filter");

        galleryItems.forEach(item => {

            if(filter === "all" || item.classList.contains(filter)){
                item.style.display = "block";
            }else{
                item.style.display = "none";
            }

        });

    });

});
// Contact Form Validation

const form = document.getElementById("contactForm");

if(form){

    form.addEventListener("submit",function(e){

        e.preventDefault();

        const name=document.getElementById("name").value.trim();
        const email=document.getElementById("email").value.trim();
        const phone=document.getElementById("phone").value.trim();
        const subject=document.getElementById("subject").value.trim();
        const message=document.getElementById("message").value.trim();

        if(name==="" || email==="" || phone==="" || subject==="" || message===""){
            alert("Please fill in all fields.");
            return;
        }

        const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(email)){
            alert("Please enter a valid email address.");
            return;
        }

        alert("Your message has been submitted successfully!");

        form.reset();

    });

}
// ==========================
// Animated Stats Counter
// ==========================

const counters = document.querySelectorAll(".counter");
const statsSection = document.querySelector(".stats-section");

let counterStarted = false;

const startCounters = () => {

    counters.forEach(counter => {

        const target = Number(counter.getAttribute("data-target"));
        let current = 0;

        const increment = target / 100;

        const updateCounter = () => {

            current += increment;

            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }

        };

        updateCounter();

    });

};


// Intersection Observer

if (statsSection) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting && !counterStarted) {

                counterStarted = true;

                // Start counter
                startCounters();

                // Animate stats cards
                const statCards = statsSection.querySelectorAll(".stat-card");

                statCards.forEach((card, index) => {

                    setTimeout(() => {
                        card.classList.add("show");
                    }, index * 150);

                });

            }

        });

    }, {
        threshold: 0.3
    });

    observer.observe(statsSection);
}

// Back to Top Button

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    backToTop.style.display = "none";

    window.addEventListener("scroll", function () {

        if (window.scrollY > 50) {
            backToTop.style.display = "flex";
        } else {
            backToTop.style.display = "none";
        }

    });

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

// =========================
// DARK MODE TOGGLE
// =========================

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");

    if (themeIcon) {
        themeIcon.classList.remove("bi-moon-fill");
        themeIcon.classList.add("bi-sun-fill");
    }
}

// Toggle dark mode
if (themeToggle) {
    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");

            themeIcon.classList.remove("bi-moon-fill");
            themeIcon.classList.add("bi-sun-fill");

        } else {

            localStorage.setItem("theme", "light");

            themeIcon.classList.remove("bi-sun-fill");
            themeIcon.classList.add("bi-moon-fill");
        }

    });
}

// ========================================
// STATS CARDS - SLIDE UP ON SCROLL
// ========================================

const statCards = document.querySelectorAll(".stat-card");

const statsObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.2
});

statCards.forEach((card) => {
    statsObserver.observe(card);
});
// EmailJS - Contact / Admission Enquiry Form
emailjs.init({
    publicKey: "4e1OdY5yqM6VfwY6R"
});

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const templateParams = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            course: document.getElementById("course").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        };

        emailjs.send(
            "service_56oyn7u",
            "template_l7uzgbk",
            templateParams
        )
        .then(function () {
            alert("Your enquiry has been sent successfully!");
            contactForm.reset();
        })
        .catch(function (error) {
            console.error("EmailJS Error:", error);
            alert("EmailJS Error: " + (error.text || error.message || JSON.stringify(error)));
        });
    });
}