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
	
	$( () => {
	  $('button.follow-toggle').each((idx, button) => new FollowToggle(button, {}));
	  $('nav.users-search').each((idx, search) => new UsersSearch(search));
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
	        url: "./users/${this.userId}/follow",
	        dataType: '$.ajax',
	        success() {
	          FollowToggle.followState = "followed"   ;
	          FollowToggle.render();
	        }
	      })
	    }else if (this.followState === "followed") {
	      this.followState = "unfollowing";
	      this.render();
	      $.ajax({
	        type: "DELETE",
	        url: "./users/${this.userId}/follow",
	        dataType: '$.ajax',
	        success() {
	          FollowToggle.followState = "unfollowed"   ;
	          FollowToggle.render();
	        }
	      })
	    }
	  }
	}
	
	module.exports = FollowToggle;


/***/ },
/* 2 */
/***/ function(module, exports) {



/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map