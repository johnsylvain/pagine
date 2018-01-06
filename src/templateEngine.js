/**
 * TemplateEngine class
 * @class
 */
export default class TemplateEngine {

  /**
   * Initializes a new instance of TemplateEngine
   * @constructs TemplateEngine
   */
  constructor () {
    this.cache = {}
  }

  /**
   * Injects data into template
   * @param  {string} str Template ID selector
   * @param  {object} data Data to be injected
   * @returns {function|string}
   */
  tmpl (str, data){
    const fn = !/\W/.test(str) ?
      this.cache[str] = this.cache[str] ||
        this.tmpl(document.getElementById(str).innerHTML) :

      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        "with(obj){p.push('" +
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');")

    return data ? fn(data) : fn
  }
}
