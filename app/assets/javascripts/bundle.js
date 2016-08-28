/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const FollowToggle = __webpack_require__(1);
	const UsersSearch = __webpack_require__(2);
	const TweetCompose = __webpack_require__(3);
	
	$( () => {
	  $('button.follow-toggle').each((idx, button) => new FollowToggle(button, {}));
	  $('nav.users-search').each((idx, search) => new UsersSearch(search));
	  $('form.tweet-compose').each((idx, tweet) => new TweetCompose(tweet));
	})


/***/ },
/* 1 */
/***/ function(module, exports) {

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
	          this.render;
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
	          this.render;
	        }
	      });
	    }
	  }
	}
	
	module.exports = FollowToggle;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const FollowToggle = __webpack_require__(1);
	
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


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map