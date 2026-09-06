/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

    const menu = document.getElementById("navMenu");

    menu.classList.toggle("active");

}


/* =========================
   LIKE BUTTON
========================= */

function like(button) {

    if (button.classList.contains("liked")) {

        button.innerHTML = "♡ Like";
        button.classList.remove("liked");

    } else {

        button.innerHTML = "♥ Liked";
        button.classList.add("liked");

    }

}


/* =========================
   REFRESH
========================= */

function refreshPage() {

    const button = document.querySelector(".refresh");

    button.style.transform = "rotate(360deg)";

    setTimeout(function () {

        button.style.transform = "rotate(0deg)";

    }, 500);

}


/* =========================
   CATEGORY
========================= */

function category(name) {

    alert(
        name + " section is coming soon! 🔥"
    );

}


/* =========================
   DISCOVER
========================= */

function discover() {

    document
        .getElementById("trending")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   PAGE LOADED
========================= */

console.log(
    "Trendora loaded successfully 🚀"
);
