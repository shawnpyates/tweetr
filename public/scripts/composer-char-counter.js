$(document).ready(function() {

  const max = 140;
  $('.counter').text(max);
  $('.new-tweet textarea').on('input', function() {
    let $chars = $(this).val().length;
    let $remaining = max - $chars;
    $('.counter').text($remaining);
    $ ('.counter').css('color', 'black')
    if ($remaining < 0) {
      $('.counter').css('color', 'red');
    }
  });
});