/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from tweets.json

$(document).ready(function() {

  // hide "compose tweet" box upon page load
  $('.new-tweet').slideUp('fast');

  // get date for tweet's time stamp
  function getDate(timeStamp) {
    let date = new Date(timeStamp);
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return `${date.getFullYear()} ${date.getMonth() + 1}/${date.getDate()}  ${date.getHours()}:${minutes}`;
  }

  //generate DOM for posted tweets and new tweets upon post
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

  //render tweets into "posted tweets" container
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

  //create new tweets upon submission
  $('.new-tweet form').on('submit', function(e) {
    e.preventDefault();
    const $textLength = $(this).find('textarea').val().length;
    console.log($textLength);
    // validate tweets for correct length
    if ($textLength < 1 || $textLength > 140) {
      $('#invalid').css('visibility', 'visible');
    } else {
      $('#invalid').css('visibility', 'hidden');
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

  // increase opacity tweet box icons upon hover
  $('#posted-tweet-container').hover(function() {
    $(this).find('footer i').css('opacity', '1');
  }, function () {
    $(this).find('footer i').css('opacity', '0.6');
  });


  // change color of "compose" button upon hover
  $('.compose').hover(function() {
    $(this).css('background-color', 'white');
    $(this).css('color', 'black');
  }, function () {
    $(this).css('background-color', 'lightcyan');
    $(this).css('color', '#00a087');
  });

  // slide "new tweet" box down when "compose" button is clicked
  $('.compose').on('click', function () {
    $('.new-tweet').slideToggle(200);
    $('.new-tweet textarea').focus();
  });

});







