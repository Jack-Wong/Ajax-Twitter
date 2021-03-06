const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search");
const TweetCompose = require("./tweet_compose");
const InfiniteTweets = require("./infinite_tweets.js");

$( () => {
  $('button.follow-toggle').each((idx, button) => new FollowToggle(button, {}));
  $('nav.users-search').each((idx, search) => new UsersSearch(search));
  $('form.tweet-compose').each((idx, tweet) => new TweetCompose(tweet));
  $('div.infinite-tweets').each((idx, tweet) => new InfiniteTweets(tweet));
})
