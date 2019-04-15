(() => {

	console.log("TRAA");

	var button = document.querySelector("#button");
	var burgerCon = document.querySelector("#burgerCon");

	function hamburgerMenu() {
		burgerCon.classList.toggle("slideToggle");
		button.classList.toggle("expanded");
	}

	function closeMenu() {

		if (window.matchMedia("(min-width: 1024px)").matches && burgerCon.classList.contains('slideToggle') ) {
		console.log("media query fired");
		burgerCon.classList.remove('slideToggle');
		button.classList.remove('expanded');
		}

	}

	button.addEventListener("click", hamburgerMenu, false);

	window.addEventListener("resize", closeMenu);



	var ImageSwiper = function(mobileImgs, minRange) {
		this.imgBox = mobileImgs
		this.mobileImgs = mobileImgs.children
		this.cur_img = 1 // set beginning Img
		this.ready_moved = true //var to judge the beginning
		this.imgs_count = this.mobileImgs.length
		this.touchX //first touching point
		this.minRange = Number(minRange)
		this.fadeIn //swipe style
		this.fadeOut
		this.bindTouchEvn() //swipe event
		this.showPic(this.cur_img) //display img
	}
	ImageSwiper.prototype.bindTouchEvn = function() {
	  this.imgBox.addEventListener('touchstart', this.touchstart.bind(this), false)
	  this.imgBox.addEventListener('touchmove', this.touchmove.bind(this), false)
	  this.imgBox.addEventListener('touchend', this.touchend.bind(this), false)
	       
	}
	ImageSwiper.prototype.touchstart = function(e) {
	  if (this.ready_moved) {
	    var touch = e.touches[0];
	    this.touchX = touch.pageX;
	    this.ready_moved = false;

	  }

	}

ImageSwiper.prototype.touchmove = function(e) {
  e.preventDefault();
  
  var minRange = this.minRange
  var touchX = this.touchX
  var imgs_count = this.imgs_count

  if (!this.ready_moved) {

    var release = e.changedTouches[0];
    var releasedAt = release.pageX;
    if (releasedAt + minRange < touchX) {
      this.ready_moved = true;
      if (this.cur_img > (imgs_count - 1)) {
        this.cur_img = 0;
      }
      this.cur_img++;
      this.showPic(this.cur_img);

    } else if (releasedAt - minRange > touchX) {
      if (this.cur_img <= 1) {
        this.cur_img = imgs_count + 1
      }
      this.cur_img--;
      this.showPic(this.cur_img);
      this.ready_moved = true;
      }
    }

  }

	ImageSwiper.prototype.touchend = function(e) {
	    e.preventDefault();
	    var minRange = this.minRange
	    var touchX = this.touchX
	    var imgs_count = this.imgs_count
	    if (!this.ready_moved) {
	      var release = e.changedTouches[0];
	      var releasedAt = release.pageX;
	      if (releasedAt + minRange < touchX) {
	        this.ready_moved = true;
	        if (this.cur_img > (imgs_count - 1)) {
	          this.cur_img = 0;
	        }
	        this.cur_img++;
	        showPic(this.cur_img);

	      } else if (releasedAt - minRange > touchX) {
	        if (this.cur_img <= 1) {
	          this.cur_img = imgs_count + 1
	        }
	        this.cur_img--;
	        showPic(this.cur_img);
	        this.ready_moved = true;
	      }
	    }

	  }
	  //opacity setting
	ImageSwiper.prototype.fadeIn = function(e) {
	  e.classList.add("fadeIn")
	}

	ImageSwiper.prototype.fadeOut = function(e) {
	  Array.prototype.forEach.call(e, function(e) {
	    e.className = "bg"
	  })
	}

	ImageSwiper.prototype.showPic = function(cur_img) {
	  this.hidePics(this.mobileImgs)
	    //get image index
	  var index = cur_img - 1

	  if (document.getElementsByClassName("active")[0]) {
	    var active = document.getElementsByClassName("active")[0];
	    active.classList.remove("active")
	  }
	  console.log(this.cur_img)
	  document.getElementById("dot_" + index).classList.add("active");

	  this.fadeIn(this.mobileImgs[index]);

	}
	ImageSwiper.prototype.hidePics = function(e) {
	    this.fadeOut(e)

	  }
	  //
	var mobileImgs = new ImageSwiper(document.getElementById('mobileImgs'), 30)

})();