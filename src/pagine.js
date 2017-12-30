var snarkdown = require('snarkdown')
var unfetch = require('unfetch')

var Router = require('./router')
var TemplateEngine = require('./templateEngine')

/**
 * Pagine class
 * @class
 */
var Pagine = (function () {

  /**
   * Initializes a new instance of Pagine
   * @constructs Pagine
   * @param {object} settings Object of settings (i.e. routes, view)
   */
  function Pagine(settings) {
    this.router = new Router('#')
    this.tmplEngine = new TemplateEngine()
    this.markdown = snarkdown.default || snarkdown
    this.fetch = unfetch.default || unfetch

    this.markdownCache = {}

    this.view = settings.view || '#view'
    this.createRoutes(settings.routes)
  }

  /**
   * Sets up routes
   * @name Pagine#createRoutes
   * @param  {array} routes array of route paths and associated markdown
   */
  Pagine.prototype.createRoutes = function createRoutes (routes) {
    var _this = this

    var mappedRoutes = routes.reduce(function (acc, cur) {
      acc[cur.path] = function () {
        this.setContent(cur.layout, cur.md);
      }.bind(_this)
      return acc
    }, {})

    this.router.on(mappedRoutes);
  }

  /**
   * Retrieves markdown file content from given URL
   * @name Pagine#fetchMarkdownFile
   * @param  {string} url
   * @returns {string} Markdown file contents
   */
  Pagine.prototype.fetchMarkdownFile = function fetchMarkdownFile (url) {
    if (this.markdownCache[url])
      return Promise.resolve(this.markdownCache[url])

    return this.fetch(url)
      .then(function (res) { return res.text() })
  }

  /**
   * Renders content (HTML) into target element
   * @name Pagine#setContent
   * @param   {string} layout Layout selector
   * @param   {string} md Markdown to be rendered into layout
   * @returns {string}
   */
  Pagine.prototype.setContent = function setContent (layout, url) {
    var _this = this

    return new Promise(function (resolve, reject) {
      _this.fetchMarkdownFile(url)
        .then(function (md) {
          _this.markdownCache[url] = md

          var compiledHTML = _this.compileMarkdown(md)

          var template = _this.tmplEngine.tmpl(layout, {
            content: compiledHTML
          })

          document.querySelector(_this.view).innerHTML = template

          resolve(template)
        })
        .catch(function (err) {
          reject(err)
        })
    })
  };

  /**
   * Transforms markdown into HTML
   * @name Pagine#compileMarkdown
   * @param  {string} md Markdown to be compiled
   * @returns {string} Compiled HTML
   */
  Pagine.prototype.compileMarkdown = function compileMarkdown (md) {
    return this.markdown(md)
  }

  return Pagine

})();

module.exports = Pagine
