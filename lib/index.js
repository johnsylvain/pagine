var markdown = require('markdown').markdown;
var Navigo = require('navigo');
var template = require('lodash/template');

function Pagine(settings) {
  this.router = new Navigo(null, true);
  this.template = template(document.body.textContent.trim());
  this.converter = markdown;

  this.createRoutes(settings.routes);
}

Pagine.prototype.createRoutes = function(routes) {
  this.router.on(routes.reduce((cur, acc) => {
    return Object.assign({}, acc, {
      [cur.path]:  () => {
        this.setContent(cur.md);
      }
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

module.exports = Pagine;
