/**
 * TemplateEngine class
 * @class
 */
var TemplateEngine = (function() {

  /**
   * Initializes a new instance of TemplateEngine
   * @constructs TemplateEngine
   */
  function TemplateEngine() {
    this.cache = {}
  }

  /**
   * Injects data into template
   * @param  {string} str Template ID selector
   * @param  {object} data Data to be injected
   * @returns {function|string}
   */
  TemplateEngine.prototype.tmpl = function tmpl (str, data){
    var fn = !/\W/.test(str) ?
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

    return data ? fn( data ) : fn
  }

  return TemplateEngine

})()

module.exports = TemplateEngine
