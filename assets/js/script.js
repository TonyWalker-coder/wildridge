//toggle the navbar drop down
$('#toggle').on('click', function () {
  const sheet = $('.nav-sheet');
  const navbar = $('#navbar');

  const isOpen = sheet.hasClass('open');

  if (isOpen) {
    // Phase 1: prepare for closing
    sheet.addClass('closing'); // optional helper class

    // Phase 2: trigger the CSS close animation
    sheet.removeClass('open');
    navbar.removeClass('open');

    // Phase 3: wait for CSS to finish, then clean up
    
    sheet.one('transitionend', function () {
      sheet.removeClass('closing');
      sheet.find('.content').empty(); // or whatever you need
    });

  } else {
    // Opening: add content before animation
    sheet.find('.content').html('New content here');
    sheet.addClass('open');
    navbar.addClass('open');
  }
});


