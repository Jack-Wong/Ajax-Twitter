class InfiniteTweets {
  constructor(el) {
    this.$el = $(el);
    this.maxCreatedAt = null;

    this.$el.on("click", this.fetchTweets.bind(this));
  };

  fetchTweets(event) {
    event.preventDefault();

    var infiniteTweets = this;

    var data1 = null
    this.maxCreatedAt = (new Date()).toDateString();
    if(this.maxCreatedAt != null) {
      data1 = {max_created_at: this.maxCreatedAt};
    }

    $.ajax({
      method: "GET",
      url: "/feed",
      dataType: "json",
      data: data1,
      success(data){
        infiniteTweets.insertTweets(data);

        if(data.length < 20) {
          infiniteTweets.$el.find(".fetch-more").replaceWith("No more tweets!");
          infiniteTweets.$el.off("click");
        }
        if(data.length > 0) {
          infiniteTweets.maxCreatedAt = data[data.length - 1].created_at;
        }
      }
    });
  };

  insertTweets(data) {
    const $j = $('<li>' + JSON.stringify(data) + '</li>');

    this.$el.find("ul[id='feed']").append($j);
  }
}

module.exports = InfiniteTweets;
