class TweetCompose {
  constructor(el) {
    this.$el = $(el);

    this.$el.on("submit", this.submit.bind(this));
  };

  submit(event) {

  };
}

module.exports = TweetCompose;
