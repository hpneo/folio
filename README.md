Folio.js - Slide-based web app with jQuery
==========================================

Folio.js is a jQuery plugin that creates a stack of views and pages using your HTML stucture.

Usage
-----
    var folio = $('#slide_wrapper').folio(options);

`options` is a hash of settings:

* viewClass: class name used to define views, `.view` by default.
* pageClass:  class name used to define pages, `.page` by default.
* afterSlideView: callback that will fire after slide to another view.
* afterSlidePage: callback that will fire after slide to another page.

`folio` will return `$('#slide_wrapper')` with some extra methods, like:

* addView
* removeView
* slideTo

Also, `currentView` attribute returns the current view in the whole site. `currentView` has these methods:

* addPage
* removePage
* isCurrent
* slideTo

And `currentPage`, which returns the current page in this view.