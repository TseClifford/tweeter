// Fake data taken from initial-tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Append tweets to tweet-container from tweet array
const renderTweets = (tweetsArr) => {
  $.each(tweetsArr, (tweet) => {
    let newTweet = createTweetElement(tweetsArr[tweet]);
    $(".tweet-container").prepend(newTweet);
  });
};

// Create new article for each tweet
const createTweetElement = (tweet) => {
  const $tweet = $(`<article class='tweet'></article>`);

  $tweet.append(
    `
    <header class="tweet-header">
      <div><img src="${tweet.user.avatars}"> ${tweet.user.name}</div>
        <span>${tweet.user.handle}</span>
        </header>
        <div class="tweet-msg">
        <a>${escape(tweet.content.text)}</a>
        </div>
        <footer>
        <a>${timeago.format(tweet.created_at)}</a>
        <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
        </div>
      </footer>
      `
  );
  return $tweet;
};

// Get tweets then pass to renderTweets function
const loadTweets = () => {
  $.ajax("/tweets", { method: "GET" })
    .then((data) => renderTweets(data));
};

// Tweet submission and validation
const submitTweet = () => {
  $("form").on("submit", (event) => {
    event.preventDefault();
    $(".error").slideUp("slow", () => { });
    const tweetLength = $("#tweet-text").val().length;

    if (tweetLength === 0) {
      $("#no-text").slideDown("slow", () => { });

    } else if (tweetLength > 140) {
      $("#long-text").slideDown("slow", () => { });

    } else {
      $.ajax({ url: "/tweets", method: "POST", data: $("form").serialize() })
        .then(() => {
          $(".tweet-container").empty();
          $("#tweet-text").val('');
          loadTweets();
        });
    }
  });
};

$("button").hover(() => $(this).toggleClass("button:hover"));
$("article.tweet").hover(() => $(this).toggleClass("article.tweet:hover"));
submitTweet();

// Initial load when document ready
$(() => {
  loadTweets();
});
