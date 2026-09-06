/* =========================================
   TRENDORA JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

function toggleMenu() {

    const menu = document.getElementById("navMenu");

    menu.classList.toggle("open");

}


function closeMenu() {

    const menu = document.getElementById("navMenu");

    menu.classList.remove("open");

}


/* =========================================
   SCROLL TO TRENDING
========================================= */

function scrollToTrending() {

    const section = document.getElementById("trending");

    section.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================================
   CATEGORY BUTTONS
========================================= */

function showCategory(category) {

    alert(
        "🔥 " +
        category +
        " trends are coming soon!"
    );

}


/* =========================================
   NEWS FILTER
========================================= */

function filterNews(category, button) {

    const cards =
        document.querySelectorAll(".news-card");

    const filters =
        document.querySelectorAll(".filter");


    /* Remove active */

    filters.forEach(function(filter) {

        filter.classList.remove("active");

    });


    /* Add active */

    button.classList.add("active");


    /* Filter cards */

    cards.forEach(function(card) {

        const cardCategory =
            card.getAttribute("data-category");


        if (
            category === "All" ||
            cardCategory === category
        ) {

            card.classList.remove("hidden");

        } else {

            card.classList.add("hidden");

        }

    });

}


/* =========================================
   PAGE LOADED
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "🔥 Trendora loaded successfully!"
        );

    }
);
