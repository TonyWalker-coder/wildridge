// Toggle the navbar drop down
$('#toggle').on('click', function () {
  const sheet = $('.nav-sheet');
  const navbar = $('#navbar');
  const content = sheet.find('.content');

  const isOpen = sheet.hasClass('open');

  if (isOpen) {

    // Reset scroll so no painted slice remains
    content.scrollTop(0);

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
    sheet.addClass('open');
    navbar.addClass('open');
  }
});