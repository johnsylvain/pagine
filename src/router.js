var utils = require('./utils')

/**
 * Router class
 * @class
 */
var Router = (function () {

  /**
   * Initializes a new Router instance
   * @constructs Router
   */
  function Router (hash) {
    this.routes = {}
    this.__default_routes__ = {
      '/404': function() { }
    }
    this.hash = hash || '#'

    this.bindEvents()
  }

  /**
   * Listens to changes in the URL
   * @name Router#bindEvents
   */
  Router.prototype.bindEvents = function bindEvents () {
    window.addEventListener('hashchange', this.resolve.bind(this))
    window.addEventListener('load', this.resolve.bind(this))
  }

  /**
   * Sets the paths and controllers
   * @name Router#on
   * @param  {object} routes
   */
  Router.prototype.on = function on (routes) {
    this.routes = utils.extend({}, this.routes, routes)
  }

  /**
   * Resolves the current route
   * @name Router#resolve
   */
  Router.prototype.resolve = function resolve () {
    var url = location.hash.slice(1) || '/'
    var route = this.routes[url]

    if (route) {
      route()
    } else {
      this.__default_routes__['/404']()
      history.replaceState(undefined, undefined, this.hash + '/404')
    }
  }

  return Router

})()

module.exports = Router
