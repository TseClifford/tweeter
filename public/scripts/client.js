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

    if (!tweetLength) {
      $("#no-text").slideDown("slow", () => { }).delay(3000).slideUp('slow');

    } else if (tweetLength > 140) {
      $("#long-text").slideDown("slow", () => { }).delay(3000).slideUp('slow');

    } else {
      $.ajax({ url: "/tweets", method: "POST", data: $("form").serialize() })
        .then(() => {
          $(".tweet-container").empty();
          $("#tweet-text").val('');
          $(".counter").val('140');
          loadTweets();
        });
    }
  });
};

// Stretch: Toggle new-tweet div with navbar click
const toggleNewTweet = () => {
  $(".interactive-msg").on("click", () => {
    $(".new-tweet").slideToggle();
    $("#tweet-text").val("");
    $("#tweet-text").focus();
  });
};

// Hovering over element to toggle class changes
$(".fa-angles-down").hover(() => $(this).toggleClass(".fa-angles-down:hover"));
$("button").hover(() => $(this).toggleClass("button:hover"));
$("article.tweet").hover(() => $(this).toggleClass("article.tweet:hover"));

// Initial load when document ready
$(() => {
  loadTweets();
  submitTweet();
  toggleNewTweet();
});
