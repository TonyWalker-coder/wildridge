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
