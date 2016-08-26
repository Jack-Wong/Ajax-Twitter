const FollowToggle = require("./follow_toggle");

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = this.$el.find("input[name=username]");
    this.$ul = this.$el.find(".users");

    this.$input.on("input", this.handleInput.bind(this));
  };

  handleInput(event) {
    $.ajax({
      method: "GET",
      url: "/users/search",
      dataType: 'json',
      data: { query: this.$input.val() },
      success: this.renderResults.bind(this)
    })
  };

  renderResults(users) {
    this.$ul.empty();

    for(var i = 0; i < users.length; i++) {
      var user = users[i];

      var $li = $("<li></li>");

      var $a = ("<a href=/users/" + user.id + ">" + user.username + "</a>");

      var $button = $("<button></button>");
      new FollowToggle($button, {userId: user.id, followState: user.followed ? "followed" : "unfollowed"});

      $li.append($a);
      $li.append($button);

      this.$ul.append($li);
    }
  };
}

module.exports = UsersSearch;
