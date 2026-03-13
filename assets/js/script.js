// Toggle the navbar drop down
$('#toggle').on('click', function () {
  const sheet = $('.nav-sheet');
  const navbar = $('#navbar');
  const content = sheet.find('.content');

  const isOpen = sheet.hasClass('open');

  if (isOpen) {

    // Reset scroll so the panel always closes cleanly
    sheet.scrollTop(0);

    // Trigger close animation
    sheet.removeClass('open');
    navbar.removeClass('open');

    // After transition, clear content
    sheet.one('transitionend', function () {
      content.empty();
    });

  } else {

    // Opening: load content before animation
    content.html('New content here');

    // Reset scroll so it always opens at the top
    sheet.scrollTop(0);

    sheet.addClass('open');
    navbar.addClass('open');
  }
});

// Load the DRY 
function initNavbar() {
  $('#toggle').on('click', function () {
    const sheet = $('.nav-sheet');
    const navbar = $('#navbar');

    const isOpen = sheet.hasClass('open');

    if (isOpen) {
      sheet.scrollTop(0);
      sheet.removeClass('open');
      navbar.removeClass('open');
    } else {
      sheet.scrollTop(0);
      sheet.addClass('open');
      navbar.addClass('open');
    }
  });
}
//* load a modal gallery image for <p><a>
document.querySelectorAll('.img-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const imgSrc = this.getAttribute('data-img');
    document.getElementById('modalImage').src = imgSrc;
    document.getElementById('imageModal').classList.add('open');
  });
});

document.querySelector('#imageModal .close').addEventListener('click', () => {
  document.getElementById('imageModal').classList.remove('open');
});

