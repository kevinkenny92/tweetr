$(document).ready(function() {

  let tweetIcons = $('.new-tweet__icons');

  $('.tweet').hover(function() {
    $(this).css('opacity', '1');
    $(this).find(tweetIcons).css('display', 'initial');
  }, function() {
    $(this).css('opacity', '0.7');
    $(this).find(tweetIcons).css('display', 'none');
  });
});