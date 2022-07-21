/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// function to scroll to the top of the page.
const topFunction = function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// loads tweets on the page
const loadTweets = function() {
  $.get('/tweets', (body) => {
    renderTweets(body);
  })
  
};

// ensure no scripts can be sent to a tweet and cause mayhem
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


// constructor for each tweet.
const createTweetElement = function(tweet) {

  const tweetTemplate = `<section class="tweet">
  <div class="oppositeSides tweetTop">
    <div class="tweetNameIcon">
      <img src="${tweet.user.avatars}" alt="user">
      <p> &nbsp${tweet.user.name}</p>
    </div>
    <p> ${tweet.user.handle}</p>
  </div>
  <p class="tweetContent">
    ${escape(tweet.content.text)}
  </p>
  <div class="oppositeSides borderTop tweetBottom">
    <p>${timeago.format(tweet.created_at)}</p>
    <div class="tweetInteractsGroup">
      <i class="fa-solid fa-flag tweetInteract"></i>
      <i class="fa-solid fa-retweet tweetInteract"></i>
      <i class="fa-solid fa-heart tweetInteract"></i>
    </div>
  </div>
</section>`

return tweetTemplate;
};

// helper to send array of tweets to the constructor.
const renderTweets = function(tweets) {
  // render them all in chronological order
  tweets.reverse();
  for (let tweet of tweets) {
    $( "#tweets" ).append(createTweetElement(tweet));
  }
};


// draft tweet form
$(() => {
  $('#tweet-form').on('submit', (evt) => {
    evt.preventDefault();
    // error if tweet is empty.
    if (evt.target[0].value === '' || evt.target[0].value === null) {
      $('#errorMsg').text("  Tweet is empty! Add some words or something.  ");
      $("#panel").slideDown("slow", function() {
        $("#panel").delay(4000).slideUp(500);
      });
      // error if tweet too long
    } else if (evt.target[2].value < 0) {
      $('#errorMsg').text("  Too long. Please obey the arbitrary character limit.  ");
      $("#panel").slideDown("slow", function() {
        $("#panel").delay(4000).slideUp(500);
      });
      // otherwise post it to server
    } else {
      $.post('/tweets', ($('#tweet-form').serialize()), () => {
        evt.target[0].value = '';
        evt.target[2].value = '140';
        $.get('/tweets', (body) => {
          // make sure we also add it to the page so we can see it right away without reloading
          $( "#tweets" ).prepend(createTweetElement(body[body.length-1]));
        })
      });
    }
  })

  // makes the write a tweet button clickable to hide the draft form.
  $('#writeNewTwtBtn').on('click', (evt) => {
    $("#tweet-form").slideToggle("slow");
    $("#tweet-text").focus();
    topFunction();
  })
});

// LOAD EM
loadTweets();