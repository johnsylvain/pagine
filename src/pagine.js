import snarkdown from 'snarkdown'
import unfetch from 'unfetch'

import Router from './router'
import TemplateEngine from './templateEngine'
import { compose } from './utils'

/**
 * Pagine class
 * @class
 */
export default class Pagine {

  /**
   * Initializes a new instance of Pagine
   * @constructs Pagine
   * @param {object} settings Object of settings (i.e. routes, view)
   */
  constructor(settings) {
    this.router = new Router()
    this.templateEngine = new TemplateEngine()

    this.view = settings.view || '#view'
    this.cache = { md: {} }

    this.createRoutes(settings.routes)
    this.router.listen()
  }

  /**
   * Sets up routes
   * @name Pagine#createRoutes
   * @param  {array} routes array of route paths and associated markdown
   */
  createRoutes (routes) {
    const mappedRoutes = routes.reduce((acc, cur) => {
      acc[cur.path] = () => {
        this.setContent(cur.layout, cur.md);
      }
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
  fetchMarkdownFile (url) {
    return (this.cache.md[url])
      ? Promise.resolve(this.cache.md[url])
      : unfetch(url)
        .then(res => res.text())
        .then(md => Promise.resolve(this.cache.md[url] = md))
  }

  /**
   * Renders content (HTML) into target element
   * @name Pagine#setContent
   * @param   {string} layout Layout selector
   * @param   {string} md Markdown to be rendered into layout
   * @returns {string}
   */
  setContent (layout, url) {
    return this.fetchMarkdownFile(url)
      .then((md) => {
        const compiled = compose(
          snarkdown,
          x => ({ content: x }), // format data for templating
          this.templateEngine.tmpl(layout)
        )(md)

        document.querySelector(this.view).innerHTML = compiled

        Promise.resolve(compiled)
      })
      .catch(err => Promise.reject(err))
  }
}
