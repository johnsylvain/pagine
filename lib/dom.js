var $ = document.querySelectorAll.bind(document);
NodeList.prototype.first = function() {
  return this[0];
}

function renderView(target, content) {
  var $target = $(target).first();

  return $target.innerHTML = content;
}

module.exports = {
  $: $,
  renderView: renderView
};
