Folio.js - Slide-based web app with jQuery
==========================================

Folio.js is a jQuery plugin that creates a stack of views and pages using your HTML stucture.

Usage
-----
    var folio = $('#slide_wrapper').folio();

`folio` will return $('#slide_wrapper') with some extra methods, like:
* addView
* removeView
* slideTo

Also, `currentView` attribute returns the current view in the whole site. `currentView` has these methods:
* addPage
* removePage
* isCurrent
* slideTo

And `currentPage`, which returns the current page in this view.