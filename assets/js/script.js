/* ============================================================
   THEME TOGGLE
============================================================ */

document.addEventListener("click", function (e) {
  if (e.target.id === "themeToggle") {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const saved = localStorage.getItem("theme");
  if (saved) {
    document.documentElement.setAttribute("data-theme", saved);
  }
});

/* ============================================================
   LOAD NAVBAR (DRY)
============================================================ */

fetch("navbar.html")
  .then(function (r) {

    if (!r.ok) {
      throw new Error(`HTTP ${r.status}`);
    }

    return r.text();
  })

  .then(function (html) {
    const nav = document.getElementById("exnavbar");

    nav.innerHTML = html;
    nav.classList.add("loaded");

    initNavbar();
  })

  .catch(function (error) {

    console.error("Navbar failed to load:", error);

    document.getElementById("exnavbar").style.display = "none";

    const navFail = document.getElementById("navfail");

    if (navFail) {
      navFail.classList.remove("hidden");
      navFail.textContent =
        "Navigation could not be loaded. Please refresh the page or try again later.";
    }
  });

function initNavbar() {

  $("#toggle").on("click", function () {
    const sheet = $(".nav-sheet");
    const navbar = $("#navbar");
    const isOpen = sheet.hasClass("open");

    sheet.scrollTop(0);
    sheet.toggleClass("open", !isOpen);
    navbar.toggleClass("open", !isOpen);
  });

  const navLeft = document.querySelector(".nav-left");
  const logoText = document.querySelector(".logotext");

  if (navLeft && logoText) {

    navLeft.addEventListener("mouseenter", function () {
      logoText.textContent = "Home Page";
    });

    navLeft.addEventListener("mouseleave", function () {
      logoText.textContent = "WildRidge Adventures";
    });

  }
}

/* ============================================================
   ACCESSIBLE MODAL SYSTEM (UNIVERSAL)
============================================================ */

let lastFocusedElement = null;

function trapFocus(modal) {
  const selectors = [
    "button",
    "[href]",
    "input",
    "select",
    "textarea",
    "[tabindex]:not([tabindex='-1'])",
  ];
  const focusables = modal.querySelectorAll(selectors);

  if (!focusables.length) {
    return;
  }

  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  modal.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") {
      return;
    }

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

function openModal(modal) {
  lastFocusedElement = document.activeElement;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  const focusTarget =
    modal.querySelector(".close") || modal.querySelector("button") || modal;

  focusTarget.focus();
  trapFocus(modal);
}
/* ============================================================
   CLOSE MODAL
   add a single call to close modal to stop multiple eventlisteners kicking in
============================================================ */

document.addEventListener("click", function (e) {

if (!e.target.classList.contains("close-confirm")) {
return;
}

const modalId = e.target.dataset.modal;


const modal = e.target.closest(".modal");

if (modal) {
closeModal(modal);
}

});

function closeModal(modal) {

  if (!modal) {
    return;
  }

  safeHidePleaseWait();

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");

  if (document.getElementById("pleasewait")) {
    hidePleaseWait();
  }

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

/* Close buttons */
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("close")) {
    closeModal(e.target.closest(".modal"));
  }
});

/* Click outside to close */
document.querySelectorAll(".modal").forEach(function (modal) {
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal(modal);
    }
  });

  modal.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal(modal);
    }
  });
});

/* ============================================================
   IMAGE MODAL (GALLERY)
============================================================ */

document.querySelectorAll(".img-link").forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");

    // Hide current image instantly
    modalImage.style.opacity = 0;

    // Preload new image
    const preload = new Image();
    preload.src = link.dataset.img;

    preload.onload = () => {
      modalImage.src = preload.src;
      modalImage.alt = link.dataset.alt || "";

      // Fade in once fully loaded
      modalImage.style.opacity = 1;
    };

    openModal(modal);
  });
});

/* ============================================================
   WEATHER (Open-Meteo API)

Due to 7timer.info no longer being available after this project was
handed in and the time it took to write this API handler. This API 
was rewritten by Microsoft Copilot in the interest of getting a 
speedy solution using the Open-Meteo weather API

============================================================ */

async function fetchWeather(lat, lon) {
  const base = "https://api.open-meteo.com/v1/forecast";
  const query =
    "?latitude=" + lat +
    "&longitude=" + lon +
    "&hourly=temperature_2m,cloudcover,precipitation_probability,precipitation,winddirection_10m,windspeed_10m" +
    "&forecast_days=7";

  const url = base + query;

  const response = await fetch(url);
  const data = await response.json();


  const series = data.hourly.time.map((t, i) => {
    return {
      timepoint: i, // hours ahead
      temp2m: data.hourly.temperature_2m[i],
      cloudcover: Math.round(data.hourly.cloudcover[i] / 11), // convert 0–100% → approx 0–9 scale
      wind10m: {
        speed: data.hourly.windspeed_10m[i],
        direction: degToCompass(data.hourly.winddirection_10m[i])
      },
      prec_type: getPrecipType(
        data.hourly.precipitation[i],
        data.hourly.precipitation_probability[i]
      )
    };
  });

  return series;
}


function degToCompass(deg) {
  const dirs = ["N","NE","E","SE","S","SW","W","NW"];
  return dirs[Math.round(deg / 45) % 8];
}


function getPrecipType(amount, probability) {
  if (amount > 0 && probability > 50) return "rain";
  return "none";
}

function buildForecastHTML(type, series, locationName) {
  const sliceMap = {
    "3day": 24,
    "7day": 56,
    today: 8,
  };

  const sliced = series.slice(0, sliceMap[type]);

  let html = "";
  html += "<h1>Weather for " + locationName + "</h1>";
  html += "<h2>" + type + " Forecast</h2>";

  sliced.forEach(function (p) {
    html +=
      '<div class="forecast-block">' +
      '<div class="icon">' +
      getWeatherIcon(p) +
      "</div>" +
      "<div>" +
      "<p><strong>+" +
      p.timepoint +
      "h</strong></p>" +
      "<p>Temp: " +
      p.temp2m +
      "°C</p>" +
      "<p>Cloud: " +
      p.cloudcover +
      "/9</p>" +
      "<p>Wind: " +
      p.wind10m.speed +
      " m/s (" +
      p.wind10m.direction +
      ")</p>" +
      "<p>Precip: " +
      p.prec_type +
      "</p>" +
      "</div></div>";
  });

  return html;
}

async function showWeather(type, lat, lon, locationName) {

  try {

    showPleaseWait();

    const series = await fetchWeather(lat, lon);
    const html = buildForecastHTML(type, series, locationName);

    const modal = document.getElementById("weatherModal");

    modal.querySelector(".modal-content").innerHTML = html;

    openModal(modal);

  } catch (error) {

    const modal = document.getElementById("weatherModal");

    modal.querySelector(".modal-content").innerHTML =
      "<h2>Weather Unavailable</h2>" +
      "<p>Unable to retrieve forecast data at this time.</p>";

    openModal(modal);



  } finally {

    hidePleaseWait();

  }
}
window.showWeather = showWeather;


function getWeatherIcon(p) {
  if (p.prec_type === "rain") {
    return "🌧️";
  }
  if (p.prec_type === "snow") {
    return "❄️";
  }
  if (p.prec_type === "none") {
    if (p.cloudcover <= 3) {
      return "☀️";
    }
    if (p.cloudcover <= 6) {
      return "⛅";
    }
    return "☁️";
  }
  return "🌡️";
}


/* ============================================================
   NEWS LETTER MODAL
============================================================ */

document.body.addEventListener("click", function (e) {
  if (e.target.id === "newsBtn") {
    const modal = document.getElementById("newsModal");
    const content = modal.querySelector(".modal-content");

    let html = "";
    html += "<h2>News Letter</h2>";
    html += '<form id="newsLetter">';
    html += '<label for="newsletterName">Name</label>';
    html += '<input id="newsletterName" type="text" placeholder="Your name" required>';
    html += '<label for="newsletterEmail">Email Address</label>';
    html += '<input id="newsletterEmail" type="email" placeholder="Email" required>';
    html += '<button type="submit">Submit</button>';
    html += "</form>";

    content.innerHTML = html;
    openModal(modal);
  }
});

document.addEventListener("submit", function (e) {
  if (e.target.id === "newsLetter") {
    e.preventDefault();

    const modal = document.getElementById("newsModal");
    const content = modal.querySelector(".modal-content");

    content.innerHTML =
      "<h2>Newsletter Submitted</h2>" +
      "<p>Your request has been received.</p>" +
      '<button class="close-confirm">Close</button>';

    closeModal(modal);

    setTimeout(function () {
      openModal(modal);
    }, 150);
  }
});

/* ============================================================
   FEEDBACK MODAL
============================================================ */

document.body.addEventListener("click", function (e) {
  if (e.target.id === "feedBtn") {
    const modal = document.getElementById("feedModal");
    const content = modal.querySelector(".modal-content");

    let html = "";
    html += "<h2>Feedback</h2>";
    html += '<form id="feedForm">';
    html += '<label for="feedbackText">Your feedback:</label>';
    html += '<textarea id="feedbackText" ';
    html += 'placeholder="Write anything you like..." ';
    html += 'rows="6" required></textarea>';
    html += '<label for="feedbackName">Your name (optional)</label>';
    html += '<input id="feedbackName" type="text" placeholder="Your name (optional)">';
    html += '<button type="submit">Submit</button>';
    html += "</form>";

    content.innerHTML = html;
    openModal(modal);
  }
});

document.addEventListener("submit", function (e) {
  if (e.target.id === "feedForm") {
    e.preventDefault();

    const modal = document.getElementById("feedModal");
    const content = modal.querySelector(".modal-content");

    content.innerHTML =
      "<h2>Thank You!</h2>" +
      "<p>Your feedback has been submitted.</p>" +
      '<button class="close-confirm">Close</button>';

    closeModal(modal);

    setTimeout(function () {
      openModal(modal);
    }, 150);
  }
});

/* ============================================================
   PLEASE WAIT
============================================================ */

function showPleaseWait() {
  document.getElementById("pleasewait").style.display = "block";
}

function hidePleaseWait() {
  document.getElementById("pleasewait").style.display = "none";
}
window.showPleaseWait = showPleaseWait;

/* ============================================================
   ENSURE PLEASE WAIT IS ONLY CALLED WHEN NEEDED
============================================================ */

function safeHidePleaseWait() {
  const el = document.getElementById("pleasewait");
  if (el) {
    el.style.display = "none";
  }
}

/* ============================================================
   BOOKING FORM MODAL
============================================================ */

document.body.addEventListener("click", function (e) {
  const btn = e.target.closest("#bookBtn");
  if (btn) {
    const modal = document.getElementById("appModal");
    const content = modal.querySelector(".modal-content");

    let html = "";
    html += "<h2>Booking Form</h2>";
    html += '<form id="bookingForm">';
    html += '<label for="bookingName">Name</label>';
    html += '<input id="bookingName" type="text" placeholder="Your name" required>';
    html += '<label for="bookingEmail">Email Address</label>';
    html += '<input id="bookingEmail" type="email" placeholder="Email" required>';
    html += '<label for="bookingPhone">Phone Number</label>';
    html += '<input id="bookingPhone" type="tel" placeholder="Phone">';
    html += '<label for="bookingDate">Booking Date</label>';
    html += '<input id="bookingDate" type="date" required>';
    html += '<label for="package">Select your package:</label>';
    html += '<select id="package" name="package">';
    html += '<option value="1">Driving package</option>';
    html += '<option value="2">Skiing package</option>';
    html += '<option value="3">Climbing package</option>';
    html += '<option value="4">Hiking package</option>';
    html += "</select>";
    html += '<button type="submit">Submit</button>';
    html += "</form>";

    content.innerHTML = html;
    openModal(modal);
  }
});