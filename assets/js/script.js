//toggle the navbar drop down

console.log("script.js loaded");

console.log("sheet count:", $('.nav-sheet').length);


$('#toggle').on('click', function() {
  console.log("button clicked");

  $('.nav-sheet').toggleClass('open');
  $('#navbar').toggleClass('open');
});
