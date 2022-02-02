// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = (tweetsArr) => {
  $(() => {
    $.each(tweetsArr, (tweet) => {
      $(".tweet-container").append(createTweetElement(tweetsArr[tweet]))
    })
  })
}

const createTweetElement = (tweet) => {
  const $tweet = $(`<article class='tweet'></article>`);

  $tweet.append(
    `
    <header class="tweet-header">
      <div><img src="${tweet.user.avatars}"> ${tweet.user.name}</div>
        <span>${tweet.user.handle}</span>
        </header>
        <div class="tweet-msg">
        <a>${tweet.content.text}</a>
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
  )
  return $tweet
}

renderTweets(data);