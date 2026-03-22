//small script to write home page
document.addEventListener(
  "mouseenter",
  (e) => {
    if (e.target.matches(".logo")) {
      document.querySelector(".logotext").textContent = "Home Page";
    }
  },
  true,
);

document.addEventListener(
  "mouseleave",
  (e) => {
    if (e.target.matches(".logo")) {
      document.querySelector(".logotext").textContent = "WildRidge Adventures";
    }
  },
  true,
);

// toggle the light/dark theme
document.addEventListener("click", (e) => {
  if (e.target.id === "themeToggle") {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }
});

  // Load saved theme

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme");
  if (saved) {
    document.documentElement.setAttribute("data-theme", saved);
  }
});
//script to load DRY navbar
fetch('navbar.html')
      .then(r => r.text())
      .then(html => {
        const nav = document.getElementById('exnavbar');
        nav.innerHTML = html;
        nav.classList.add('loaded');

        initNavbar(); // navbar now exists → safe to bind events
      });


// Toggle the navbar drop down
$("#toggle").on("click", function () {
  const sheet = $(".nav-sheet");
  const navbar = $("#navbar");
  const content = sheet.find(".content");

  const isOpen = sheet.hasClass("open");

  if (isOpen) {
    // Reset scroll so the panel always closes cleanly
    sheet.scrollTop(0);

    // Trigger close animation
    sheet.removeClass("open");
    navbar.removeClass("open");

    // After transition, clear content
    sheet.one("transitionend", function () {
      content.empty();
    });
  } else {
    // Opening: load content before animation
    content.html("New content here");

    // Reset scroll so it always opens at the top
    sheet.scrollTop(0);

    sheet.addClass("open");
    navbar.addClass("open");
  }
});

// Load the DRY
function initNavbar() {
  $("#toggle").on("click", function () {
    const sheet = $(".nav-sheet");
    const navbar = $("#navbar");

    const isOpen = sheet.hasClass("open");

    if (isOpen) {
      sheet.scrollTop(0);
      sheet.removeClass("open");
      navbar.removeClass("open");
    } else {
      sheet.scrollTop(0);
      sheet.addClass("open");
      navbar.addClass("open");
    }
  });
}
// load a modal gallery image for <p><a>
// Note: Occasional blue focus flash may appear when clicking rapidly.
// See README → Modal Testing Notes. Standard mitigations applied; behaviour accepted as-is.
document.querySelectorAll(".img-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const imgSrc = this.getAttribute("data-img");
    const imgAlt = this.getAttribute("data-alt") || "";
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");

    modalImage.src = imgSrc;
    modalImage.alt = imgAlt;

    modal.classList.add("open");
    modal.focus();
  });
});

// universal close button for ANY modal
document.querySelectorAll(".modal .close").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".modal").classList.remove("open");
    hidePleaseWait?.();
  });
});

// click outside to close
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
      hidePleaseWait?.();
    }
  });
});


// load modal booking form
document.getElementById("bookBtn").addEventListener("click", () => {
  const modal = document.getElementById("appModal");
  const content = modal.querySelector(".modal-content");

  content.innerHTML = `
    <h2>Booking Form</h2>
    <form id="bookingForm">
      <input type="text" placeholder="Your name" required>
      <input type="email" placeholder="Email" required>
      <input type="number" placeholder="Phone">
      <input type="date" placeholder="Req date" required>
      <label for="package">Select your package:</label>
      <select id="package" name="package">
          <option value="1">Driving package</option>
          <option value="2">Skiing package</option>
          <option value="3">Climbing package</option>
          <option value="4">Hiking package</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  `;

  modal.classList.add("open");
  modal.focus();
});

// close on submit and load confirmation modal
document.addEventListener("submit", function (e) {
  if (e.target.id === "bookingForm") {
    e.preventDefault();

    const modal = document.getElementById("appModal");
    const content = modal.querySelector(".modal-content");

    modal.classList.remove("open");

    // Small delay to avoid flicker
    setTimeout(() => {
      content.innerHTML = `
        <h2>Booking Confirmed</h2>
        <p>Your request has been received.</p>
        <button class="close-confirm">Close</button>
      `;
      modal.classList.add("open");
      modal.focus();
    }, 150);
  }
});

// close confirmation modal
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("close-confirm")) {
    document.getElementById("appModal").classList.remove("open");
  }
});





// Fetch weather from 7Timer API
async function fetch7Timer(lat, lon) {
  const url = `https://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`;
  const response = await fetch(url);
  const data = await response.json();
  return data.dataseries;
}

// Build the HTML for the forecast modal
function buildForecastHTML(type, series, locationName) {
  let sliceCount = 0;

  if (type === "today") sliceCount = 8;
  if (type === "3day") sliceCount = 24;
  if (type === "7day") sliceCount = 56;

  const sliced = series.slice(0, sliceCount);

  let html = `
        <h1>Weather for ${locationName}</h1>
        <h2>${type.toLowerCase()} Forecast</h2>
    `;

  sliced.forEach((point) => {
    html += `
    <div class="forecast-block">
        <div class="icon">${getWeatherIcon(point)}</div>
        <div>
            <p><strong>+${point.timepoint}h</strong></p>
            <p>Temp: ${point.temp2m}°C</p>
            <p>Cloud: ${point.cloudcover}/9</p>
            <p>Wind: ${point.wind10m.speed} m/s (${point.wind10m.direction})</p>
            <p>Precip: ${point.prec_type}</p>
        </div>
    </div>
`;
  });

  return html;
}

// Show the modal with the correct location + forecast type
async function showWeather(type, lat, lon, locationName) {
  const series = await fetch7Timer(lat, lon);
  const html = buildForecastHTML(type, series, locationName);

  const modal = document.getElementById("weatherModal");
  modal.querySelector(".modal-content").innerHTML = html;
  modal.classList.add("open");
}


// icons for the weather
function getWeatherIcon(point) {
  // Precipitation
  if (point.prec_type === "rain") return "🌧️";
  if (point.prec_type === "snow") return "❄️";
  if (point.prec_type === "none") {
    // Cloud cover scale: 1–9
    if (point.cloudcover <= 3) return "☀️";
    if (point.cloudcover <= 6) return "⛅";
    return "☁️";
  }
  return "🌡️";
}

//display please wait
function showPleaseWait() {
  const pw = document.getElementById("pleasewait");
  pw.style.display = "block";
}
function hidePleaseWait() {
  document.getElementById("pleasewait").style.display = "none";
}

