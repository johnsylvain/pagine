var markdown = require('markdown').markdown;
var Navigo = require('navigo');
var axios = require('axios');

var dom = require('./dom');
var Template = require('./templateEngine');

/**
 * Pagine class
 * @class
 */
var Pagine = (function() {

  /**
   * Initializes a new instance of Pagine
   * @constructs Pagine
   * @param {object} settings Object of settions (i.e. routes, view)
   */
  function Pagine(settings) {
    this.router = new Navigo(null, true);
    this.tmplEngine = new Template();
    this.markdown = markdown;

    this.markdownCache = {};

    this.view = settings.view || '#view';
    this.createRoutes(settings.routes);
  }

  /**
   * Sets up routes for Navigo
   * @name Pagine#createRoutes
   * @param  {array} routes array of route paths and associated markdown
   */
  Pagine.prototype.createRoutes = function(routes) {
    var mappedRoutes = routes.reduce((acc, cur) => {
      acc[cur.path] = function() {
        this.setContent(cur.layout, cur.md);
      }.bind(this)
      return acc;
    }, {});

    this.router.on(mappedRoutes).resolve();
  }

  /**
   * Retrieves markdown file content from given URL
   * @name Pagine#fetchMarkdownFile
   * @param  {string} url
   * @returns {string} Markdown file contents
   */
  Pagine.prototype.fetchMarkdownFile = function(url) {
    if (this.markdownCache[url])
      return Promise.resolve(this.markdownCache[url]);

    var _this = this;

    return new Promise(function(resolve, reject) {
      return axios.get(url)
        .then(function(respose) {
          _this.markdownCache[url] = respose;
          resolve(respose);
        })
        .catch(function(err) {
          console.log(err)
          reject(err);
        })
    })
  }

  /**
   * Renders content (HTML) into target element
   * @name Pagine#setContent
   * @param   {string} layout Layout selector
   * @param   {string} md Markdown to be rendered into layout
   * @returns {string}
   */
  Pagine.prototype.setContent = function(layout, mdURL) {
    var _this = this;

    return new Promise(function(resolve, reject) {
      _this.fetchMarkdownFile(mdURL)
        .then(function(md) {
          var compiledHTML = _this.tmplEngine.tmpl(layout, {
            content: _this.compileMarkdown(md)
          });

          var html = dom.renderView(_this.view, compiledHTML);
          resolve(html);
        })
        .catch(function(err) {
          reject(Error(err));
        })
    })
  };

  /**
   * Transforms markdown into HTML
   * @name Pagine#compileMarkdown
   * @param  {string} md Markdown to be compiled
   * @returns {string} Compiled HTML
   */
  Pagine.prototype.compileMarkdown = function(md) {
    return this.markdown.toHTML(md);
  }

  return Pagine;

})();

module.exports = Pagine;
