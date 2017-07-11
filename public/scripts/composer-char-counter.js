$(document).ready(function() {

  $('.new-tweet').on('keyup', 'textarea', function() {
  let chars = $(this).val();
  let count = $('.counter');
    // console.log(chars.length);
    count.html(140 - chars.length);

    if (chars.length > 140) {
      count.addClass('red');
    } else {
      count.removeClass('red');
    }
  });
});