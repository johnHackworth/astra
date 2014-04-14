window.astra = window.astra || {};
window.astra.src = window.astra.src || {}
window.astra.src.shipGenerator = function() {}

window.astra.src.shipGenerator.prototype = {
  phaseCorrector: -20,
  generate: function(options) {
    this.ship = Crafty.e('Ship');
    var phases = [];
    var x = 0;
    for(var i in options.phases) {
      var phase = this.generatePhase(options.phases[i], x);
      phases.push(phase);
      this.ship.addPhase(phase, x);
      x = phase.totalW + this.phaseCorrector;
    }
    this.ship.rotation = 270;
    return this.ship;
  },
  generatePhase: function(phaseData, x) {
    var phase = Crafty.e('ShipPhase');
    var engines = this.generateLevel('engines', phaseData, x);
    this.addLevel(engines, 'engines', phase, x);
    x += engines.w;
    var fuelTanks = this.generateLevel('fuel', phaseData, x);
    this.addLevel(fuelTanks, 'fuel', phase, x);
    x += fuelTanks.w;
    var controlModules = this.generateLevel('control', phaseData, x);
    this.addLevel(controlModules, 'control', phase, x);
    phase.totalW = x + controlModules.w;
    return phase;
  },
  generateLevel: function(levelName, phaseData, x) {
    var components = [];
    var width = 0;
    var height = 0;
    var newWidth = 0;
    for(var i in phaseData[levelName]) {
      var className = phaseData[levelName][i];
      var component = Crafty.e(className);
      components.push(component);
      height += component.h;
      if(component.w > newWidth) {
        newWidth = component.w;
      }
    }
    return {
      components:components,
      w: newWidth,
      h: height
    }
  },
  addLevel: function(level, levelName, phase, x) {
    var originY = -1 * Math.floor(level.h / 2);
    var y = originY;
    for(var i in level.components) {
      phase.addShipComponent(level.components[i], levelName, x, y);
      y += level.components[i].h;
    }
    return phase;
  }

}
