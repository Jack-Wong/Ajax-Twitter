const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search");

$( () => {
  $('button.follow-toggle').each((idx, button) => new FollowToggle(button, {}));
  $('nav.users-search').each((idx, search) => new UsersSearch(search));
})
