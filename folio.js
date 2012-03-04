(function($){
  function getcurrentView(parent, viewClass){
    return $(parent.find(viewClass+'.current'));
  }

  $.fn.folio = function(options){
    var parent = this;

    var settings = $.extend({
      viewClass: '.view',
      pageClass: '.page',
      parent: this
    }, options);

    this.views = parent.find(settings.viewClass).map(function(index, item){
      return $(item).view({parent: parent});
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
        item = item.view({parent: parent});

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
          parent.currentView = getcurrentView(parent, settings.viewClass).view({parent: parent});
          parent.currentView.initPages();
        }
      });
    };

    this.initViews();
    this.currentView = getcurrentView(parent, settings.viewClass).view({parent: parent});

    return this;
  };
})(jQuery);

(function($){
  function getcurrentPage(parent, pageClass){
    return $(parent.find(pageClass+'.current'));
  }

  $.fn.view = function(options){
    var self = this;

    var settings = $.extend({
      viewClass: '.view',
      pageClass: '.page',
      parent: this
    }, options);

    this.pages = self.find(settings.pageClass).map(function(index, item){
      return $(item).page({parent: self});
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
          self.currentPage = getcurrentPage(self, settings.pageClass).page({parent: self});
        }
      });
    };

    this.initPages = function(){
      this.pages = $(this.pages).map(function(index, item){
        item = item.page({parent: parent});

        item.css('left', settings.parent.width()*index);

        return item;
      });
      if(this.pages.length>0)
        this.pages[0].addClass('current');
    };

    this.initPages();
    this.currentPage = getcurrentPage(self, settings.pageClass).page({parent: self});

    return this;
  };

  $.fn.page = function(options){
    this.isCurrent = function(){
      return this.hasClass('current');
    };

    return this;
  }
})(jQuery);