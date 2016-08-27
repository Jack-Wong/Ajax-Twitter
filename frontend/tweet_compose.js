class TweetCompose {
  constructor(el) {
    this.$el = $(el);
    this.$input = this.$el.find("textarea[name='tweet[content]']")

    this.$el.on("submit", this.submit.bind(this));
    this.$input.on("input", this.counter.bind(this))
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
    this.$el.find("select")[0].value = "";
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
