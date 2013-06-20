;(function($, window, undefined) {


	var pName = "tickerSlider",
		document = window.document,
		defaults = {
			frames: 100,

			data: undefined
		};


	function TickerSlider(el, opts) {

		// elements
		this.el = el;
		this.$e = $(el);

        //options object
		this.opts = $.extend({}, defaults, opts) ;

	    this._defaults = defaults;
	    this._name = pName;

	    if (this.opts.data === undefined) {
	    	this.init();
	    } else {
	    	this.render();
	    	this.init();
	    }

	}


	TickerSlider.prototype.init = function() {

		var $ul		 	  = this.$e.find("ul"),
			$lis		  = $ul.find("li"),
			ul_width 	  = 0,
			li_width 	  = $lis.outerWidth(true),
			all_lis_width = li_width * $lis.length,
			i 			  = 0,
			loop 		  = undefined;


		$ul.css({
			width: all_lis_width,
			left: -(all_lis_width - this.$e.width())
		});

		ul_width = all_lis_width;

		loop = setInterval(function() {


			$ul[0].style.left = (-i++) + "px";

			if (i % li_width == 0) {
				ul_width = $ul.width();
				$ul[0].style.width = ul_width + li_width + "px";
				$ul[0].style.left = i-li_width + "px";
				i = i-li_width;
				
				var repeat = $ul.find("li:first-child");
				repeat.clone().appendTo($ul);
				$ul.find("li:nth-child(1)").remove();

			}

		}, 1000/this.opts.frames);

	}


	TickerSlider.prototype.render = function() {

		var data = this.opts.data,
			html = "<ul>";



		for (var i = 0; i < data.length; i++) {
			html += '<li class="litte"><img src="' + data[i] + '" alt=""></li>';
		}

		html += "</ul>";

		this.$e.append(html);
	}


	// Plugin wrapper to prevent double init
	$.fn[pName] = function (opts) {
    	return this.each(function () {
      		if (!$.data(this, 'plugin_' + pName)) {
        		$.data(this, 'plugin_' + pName, new TickerSlider(this, opts));
      		}
    	});
  	}

})(jQuery, window, undefined);