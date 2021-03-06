window.astra = window.astra || {};
window.astra.src = window.astra.src || {};
window.astra.app = window.astra.app || {};


window.astra.src.Director = function() {

};
window.astra.config = {
  width: 960,
  height: 650,
  fps: 20
}
window.astra.src.Director.prototype = {
  backgroundColor: '#CCCCCC',
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(window.astra.config.width, window.astra.config.height);
    Crafty.background(this.backgroundColor);
    Crafty.scene('Planet')
  },
}

window.astra.shipGenerator = new window.astra.src.shipGenerator();
