/* =========================================================
   TRENDORA - COMPLETE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. TRENDING FILTERS
       ===================================================== */

    const filters = document.querySelectorAll(".filter");
    const cards = document.querySelectorAll(".trend-card");

    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            // Remove active class from all filters
            filters.forEach(item => {
                item.classList.remove("active");
            });

            // Add active class to clicked filter
            filter.classList.add("active");

            const selectedCategory =
                filter.getAttribute("data-filter") ||
                filter.textContent.trim().toLowerCase();

            let visibleCards = 0;

            cards.forEach(card => {

                const cardCategory =
                    card.getAttribute("data-category")?.toLowerCase() || "";

                if (
                    selectedCategory === "all" ||
                    selectedCategory === "all trends" ||
                    cardCategory === selectedCategory
                ) {

                    card.style.display = "block";

                    setTimeout(() => {
                        card.classList.add("show");
                    }, 50);

                    visibleCards++;

                } else {

                    card.classList.remove("show");
                    card.style.display = "none";

                }

            });

            updateResultMessage(
                visibleCards,
                selectedCategory
            );

        });

    });


    /* =====================================================
       2. INITIAL CARD ANIMATION
       ===================================================== */

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(25px)";

        setTimeout(() => {

            card.style.transition =
                "opacity 0.6s ease, transform 0.6s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, index * 120);

    });


    /* =====================================================
       3. SEARCH SYSTEM
       ===================================================== */

    window.searchTrends = function () {

        const input =
            document.getElementById("searchInput");

        const result =
            document.getElementById("searchResult");

        if (!input) return;

        const searchText =
            input.value.trim().toLowerCase();

        if (searchText === "") {

            cards.forEach(card => {
                card.style.display = "block";
            });

            if (result) {
                result.textContent =
                    "Showing all trending topics.";
            }

            return;
        }

        let found = 0;

        cards.forEach(card => {

            const cardText =
                card.textContent.toLowerCase();

            if (cardText.includes(searchText)) {

                card.style.display = "block";
                found++;

                card.style.animation =
                    "trendSearchIn 0.5s ease";

            } else {

                card.style.display = "none";

            }

        });


        /* Scroll to trending section */

        const trendingSection =
            document.getElementById("trending");

        if (trendingSection) {

            trendingSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }


        /* Search result */

        if (result) {

            if (found > 0) {

                result.textContent =
                    `⚡ ${found} trending result${found > 1 ? "s" : ""} found for "${input.value}"`;

            } else {

                result.textContent =
                    `❌ No trends found for "${input.value}"`;

            }

        }

    };


    /* =====================================================
       4. SEARCH WITH ENTER KEY
       ===================================================== */

    const searchInput =
        document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener("keydown", event => {

            if (event.key === "Enter") {

                event.preventDefault();

                searchTrends();

            }

        });

    }


    /* =====================================================
       5. STORY POPUP
       ===================================================== */

    window.openStory = function (
        title,
        category,
        text
    ) {

        const modal =
            document.getElementById("storyModal");

        const modalTitle =
            document.getElementById("modalTitle");

        const modalCategory =
            document.getElementById("modalCategory");

        const modalText =
            document.getElementById("modalText");

        if (!modal) return;

        if (modalTitle) {
            modalTitle.textContent = title;
        }

        if (modalCategory) {
            modalCategory.textContent =
                category;
        }

        if (modalText) {
            modalText.textContent =
                text;
        }

        modal.classList.add("active");

        document.body.style.overflow =
            "hidden";

    };


    /* =====================================================
       6. CLOSE STORY POPUP
       ===================================================== */

    window.closeStory = function () {

        const modal =
            document.getElementById("storyModal");

        if (!modal) return;

        modal.classList.remove("active");

        document.body.style.overflow =
            "";

    };


    /* =====================================================
       7. CLOSE POPUP WHEN CLICKING OUTSIDE
       ===================================================== */

    const storyModal =
        document.getElementById("storyModal");

    if (storyModal) {

        storyModal.addEventListener("click", event => {

            if (event.target === storyModal) {

                closeStory();

            }

        });

    }


    /* =====================================================
       8. ESCAPE KEY CLOSES POPUP
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeStory();

        }

    });


    /* =====================================================
       9. MOBILE MENU
       ===================================================== */

    window.toggleMenu = function () {

        const nav =
            document.querySelector("nav");

        if (!nav) return;

        nav.classList.toggle("mobile-open");

    };


    /* =====================================================
       10. CLOSE MOBILE MENU AFTER CLICK
       ===================================================== */

    const navLinks =
        document.querySelectorAll("nav a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            const nav =
                document.querySelector("nav");

            if (nav) {

                nav.classList.remove(
                    "mobile-open"
                );

            }

        });

    });


    /* =====================================================
       11. LIVE TRENDING CLOCK
       ===================================================== */

    function updateLiveTime() {

        const liveTime =
            document.getElementById("liveTime");

        if (!liveTime) return;

        const now = new Date();

        const hours =
            String(now.getHours()).padStart(2, "0");

        const minutes =
            String(now.getMinutes()).padStart(2, "0");

        const seconds =
            String(now.getSeconds()).padStart(2, "0");

        liveTime.textContent =
            `${hours}:${minutes}:${seconds}`;

    }

    updateLiveTime();

    setInterval(updateLiveTime, 1000);


    /* =====================================================
       12. TRENDING COUNTER
       ===================================================== */

    const counter =
        document.getElementById("trendCounter");

    if (counter) {

        let current = 0;

        const target = 128;

        const duration = 1500;

        const startTime = performance.now();

        function animateCounter(time) {

            const progress =
                Math.min(
                    (time - startTime) / duration,
                    1
                );

            current =
                Math.floor(
                    progress * target
                );

            counter.textContent =
                current;

            if (progress < 1) {

                requestAnimationFrame(
                    animateCounter
                );

            }

        }

        requestAnimationFrame(
            animateCounter
        );

    }


    /* =====================================================
       13. CARD HOVER EFFECT
       ===================================================== */

    cards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.style.transform =
                    "translateY(-8px)";

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "translateY(0)";

            }
        );

    });


    /* =====================================================
       14. IMAGE ERROR HANDLING
       ===================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.display =
                    "none";

                const parent =
                    image.parentElement;

                if (parent) {

                    parent.classList.add(
                        "image-error"
                    );

                }

            }
        );

    });


    /* =====================================================
       15. SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".category-card, .trend-card, .about-card"
        );

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );

        revealElements.forEach(element => {

            observer.observe(element);

        });

    }


    /* =====================================================
       16. SMOOTH ANCHOR SCROLL
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });


    /* =====================================================
       17. RANDOM CYBER GLITCH EFFECT
       ===================================================== */

    const logo =
        document.querySelector(".logo");

    if (logo) {

        setInterval(() => {

            logo.classList.add(
                "cyber-glitch"
            );

            setTimeout(() => {

                logo.classList.remove(
                    "cyber-glitch"
                );

            }, 250);

        }, 5000);

    }


    /* =====================================================
       18. TREND RESULT MESSAGE
       ===================================================== */

    function updateResultMessage(
        count,
        category
    ) {

        const result =
            document.getElementById(
                "searchResult"
            );

        if (!result) return;

        if (
            category === "all" ||
            category === "all trends"
        ) {

            result.textContent =
                `⚡ Showing ${count} trending topics`;

        } else {

            result.textContent =
                `⚡ ${count} ${category} trend${count !== 1 ? "s" : ""} found`;

        }

    }


    /* =====================================================
       19. BACK TO TOP BUTTON
       ===================================================== */

    const backTop =
        document.getElementById(
            "backToTop"
        );

    if (backTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (
                    window.scrollY > 500
                ) {

                    backTop.classList.add(
                        "visible"
                    );

                } else {

                    backTop.classList.remove(
                        "visible"
                    );

                }

            }
        );

        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       20. CURRENT YEAR
       ===================================================== */

    const year =
        document.getElementById(
            "currentYear"
        );

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       21. PAGE LOADED EFFECT
       ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


    console.log(
        "⚡ TRENDORA SYSTEM ONLINE"
    );

    console.log(
        "🔥 Trending engine initialized"
    );

});


/* =========================================================
   EXTRA CSS ANIMATIONS CREATED BY JAVASCRIPT
   ========================================================= */

const dynamicStyle =
    document.createElement("style");

dynamicStyle.textContent = `

@keyframes trendSearchIn {

    from {
        opacity: 0;
        transform: translateY(20px) scale(0.98);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }

}

.cyber-glitch {

    animation:
        cyberGlitch 0.25s
        linear;

}

@keyframes cyberGlitch {

    0% {
        transform: translateX(0);
        filter: none;
    }

    25% {
        transform: translateX(-2px);
        filter:
            drop-shadow(2px 0 #00f5ff)
            drop-shadow(-2px 0 #ff2bd6);
    }

    50% {
        transform: translateX(2px);
        filter: none;
    }

    75% {
        transform: translateX(-1px);
        filter:
            drop-shadow(-2px 0 #00f5ff);
    }

    100% {
        transform: translateX(0);
        filter: none;
    }

}

.revealed {

    opacity: 1 !important;
    transform: translateY(0) !important;

}

`;

document.head.appendChild(dynamicStyle);
