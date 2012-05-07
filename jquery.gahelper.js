//
// @param elements -- DOM elements to affect
// @param method -- method name to call
// @param args -- an functional arguments
// @param options -- any additional options to use in place of the defaults 
//
var GoogleAnalyticsHelper = function( elements, method, args, options )
{
	this.elements = elements;
	this.options = jQuery.extend( this.defaults, options );
	this.method = method;
	this.attach(args);

}; GoogleAnalyticsHelper.prototype = {
	
	defaults: {
		clickEventType : 'mousedown'
		, clickCategory : 'Click'
		, outgoingClickCategory : 'Outgoing Link'
		, scrollFocusCategory : 'Scroll/Focus'
	},
	
	
	attach: function( args ) {
		
		//
		// attachs the provided method $(this) element
		//
		
		if( this.method )
		{
			if( this[this.method] ) 
				this[this.method](args);
			else if( console )
				console.log( ' GoogleAnalyticsHelper: method "' + this.method + '" not found.');
		}
	},
	
	trackEvent: function( element, args ) {
		
		//
		// Generic function for tracking any event
		// This while also handle a callback, but that callback happens after the BINDING, not after the event
		//
		
		if( !args.category ) args.category = this.options.category;
		if( !args.label ) args.label = '';
		if( !args.value ) args.value = '';
		
		$(element).bind(args.eventType, function(){ 
			_gaq.push(['_trackEvent', args.category, args.action, args.label]); 
		});
		
		if( $.isFunction(args.callback) ) // handle any callback
			args.callback();
		return this;
	},
	
	//
	// Tracks the click event on an element
	trackClick: function( args ) 
	{
		args = $.extend( args, { 
			category: this.options.clickCategory
			, eventType: this.options.clickEventType
		});
		
		var self = this;	
		this.elements.each( function(index, element){
			self.trackEvent( element, args );
		});
		
		return this;
	},
	
	//
	// Tracks an outgoing link -- args can be null if needed
	trackClickOutgoing: function( args ) 
	{
		var self = this;
		args = $.extend( args, {
			category: this.options.outgoingClickCategory
			, eventType: this.options.clickEventType
		});
		
		this.elements.each( function(index, element){
			
			var href = $(element).attr('href');
			if( href.indexOf( 'http' ) > -1  ) // ghetto check to ensure its not a relative link
				self.trackEvent( element, $.extend( args, { action: href } ) );
			
		});
		return this;
	},

	// Tracks an scroll event on a textbox, css fancybox, etc..
	trackScrollOrFocus: function( args ) 
	{
		args = $.extend( args, { 
			category: this.options.scrollFocusCategory
			, eventType: this.options.clickEventType

		});
		
		var self = this;	
		this.elements.each( function(index, element){
			self.trackEvent( element, args );
		});		
		return this;
	}	
};


//
// jQuery Wrapper
//

(function($) {
	$.fn.ga = function(method, args, options) {
		new GoogleAnalyticsHelper(this, method, args, options);
		return this;
	};
})(jQuery);

