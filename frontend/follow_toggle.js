class FollowToggle {
  constructor(options, el) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id") || options.userId;
    this.followState = this.$el.data("initial-follow-state") ||
      options.followState;

    this.render();
  };

  render() {
    if(this.followState === "unfollowed") {
      this.$el.html("Follow!");
    } else if(this.followState === "followed") {
      this.$el.html("Unfollow!");
    }
  }
}

module.exports = FollowToggle;
