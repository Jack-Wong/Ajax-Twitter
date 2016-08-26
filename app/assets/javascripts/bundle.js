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
	
	  };
	}
	
	module.exports = TweetCompose;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map