/* ============================================================
   LOGO HOVER TEXT
============================================================ */
document.addEventListener("mouseenter", (e) => {
  if (e.target.matches(".logo")) {
    document.querySelector(".logotext").textContent = "Home Page";
  }
}, true);

document.addEventListener("mouseleave", (e) => {
  if (e.target.matches(".logo")) {
    document.querySelector(".logotext").textContent = "WildRidge Adventures";
  }
}, true);


/* ============================================================
   THEME TOGGLE
============================================================ */
document.addEventListener("click", (e) => {
  if (e.target.id === "themeToggle") {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);
});


/* ============================================================
   LOAD NAVBAR (DRY)
============================================================ */
fetch("navbar.html")
  .then(r => r.text())
  .then(html => {
    const nav = document.getElementById("exnavbar");
    nav.innerHTML = html;
    nav.classList.add("loaded");
    initNavbar();
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
}


/* ============================================================
   ACCESSIBLE MODAL SYSTEM (UNIVERSAL)
============================================================ */
let lastFocusedElement = null;

function trapFocus(modal) {
  const selectors = [
    "button", "[href]", "input", "select", "textarea",
    "[tabindex]:not([tabindex='-1'])"
  ];
  const focusables = modal.querySelectorAll(selectors);
  if (!focusables.length) return;

  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;

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
    modal.querySelector(".close") ||
    modal.querySelector("button") ||
    modal;

  focusTarget.focus();


  trapFocus(modal);
}

function closeModal(modal) {
  safeHidePleaseWait();

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");


  if (document.getElementById("pleasewait")) {
    hidePleaseWait();
  }


  if (lastFocusedElement) lastFocusedElement.focus();
}

// Close buttons
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    closeModal(e.target.closest(".modal"));
  }
});

// Click outside to close
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });

  modal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal(modal);
  });
});


/* ============================================================
   IMAGE MODAL (GALLERY)
============================================================ */
document.querySelectorAll(".img-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");

    modalImage.src = link.dataset.img;
    modalImage.alt = link.dataset.alt || "";

    openModal(modal);
  });
});


/* ============================================================
   BOOKING FORM MODAL
============================================================ */
document.body.addEventListener("click", (e) => {
  if (e.target.id === "bookBtn") {
    const modal = document.getElementById("appModal");
    const content = modal.querySelector(".modal-content");

    content.innerHTML = `
      <h2>Booking Form</h2>
      <form id="bookingForm">
        <input type="text" placeholder="Your name" required>
        <input type="email" placeholder="Email" required>
        <input type="number" placeholder="Phone">
        <input type="date" required>
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

    openModal(modal);
  }
});

// Submit → confirmation modal
document.addEventListener("submit", (e) => {
  if (e.target.id === "bookingForm") {
    e.preventDefault();

    const modal = document.getElementById("appModal");
    const content = modal.querySelector(".modal-content");

    closeModal(modal);

    setTimeout(() => {
      content.innerHTML = `
        <h2>Booking Confirmed</h2>
        <p>Your request has been received.</p>
        <button class="close-confirm">Close</button>
      `;
      openModal(modal);
    }, 150);
  }
});

// Close confirmation
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-confirm")) {
    closeModal(document.getElementById("appModal"));
  }
});


/* ============================================================
   WEATHER (7Timer API)
============================================================ */
async function fetch7Timer(lat, lon) {
  const url = `https://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`;
  const response = await fetch(url);
  const data = await response.json();
  return data.dataseries;
}

function buildForecastHTML(type, series, locationName) {
  const sliceMap = { today: 8, "3day": 24, "7day": 56 };
  const sliced = series.slice(0, sliceMap[type]);

  let html = `
    <h1>Weather for ${locationName}</h1>
    <h2>${type} Forecast</h2>
  `;

  sliced.forEach((p) => {
    html += `
      <div class="forecast-block">
        <div class="icon">${getWeatherIcon(p)}</div>
        <div>
          <p><strong>+${p.timepoint}h</strong></p>
          <p>Temp: ${p.temp2m}°C</p>
          <p>Cloud: ${p.cloudcover}/9</p>
          <p>Wind: ${p.wind10m.speed} m/s (${p.wind10m.direction})</p>
          <p>Precip: ${p.prec_type}</p>
        </div>
      </div>
    `;
  });

  return html;
}

async function showWeather(type, lat, lon, locationName) {
  const series = await fetch7Timer(lat, lon);
  const html = buildForecastHTML(type, series, locationName);

  const modal = document.getElementById("weatherModal");
  modal.querySelector(".modal-content").innerHTML = html;

  openModal(modal);
}

function getWeatherIcon(p) {
  if (p.prec_type === "rain") return "🌧️";
  if (p.prec_type === "snow") return "❄️";
  if (p.prec_type === "none") {
    if (p.cloudcover <= 3) return "☀️";
    if (p.cloudcover <= 6) return "⛅";
    return "☁️";
  }
  return "🌡️";
}




/* ============================================================
   NEWS LETTER MODAL
============================================================ */
document.body.addEventListener("click", (e) => {
  if (e.target.id === "newsBtn") {
    const modal = document.getElementById("newsModal");
    const content = modal.querySelector(".modal-content");

    content.innerHTML = `
      <h2>News Letter</h2>
      <form id="newsLetter">
        <input type="text" placeholder="Your name" required>
        <input type="email" placeholder="Email" required>
        <button type="submit">Submit</button>
      </form>
    `;

    openModal(modal);
  }
});

// Submit → confirmation modal
document.addEventListener("submit", (e) => {
  if (e.target.id === "newsLetter") {
    e.preventDefault();

    const modal = document.getElementById("newsModal");
    const content = modal.querySelector(".modal-content");

    // Swap content BEFORE reopening
    content.innerHTML = `
  <h2>Newsletter Submitted</h2>
  <p>Your request has been received.</p>
  <button class="close-confirm">Close</button>
`;


    // Close → reopen ensures animation works
    closeModal(modal);

    setTimeout(() => {
      openModal(modal);
    }, 150);
  }
});

// Close confirmation
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-confirm")) {
    closeModal(document.getElementById("newsModal"));
  }
});

/* ============================================================
   FEEDBACK MODAL
============================================================ */
document.body.addEventListener("click", (e) => {
  if (e.target.id === "feedBtn") {
    const modal = document.getElementById("feedModal");
    const content = modal.querySelector(".modal-content");

    content.innerHTML = `
  <h2>Feedback</h2>
  <form id="feedForm">
    <label for="feedbackText">Your feedback:</label>
    <textarea id="feedbackText" placeholder="Write anything you like..." rows="6" required></textarea>

    <input type="text" placeholder="Your name (optional)">
    <button type="submit">Submit</button>
  </form>
`;



    openModal(modal);
  }
});

// Submit → confirmation modal
document.addEventListener("submit", (e) => {
  if (e.target.id === "feedForm") {
    e.preventDefault();

    const modal = document.getElementById("feedModal");
    const content = modal.querySelector(".modal-content");

    // Swap content BEFORE reopening
    content.innerHTML = `
      <h2>Thank You!</h2>
      <p>Your feedback has been submitted.</p>
      <button class="close-confirm">Close</button>
    `;

    // Close → reopen ensures animation works
    closeModal(modal);

    setTimeout(() => {
      openModal(modal);
    }, 150);
  }
});

// Close confirmation
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-confirm")) {
    closeModal(document.getElementById("feedModal"));
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
/* ============================================================
   ENSURE PLEASE WAIT IS ONLY CALLED WHEN NEEDED
============================================================ */
function safeHidePleaseWait() {
  const el = document.getElementById("pleasewait");
  if (el) el.style.display = "none";
}