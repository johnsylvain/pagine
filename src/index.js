import { Converter } from 'showdown';
import Navigo from 'navigo';
import template from 'lodash/template'

export default class Pagine {
  constructor(settings) {
    this.router = new Navigo(null, true);
    this.template = template(document.body.textContent.trim());
    this.converter = new Converter();

    this.createRoutes(settings.routes);
  }
  
  createRoutes(routes) {
    this.router.on(routes.reduce((cur, acc) => {
      return Object.assign({}, acc, {
        [cur.path]:  () => {
          this.setContent(cur.md);
        }
      })
    }, {})).resolve()
  }
  
  setContent(md) {
    this.template({
      content: this.compileMarkdown(md)
    })
  }
  
  compileMarkdown(md) {
    return this.converter.makeHtml(md);
  }
}