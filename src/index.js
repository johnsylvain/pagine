var Pagine = require('pagine');

require('./style.scss');

new Pagine({
  view: '#view',
  routes: [
    {
      path: '/',
      md: './markdown/home.md',
      layout: 'main'
    },
    {
      path: '/docs',
      md: './markdown/docs.md',
      layout: 'main'
    }
  ]
});

var app = {
  init: function() {
    window.addEventListener('hashchange', this.navigate.bind(this));
    window.addEventListener('load', this.navigate.bind(this));
  },

  navigate: function() {
    this.location = window.location.hash;
    
    var _this = this;
    var children = Array.from(document.getElementsByClassName('nav')[0].children[0].children);
    console.log(children)
    
    if (this.location === '') {
      return children[0].classList.add('nav__link--active');
    }

    children.forEach(function(node) {
      if (node.childNodes[0].getAttribute('href') === _this.location) {
        node.childNodes[0].classList.add('nav__link--active');
      } else {
        node.childNodes[0].classList.remove('nav__link--active');
      }
    })
  }
}

app.init();