(function($){
  function getcurrentView(parent, viewClass){
    return parent.find(viewClass+'.current');
  }

  $.fn.folio = function(options){
    var parent = this;

    var settings = $.extend({
      viewClass: '.view',
      pageClass: '.page',
      parent: this,
      afterSlideView: function(){},
      afterSlidePage: function(){}
    }, options);

    this.views = parent.find(settings.viewClass).map(function(index, item){
      return $(item).view($.extend(settings, {parent: parent}));
    });

    this.addView = function(view, args){
      this.append(view);
      this.views.push(view);
    };
    this.removeView = function(view){
      view.remove();
      this.views.splice(this.views.indexOf(view), 1);
    };

    this.initViews = function(){
      this.views = $(this.views).map(function(index, item){
        item = item.view($.extend(settings, {parent: parent}));

        item.css('top', parent.height()*index);

        return item;
      });
      if(this.views.length>0)
        this.views[0].addClass('current');
    };

    this.slideTo = function(selector){
      parent = parent;

      currentView = this.currentView;
      switch(typeof(selector)){
        case 'number':
          nextView = parent.views[selector];
        break;
        case 'string':
          nextView = parent.find(selector);
        break;
        default:
          nextView = selector;
        break;
      }
      nextView = $(nextView);

      current_index = currentView.index();
      next_index = nextView.index();

      current_top = 0;
      next_top = 0;

      if(current_index < next_index){
        current_top = '-'+parent.height();
        next_top = '+'+parent.height();
      }
      else if(current_index > next_index){
        current_top = '+'+parent.height();
        next_top = '-'+parent.height();
      }

      current_top += 'px';
      next_top += 'px';

      currentView.css('top', '0px');
      nextView.css('top', next_top);

      currentView.animate({
        'top': current_top
      }, {
        duration: 700,
        easing: 'swing'
      });

      nextView.animate({
        'top': '0px'
      }, {
        duration: 700,
        easing: 'swing',
        complete: function(){
          nextView.addClass('current');
          currentView.removeClass('current');
          parent.currentView = getcurrentView(parent, settings.viewClass).view($.extend(settings, {parent: parent}));
          parent.currentView.initPages();

          e = {};
          e.currentView = $(parent.currentView);
          e.currentIndex = e.currentView.index();

          settings.afterSlideView.apply(this, [e]);
        }
      });
    };

    this.initViews();
    this.currentView = getcurrentView(parent, settings.viewClass).view($.extend(settings, {parent: parent}));

    return this;
  };
})(jQuery);

(function($){
  function getcurrentPage(parent, pageClass){
    return parent.find(pageClass+'.current');
  }

  $.fn.view = function(options){
    var self = this;

    var settings = $.extend({
      viewClass: '.view',
      pageClass: '.page',
      parent: this
    }, options);

    this.pages = self.find(settings.pageClass).map(function(index, item){
      return $(item).page($.extend(settings, {parent: self}));
    });

    this.addPage = function(page, args){
      this.append(page);
      this.pages.push(page);
    };
    this.removePage = function(page){
      page.remove();
      this.pages.splice(this.pages.indexOf(page), 1);
    };

    this.isCurrent = function(){
      return this.hasClass('current');
    };

    this.slideTo = function(selector){
      body = settings.parent;

      currentPage = self.currentPage;
      switch(typeof(selector)){
        case 'number':
          nextPage = self.pages[selector];
        break;
        case 'string':
          nextPage = self.find(selector);
        break;
        default:
          nextPage = selector;
        break;
      }
      nextPage = $(nextPage);

      current_index = currentPage.index();
      next_index = nextPage.index();

      current_left = 0;
      next_left = 0;

      if(current_index < next_index){
        current_left = '-'+body.width();
        next_left = '+'+body.width();
      }
      else if(current_index > next_index){
        current_left = '+'+body.width();
        next_left = '-'+body.width();
      }

      current_left += 'px';
      next_left += 'px';

      currentPage.css('left', '0px');
      nextPage.css('left', next_left);

      currentPage.animate({
        'left': current_left
      }, {
        duration: 700,
        easing: 'swing'
      });

      nextPage.animate({
        'left': '0px'
      }, {
        duration: 700,
        easing: 'swing',
        complete: function(){
          nextPage.addClass('current');
          currentPage.removeClass('current');
          self.currentPage = getcurrentPage(self, settings.pageClass).page($.extend(settings, {parent: self}));

          e = {};
          e.currentPage = $(self.currentPage);
          e.currentIndex = e.currentPage.index();
          settings.afterSlidePage.apply(this, [e]);
        }
      });
    };

    this.initPages = function(){
      this.pages = $(this.pages).map(function(index, item){
        item = item.page($.extend(settings, {parent: self}));

        item.css('left', settings.parent.width()*index);

        return item;
      });
      if(this.pages.length>0)
        this.pages[0].addClass('current');
    };

    this.initPages();
    this.currentPage = getcurrentPage(self, settings.pageClass).page($.extend(settings, {parent: self}));

    return this;
  };

  $.fn.page = function(options){
    this.isCurrent = function(){
      return this.hasClass('current');
    };

    return this;
  }
})(jQuery);

$.extend($.easing,
{
  def: 'easeOutQuad',
  swing: function (x, t, b, c, d) {
      //alert($.easing.default);
      return $.easing[$.easing.def](x, t, b, c, d);
  },
  easeInQuad: function (x, t, b, c, d) {
      return c*(t/=d)*t + b;
  },
  easeOutQuad: function (x, t, b, c, d) {
      return -c *(t/=d)*(t-2) + b;
  },
  easeInOutQuad: function (x, t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t + b;
      return -c/2 * ((--t)*(t-2) - 1) + b;
  },
  easeInCubic: function (x, t, b, c, d) {
      return c*(t/=d)*t*t + b;
  },
  easeOutCubic: function (x, t, b, c, d) {
      return c*((t=t/d-1)*t*t + 1) + b;
  },
  easeInOutCubic: function (x, t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t + b;
      return c/2*((t-=2)*t*t + 2) + b;
  },
  easeInQuart: function (x, t, b, c, d) {
      return c*(t/=d)*t*t*t + b;
  },
  easeOutQuart: function (x, t, b, c, d) {
      return -c * ((t=t/d-1)*t*t*t - 1) + b;
  },
  easeInOutQuart: function (x, t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
      return -c/2 * ((t-=2)*t*t*t - 2) + b;
  },
  easeInQuint: function (x, t, b, c, d) {
      return c*(t/=d)*t*t*t*t + b;
  },
  easeOutQuint: function (x, t, b, c, d) {
      return c*((t=t/d-1)*t*t*t*t + 1) + b;
  },
  easeInOutQuint: function (x, t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
      return c/2*((t-=2)*t*t*t*t + 2) + b;
  },
  easeInSine: function (x, t, b, c, d) {
      return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  },
  easeOutSine: function (x, t, b, c, d) {
      return c * Math.sin(t/d * (Math.PI/2)) + b;
  },
  easeInOutSine: function (x, t, b, c, d) {
      return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  },
  easeInExpo: function (x, t, b, c, d) {
      return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  },
  easeOutExpo: function (x, t, b, c, d) {
      return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  },
  easeInOutExpo: function (x, t, b, c, d) {
      if (t==0) return b;
      if (t==d) return b+c;
      if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
      return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: function (x, t, b, c, d) {
      return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
  },
  easeOutCirc: function (x, t, b, c, d) {
      return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
  },
  easeInOutCirc: function (x, t, b, c, d) {
      if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
      return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
  },
  easeInElastic: function (x, t, b, c, d) {
      var s=1.70158;var p=0;var a=c;
      if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
      if (a < Math.abs(c)) { a=c; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (c/a);
      return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  },
  easeOutElastic: function (x, t, b, c, d) {
      var s=1.70158;var p=0;var a=c;
      if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
      if (a < Math.abs(c)) { a=c; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (c/a);
      return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
  },
  easeInOutElastic: function (x, t, b, c, d) {
      var s=1.70158;var p=0;var a=c;
      if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
      if (a < Math.abs(c)) { a=c; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (c/a);
      if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
      return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
  },
  easeInBack: function (x, t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c*(t/=d)*t*((s+1)*t - s) + b;
  },
  easeOutBack: function (x, t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
  },
  easeInOutBack: function (x, t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
      return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  },
  easeInBounce: function (x, t, b, c, d) {
      return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
  },
  easeOutBounce: function (x, t, b, c, d) {
      if ((t/=d) < (1/2.75)) {
          return c*(7.5625*t*t) + b;
      } else if (t < (2/2.75)) {
          return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
      } else if (t < (2.5/2.75)) {
          return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
      } else {
          return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
      }
  },
  easeInOutBounce: function (x, t, b, c, d) {
      if (t < d/2) return $.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
      return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
  }
});