/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const topFunction = function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const loadTweets = function() {
  $.get('/tweets', (body) => {
    renderTweets(body);
  })
  
};

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


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

//$( "#tweets" ).append(tweetTemplate);

return tweetTemplate;
};

const renderTweets = function(tweets) {
  tweets.reverse();
  for (let tweet of tweets) {
    $( "#tweets" ).append(createTweetElement(tweet));
  }
};

$(() => {
  $('#tweet-form').on('submit', (evt) => {
    evt.preventDefault();
    if (evt.target[0].value === '' || evt.target[0].value === null) {
      $('#errorMsg').text("  Tweet is empty! Add some words or something.  ");
      $("#panel").slideDown("slow", function() {
        $("#panel").delay(4000).slideUp(500);
      });
    } else if (evt.target[2].value < 0) {
      $('#errorMsg').text("  Too long. Please obey the arbitrary character limit.  ");
      $("#panel").slideDown("slow", function() {
        $("#panel").delay(4000).slideUp(500);
      });
    } else {
      $.post('/tweets', ($('#tweet-form').serialize()), () => {
        evt.target[0].value = '';
        evt.target[2].value = '140';
        $.get('/tweets', (body) => {
          $( "#tweets" ).prepend(createTweetElement(body[body.length-1]));
        })
      });
    }
  })

  $('#writeNewTwtBtn').on('click', (evt) => {
    $("#tweet-form").slideToggle("slow");
    $("#tweet-text").focus();
    topFunction();
  })
});




loadTweets();














/*<section class="tweet">
          <div class="oppositeSides tweetTop">
            <div class="tweetNameIcon">
              <img src="https://i.imgur.com/nlhLi3I.png" alt="user">
              <p> &nbspAdam Harvey</p>
            </div>
            <p> @AdamHarvey</p>
          </div>
          <p class="tweetContent">
            testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
          </p>
          <div class="oppositeSides borderTop tweetBottom">
            <p>10 days ago</p>
            <div class="tweetInteractsGroup">
              <i class="fa-solid fa-flag tweetInteract"></i>
              <i class="fa-solid fa-retweet tweetInteract"></i>
              <i class="fa-solid fa-heart tweetInteract"></i>
            </div>
          </div>
        </section>
        */

