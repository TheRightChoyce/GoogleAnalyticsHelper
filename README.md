GoogleAnalyticsHelper
=====================

A jQuery plugin/helper for tracking events in google analytics (Can also works as a stand-alone script). 

Basic usage:

`$('#foo').ga('trackClick', { action: 'bar' });`

This will result in an event of category 'Click' with an action of 'bar'. You can also provide a custom
label.

To track an outgoing link:

`$('#foo').ga('trackClickOutgoing');`

This will automatically use the href attribute as the action and will ignore any links that are deemed to be relative.
If you want to manually supply the action, simply do:

`$('#foo').ga('trackClickOutgoing', { action: 'bar' });`


This will result in an event of category 'Outgoing Link' with an action of 'http://somesite.com' (or 'bar', 
if that's what you provided)

Then, to track a scrollbox usage, or element focus:

`$('#foo').ga('trackScrollOrFocus ', { action: 'bar' });`

This will result in an event of category 'ScrollOrFocus' with an action of 'bar'.

The categories are all customizable via passing them in via the options param, IE:

`$('#foo').ga('trackClick', { action: 'bar' }, { category: 'Clickbar'} );`

