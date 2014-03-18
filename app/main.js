window.astra = window.astra || {};
window.astra.src = window.astra.src || {};
window.astra.app = window.astra.app || {};

window.onload = function() {
  window.astra.app.director = new window.astra.src.Director();
  window.astra.app.director.start();
}
