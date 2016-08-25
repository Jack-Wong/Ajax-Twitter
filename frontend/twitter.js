const FollowToggle = require("./follow_toggle.js");

$( () => {
  $("button.follow-toggle").each((idx, button) => new FollowToggle(button, {}));
})
