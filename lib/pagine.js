var markdown = require('markdown').markdown;
var Navigo = require('navigo');

var dom = require('./dom');
var Template = require('./templateEngine');

var Pagine = (function() {

  function Pagine(settings) {
    this.router = new Navigo(null, true);
    this.tmplEngine = new Template();
    this.markdown = markdown;

    this.view = settings.view || '#view';
    this.createRoutes(settings.routes);
  }

  Pagine.prototype.createRoutes = function(routes) {
    var mappedRoutes = routes.reduce((acc, cur) => {
      acc[cur.path] = function() {
        this.setContent(cur.layout, cur.md);
      }.bind(this)
      return acc;
    }, {});

    this.router.on(mappedRoutes).resolve();
  }

  Pagine.prototype.setContent = function(layout, md) {
    var compiledHTML = this.tmplEngine.tmpl(layout, {
      content: this.compileMarkdown(md)
    });

    return dom.renderView(this.view, compiledHTML)
  };

  Pagine.prototype.compileMarkdown = function(md) {
    return this.markdown.toHTML(md);
  }

  return Pagine;

})();

module.exports = Pagine;
