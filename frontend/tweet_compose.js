class TweetCompose {
  constructor(el) {
    this.$el = $(el);
    this.$input = this.$el.find("textarea[name='tweet[content]']");

    this.$el.on("submit", this.submit.bind(this));
    this.$input.on("input", this.counter.bind(this))

    this.$addMentionedUser = this.$el.find("a.add-mentioned-user");
    this.$addMentionedUser.on("click", this.addMentionedUser.bind(this));

    this.$removeMention = this.$el.find(".mentioned-users");
    this.$removeMention.on("click", "a.remove-mentioned-user", this.removeMentionedUser.bind(this));
  };

  removeMentionedUser(event) {
    event.preventDefault();

    $(event.currentTarget).parent().remove();
  };

  addMentionedUser(event) {
    event.preventDefault();

    var $scriptTag = $(this.$el.find("script[type='text/template']")).html();
    this.$el.find(".mentioned-users").append($scriptTag);
  };

  submit(event) {
    event.preventDefault();

    // var data = this.$el.serializeJSON();
    $.ajax({
      method: "POST",
      url: "/tweets",
      dataType: "json",
      data: this.$el.serializeJSON(),
      success: this.handleSuccess.bind(this)
    });

    this.$el.find(":input").prop("disabled", true);
  };

  counter(event) {
    var length = this.$input[0].value.length;
    this.$el.find(".chars-left").text(140 - length + " Characters left")
  }

  clearInput() {
    this.$input[0].value = "";
    this.$el.find("a.remove-mentioned-user").value = "";
  }

  handleSuccess(tweet) {
    var $tweet_ul =  $(this.$el.data("tweets-ul"));
    var $li = $("<li></li>");
    var str_json = JSON.stringify(tweet);
    $li.append(str_json);
    $tweet_ul.append($li);

    this.clearInput();
  }
}

module.exports = TweetCompose;
