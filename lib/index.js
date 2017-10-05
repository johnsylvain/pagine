var markdown = require('markdown').markdown;
var Navigo = require('navigo');
var template = require('lodash/template');

var Pagine = (function() {

  function Pagine(settings) {
    this.router = new Navigo(null, true);
    this.template = template(document.body.textContent.trim());
    this.converter = markdown;

    this.createRoutes(settings.routes);
  }

  Pagine.prototype.createRoutes = function(routes) {
    this.router.on(routes.reduce((cur, acc) => {
      return Object.assign({}, acc, {
        [cur.path]: function() {
          this.setContent(cur.md);
        }.bind(this)
      })
    }, {})).resolve()
  }

  Pagine.prototype.setContent = function(md) {
    this.template({
      content: this.compileMarkdown(md)
    })
  };

  Pagine.prototype.compileMarkdown = function(md) {
    return this.converter.toHTML(md);
  }

  return Pagine;

})();

module.exports = Pagine;
