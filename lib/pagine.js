var markdown = require('markdown').markdown;
var Navigo = require('navigo');
var Template = require('./templateEngine');

var Pagine = (function() {

  function Pagine(settings) {
    this.router = new Navigo(null, true);
    this.tmplEngine = new Template();
    this.converter = markdown;

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
    document.querySelector(`#${layout}`).innerHTML = this.tmplEngine.tmpl(layout, {
      content: this.compileMarkdown(md)
    })
  };

  Pagine.prototype.compileMarkdown = function(md) {
    return this.converter.toHTML(md);
  }

  return Pagine;

})();

module.exports = Pagine;
