Crafty.c('FuelHUD', {
  init: function(opt) {
    this.requires('2D, Canvas, HUD, Text')
    this.textFont({ size: '50px', weight: 'bold'});
    this.textColor('#FF9933');
    Crafty.bind('EnterFrame', this.repaint.bind(this));
  },
  fontSize: 15,
  repaint: function() {
    if(this.ship) {
      this.textFont({size: this.getFontSize() + 'px'});
      var fuel = Math.floor(this.ship.currentPhase.getTotalFuel());
      this.text(fuel + ' fuel left');
      this.y = -1 * Crafty.viewport.y + this.getFontSize() * 5;
      this.x = -1 * Crafty.viewport.x + 20 / Crafty.viewport._scale;
      this.z = 9999;
    }
  }
})


