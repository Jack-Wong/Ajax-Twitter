class FollowToggle {
  constructor(el, options) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id") || options.userId;
    this.followState = this.$el.data("initial-follow-state") ||
      options.followState;

    this.render();
    this.$el.on("click", this.handleClick.bind(this));
  };

  render() {
    if(this.followState === "unfollowed") {
      this.$el.html("Follow!");
      this.$el.prop('disabled', false);
    } else if(this.followState === "followed") {
      this.$el.html("Unfollow!");
      this.$el.prop('disabled', false);
    } else if (this.followState === "following") {
      this.$el.html("Following");
      this.$el.prop('disabled', true);
    } else if (this.followState === "unfollowing") {
      this.$el.html("Unfollowing");
      this.$el.prop('disabled', true);
    }
  }

  handleClick(event) {
    event.preventDefault();

    if(this.followState === "unfollowed") {
      this.followState = "following";
      this.render();
      $.ajax({
        type: "POST",
        url: this.userId + "/follow",
        dataType: 'json',
        success() {
          this.followState = "followed"   ;
          this.render();
        }
      });
    } else if (this.followState === "followed") {
      this.followState = "unfollowing";
      this.render();
      $.ajax({
        type: "DELETE",
        url: this.userId + "/follow",
        dataType: 'json',
        success() {
          this.followState = "unfollowed"   ;
          this.render();
        }
      });
    }
  }
}

module.exports = FollowToggle;
