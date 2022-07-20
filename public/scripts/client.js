/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const loadTweets = function() {
  $.get('/tweets', (body) => {
    renderTweets(body);
  })
  
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
    ${tweet.content.text}
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
      alert("You can't send a blank tweet!");
    } else if (evt.target[2].value < 0) {
      alert("Too many characters in tweet!");
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

