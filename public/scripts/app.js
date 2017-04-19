/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from tweets.json
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


$(document).ready(function() {


  function getDate(timeStamp) {
    let date = new Date(timeStamp);
    let dateAsString = JSON.stringify(date);
    return `${date.getFullYear()} ${date.getMonth() + 1}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;

  }

  function createTweetElement(tweet) {
    console.log("hi");
    let $avatar = $('<img/>', { src: tweet.user.avatars.regular }).addClass("avatar");
    let $name = $('<h4></h4>', { text: tweet.user.name }).addClass("name");
    let $handle = $('<span></span>', { text: tweet.user.handle }).addClass("handle");
    let $p = $('<p></p>', { text: tweet.content.text }).addClass("text-body");
    // console.log("$date: ", $date, " Type of $date: ", typeof $date);
    let $time = $('<span></span>', { text: getDate(tweet.created_at) }).addClass("time");
    let $heart = $('<i/>').addClass("fa fa-heart rightmost").addClass("heart");
    let $retweet = $('<i/>').addClass("fa fa-retweet").addClass("retweet");
    let $flag = $('<i/>').addClass("fa fa-flag").addClass("flag");
    let $header = $('<header></header>').addClass('header');
    let $article = $('<article></article>').addClass('article');
    let $footer = $('<footer></footer>').addClass('footer');

    // let $header = $('.tweet header').append($avatar, $name, $handle);
    // let $article = $('.tweet article').append($p);
    // let $footer = $('.tweet footer').append($time, $heart, $retweet, $flag);
    let $tweet = $('<section/>').addClass("tweet");
    $header.append($avatar, $name, $handle);
    $article.append($p);
    $footer.append($time, $heart, $retweet, $flag);

    $tweet.append($header, $article, $footer);
    return $tweet;
  }

  function renderTweets(tweets) {
    for (let i = 0; i < tweets.length; i++) {
      let tweetElement = createTweetElement(tweets[i]);
      $(".container").append(tweetElement);
    }
  }

  renderTweets(data);

  $('.tweet').hover(function() {
    $(this).find('footer i').css('opacity', '1');
  }, function () {
    $(this).find('footer i').css('opacity', '0.6');
  });
});







