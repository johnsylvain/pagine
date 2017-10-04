import mdify from 'mdify';
import Navigo from 'navigo';
import template from 'lodash/template'

export default class Pagine {
    constructor(settings) {
        this.router = new Navigo(null, true);
        this.template = template(document.body.textContent.trim());

        this.createRoutes(settings.routes);
    }

    setContent(md) {
        this.template({
            content: this.compileMarkdown(md)
        })
    }

    createRoutes(routes) {
        this.router.on(routes.reduce((cur, acc) => {
            return Object.assign({}, acc, {
                [cur.path]: function() {
                    this.setContent(cur.md);
                }
            })
        }, {})).resolve()
    }

    compileMarkdown(md) {
        return mdify.parse(md);
    }
}