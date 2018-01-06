import { assign } from './utils'

/**
 * Router class
 * @class
 */
export default class Router {

  /**
   * Initializes a new Router instance
   * @constructs Router
   */
  constructor (hash) {
    this.routes = {}
    this.__defaults__ = {
      '/404': () => {}
    }
    this.hash = hash || '#'
  }

  /**
   * Listens to changes in the URL
   * @name Router#listen
   */
  listen () {
    window.addEventListener('hashchange', this.resolve.bind(this))
    window.addEventListener('load', this.resolve.bind(this))
  }

  /**
   * Sets the paths and controllers
   * @name Router#on
   * @param  {object} routes
   */
  on (routes) {
    this.routes = assign({}, this.routes, routes)
  }

  /**
   * Resolves the current route
   * @name Router#resolve
   */
  resolve () {
    const url = location.hash.slice(1) || '/'
    const route = this.routes[url]

    if (route) {
      route()
    } else {
      this.__defaults__['/404']()
      history.replaceState(undefined, undefined, this.hash + '/404')
    }
  }
}
