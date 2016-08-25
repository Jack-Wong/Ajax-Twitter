class FollowToggle {
  constructor(options, el) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id") || options.userId;
    this.followState = this.$el.data("initial-follow-state") ||
      options.followState;

    this.render();
  };


}

module.exports = FollowToggle;
