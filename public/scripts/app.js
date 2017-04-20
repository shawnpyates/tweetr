/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from tweets.json

$(document).ready(function() {

  $('.new-tweet').slideUp('fast');


  function getDate(timeStamp) {
    let date = new Date(timeStamp);
    let
    return `${date.getFullYear()} ${date.getMonth() + 1}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;
  }

  function createTweetElement(tweet) {
    let $avatar = $('<img/>', { src: tweet.user.avatars.regular }).addClass("avatar");
    let $name = $('<h4></h4>', { text: tweet.user.name }).addClass("name");
    let $handle = $('<span></span>', { text: tweet.user.handle }).addClass("handle");
    let $p = $('<p></p>', { text: tweet.content.text }).addClass("text-body");
    let $time = $('<span></span>', { text: getDate(tweet.created_at) }).addClass("time");
    let $heart = $('<i/>').addClass("fa fa-heart rightmost").addClass("heart");
    let $retweet = $('<i/>').addClass("fa fa-retweet").addClass("retweet");
    let $flag = $('<i/>').addClass("fa fa-flag").addClass("flag");
    let $header = $('<header></header>').addClass('header');
    let $article = $('<article></article>').addClass('article');
    let $footer = $('<footer></footer>').addClass('footer');
    let $tweet = $('<section/>').addClass("tweet");
    $header.append($avatar, $name, $handle);
    $article.append($p);
    $footer.append($time, $heart, $retweet, $flag);
    $tweet.append($header, $article, $footer);
    return $tweet;
  }

  function renderTweets(tweets) {
    $("#posted-tweet-container").empty();
    for (let i = 0; i < tweets.length; i++) {
      let tweetElement = createTweetElement(tweets[i]);
      $("#posted-tweet-container").prepend(tweetElement);
    }
  }



  //load tweets from the DB
  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    }).then (function(tweets) {
      renderTweets(tweets);
    });
  }

  function errorTrueOrFalse(boolean) {
    if (boolean === true) {
      $('#invalid').css('visibility', 'visible');
    } else {
      $('#invalid').css('visibility', 'hidden');
    }
  }

  //create new tweets upon submission
  $('.new-tweet form').on('submit', function(e) {
    e.preventDefault();
    const $textLength = $(this).find('textarea').val().length;
    console.log($textLength);
    if ($textLength < 1 || $textLength > 140) {
      errorTrueOrFalse(true);
    } else {
      errorTrueOrFalse(false);
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize()
      }).then (function() {
        loadTweets();
        $('.new-tweet textarea').val("");
        $('.counter').text("140");
      });
    }
  });



  loadTweets();

  $('#posted-tweet-container').hover(function() {
    $(this).find('footer i').css('opacity', '1');
  }, function () {
    $(this).find('footer i').css('opacity', '0.6');
  });

  $('.compose').hover(function() {
    $(this).css('background-color', 'white');
    $(this).css('color', 'black');
  }, function () {
    $(this).css('background-color', 'lightcyan');
    $(this).css('color', '#00a087');
  });

  $('.compose').on('click', function () {
    $('.new-tweet').slideToggle('slow');
    $('.new-tweet textarea').focus();
  })



});







