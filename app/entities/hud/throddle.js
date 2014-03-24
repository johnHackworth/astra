Crafty.c('ThroddleHUD', {
  init: function(opt) {
    this.requires('2D, Canvas, HUD, Text')
    this.textFont({ size: '80px', weight: 'bold'});
    this.textColor('#FF6666');
    Crafty.bind('EnterFrame', this.repaint.bind(this));
  },
  fontSize: 20,

  repaint: function() {
    if(this.ship) {
      this.textFont({size: this.getFontSize() + 'px'});
      var percentage = Math.floor(this.ship.getEnginePercentage());
      this.text('Engine ' + percentage + '%');
      this.y = -1 * Crafty.viewport.y + this.getFontSize() * 10;
      this.x = -1 * Crafty.viewport.x + 20/ Crafty.viewport._scale;
      this.z = 9999;
    }
  }
})


