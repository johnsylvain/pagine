var snarkdown = require('snarkdown');
var axios = require('axios');
var Promise = require('promise-polyfill');

var Router = require('./router');
var TemplateEngine = require('./templateEngine');

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
    this.router = new Router('#');
    this.tmplEngine = new TemplateEngine();
    this.markdown = snarkdown;

    this.markdownCache = {};

    if (!window.Promise) {
      window.Promise = Promise;
    }

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

    this.router.on(mappedRoutes);
  }

  /**
   * Retrieves markdown file content from given URL
   * @name Pagine#fetchMarkdownFile
   * @param  {string} url
   * @returns {string} Markdown file contents
   */
  Pagine.prototype.fetchMarkdownFile = function(url) {
    if (this.markdownCache[url]) {
      return Promise.resolve(this.markdownCache[url]);
    }

    var _this = this;

    return new Promise(function(resolve, reject) {
      return axios.get(url)
        .then(function(response) {
          _this.markdownCache[url] = response.data;
          resolve(response.data);
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
          var compiledHTML = _this.compileMarkdown(md);

          var template = _this.tmplEngine.tmpl(layout, {
            content: compiledHTML
          });

          document.querySelectorAll(_this.view)[0].innerHTML = template;

          resolve(template);
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
    return this.markdown(md);
  }

  return Pagine;

})();

module.exports = Pagine;
