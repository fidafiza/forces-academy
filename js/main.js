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