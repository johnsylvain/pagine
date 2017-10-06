var $ = document.querySelectorAll.bind(document);
NodeList.prototype.first = function() {
  return this[0];
}

/**
 * Sets inner HTML of target element
 * @param  {string} target
 * @param  {string} content
 * @returns {string} String of HTML that was injected
 */
function renderView(target, content) {
  var $target = $(target).first();

  return $target.innerHTML = content;
}

module.exports = {
  $: $,
  renderView: renderView
};
