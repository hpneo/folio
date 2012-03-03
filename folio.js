Folio = function(options){
  this.options = options;

  Folio.body = $('body');

  var self = this;

  this.views = Folio.body.find('.view').map(function(index, item){ return $(item); });

  this.addView = function(view, args){
    Folio.body.append(view);
    self.views.push(view);
  };
  this.removeView = function(view){
    view.remove();
    self.views.splice(self.views.indexOf(view), 1);
  };

  this.currentView = new Folio.View({
    node: Folio.body.find('.view.current')
  });

  this.initViews = function(){
    $(self.views).each(function(index, item){
      item.css('top', Folio.body.height()*index);
    });
  }

  this.slideTo = function(selector){
    body = Folio.body;

    currentView = self.currentView.node;
    switch(typeof(selector)){
      case 'number':
        nextView = self.views[selector];
      break;
      case 'string':
        nextView = body.find(selector);
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
      current_top = '-'+body.height();
      next_top = '+'+body.height();
    }
    else if(current_index > next_index){
      current_top = '+'+body.height();
      next_top = '-'+body.height();
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
        self.currentView = new Folio.View({
          node: Folio.body.find('.view.current')
        });
        self.currentView.initPages();
      }
    });
  };

  this.initViews();
  this.currentView.initPages();
};

Folio.View = function(options){
  this.options = options;
  this.node = options.node;

  var self = this;

  this.pages = self.options.node.find('.page').map(function(index, item){ return $(item); });

  this.addPage = function(page, args){
    self.options.node.append(page);
    self.pages.push(page);
  };
  this.removePage = function(page){
    page.remove();
    self.pages.splice(self.pages.indexOf(page), 1);
  };

  this.isCurrent = function(){
    return self.options.node.hasClass('current');
  };

  this.currentPage = new Folio.Page({
    node: self.options.node.find('.page.current')
  });

  this.slideTo = function(selector){
    body = Folio.body;

    currentPage = self.currentPage.node;
    switch(typeof(selector)){
      case 'number':
        nextPage = self.pages[selector];
      break;
      case 'string':
        nextPage = self.options.node.find(selector);
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
        self.currentPage = new Folio.Page({
          node: self.options.node.find('.page.current')
        });
      }
    });
  };

  this.initPages = function(){
    $(self.pages).each(function(index, item){
      item.css('left', Folio.body.width()*index);
    });
    $(self.pages)[0].addClass('current');
  };
};

Folio.Page = function(options){
  this.options = options;
  this.node = options.node;

  var self = this;

  this.isCurrent = function(){
    return self.options.node.hasClass('current');
  };
};