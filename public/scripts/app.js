/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// $(document).ready(function() {

  $('.posted-tweets').mouseover(function() {
    $(this).find('footer i').css('opacity', '1');
  });

  $('.posted-tweets').mouseleave(function() {
    $(this).find('footer i').css('opacity', '0.6');
  });
});



