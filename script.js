/* =========================================
   TRENDORA JAVASCRIPT
========================================= */

function toggleMenu() {
    const menu = document.getElementById("navMenu");
    menu.classList.toggle("open");
}

function closeMenu() {
    const menu = document.getElementById("navMenu");
    menu.classList.remove("open");
}

function scrollToTrending() {
    const section = document.getElementById("trending");
    section.scrollIntoView({
        behavior: "smooth"
    });
}


/* =========================================
   CATEGORY BUTTON
========================================= */

function showCategory(category) {
    alert("🔥 " + category + " trends are coming soon!");
}


/* =========================================
   LOAD NEWS FROM news.json
========================================= */

async function loadNews() {

    const newsGrid = document.getElementById("newsGrid");

    try {

        const response = await fetch("news.json");

        if (!response.ok) {
            throw new Error("Could not load news.json");
        }

        const data = await response.json();

        newsGrid.innerHTML = "";

        data.news.forEach(function(news, index) {

            const card = document.createElement("article");

            card.className = "news-card";

            card.setAttribute(
                "data-category",
                news.category
            );

            card.innerHTML = `

                <div class="news-top">

                    <span class="news-category">
                        ${getIcon(news.category)}
                        ${news.category.toUpperCase()}
                    </span>

                    <span class="news-number">
                        #${String(index + 1).padStart(2, "0")}
                    </span>

                </div>

                <h3>
                    ${news.title}
                </h3>

                <p>
                    ${news.description}
                </p>

                <div class="news-bottom">

                    <span>
                        ${news.source}
                    </span>

                    <span>
                        Today
                    </span>

                </div>

            `;

            newsGrid.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        newsGrid.innerHTML = `
            <div class="news-card">
                <h3>Unable to load trends</h3>
                <p>
                    Please check your internet connection
                    or try again later.
                </p>
            </div>
        `;

    }
}


/* =========================================
   CATEGORY ICONS
========================================= */

function getIcon(category) {

    const icons = {

        "Technology": "🤖",

        "Entertainment": "🎬",

        "Sports": "⚽",

        "India": "🇮🇳",

        "Music": "🎵",

        "Gaming": "🎮",

        "Movies": "🎬",

        "Memes": "😂"

    };

    return icons[category] || "🔥";
}


/* =========================================
   FILTER NEWS
========================================= */

function filterNews(category, button) {

    const cards =
        document.querySelectorAll(".news-card");

    const filters =
        document.querySelectorAll(".filter");


    filters.forEach(function(filter) {

        filter.classList.remove("active");

    });


    button.classList.add("active");


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
   START TRENDORA
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {
       

        console.log(
            "🔥 Trendora loaded successfully!"
        );

        loadNews();

    }
);
// TREND FILTERS

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".trend-card");

filters.forEach(filter => {

  filter.addEventListener("click", () => {

    filters.forEach(btn => btn.classList.remove("active"));
    filter.classList.add("active");

    const category = filter.dataset.category;

    cards.forEach(card => {

      if (category === "all" ||
          card.dataset.category === category) {

        card.style.display = "block";

      } else {

        card.style.display = "none";

      }

    });

  });

});


// STORY POPUP

function openStory(title, category, text) {

  document.getElementById("storyTitle").textContent = title;
  document.getElementById("storyCategory").textContent = category;
  document.getElementById("storyText").textContent = text;

  document.getElementById("storyModal").style.display = "flex";

  document.body.style.overflow = "hidden";
}


function closeStory() {

  document.getElementById("storyModal").style.display = "none";

  document.body.style.overflow = "auto";
}


// CLOSE WHEN CLICKING OUTSIDE

document.getElementById("storyModal").addEventListener("click", function(e) {

  if (e.target === this) {
    closeStory();
  }

});
