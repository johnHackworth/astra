Crafty.c('SpeedHUD', {
  init: function(opt) {
    this.requires('2D, Canvas, HUD, Text')
    this.textFont({ size: '50px', weight: 'bold'});
    this.textColor('#FFFF99');
    Crafty.bind('EnterFrame', this.repaint.bind(this));
  },
  fontSize: 20,

  repaint: function() {
    if(this.ship) {
      this.textFont({size: this.getFontSize() + 'px'});
      var speed = Math.floor(-1 * this.ship.verticalSpeed)
      this.text(speed + ' vertical m/s ');
      this.y = -1 * Crafty.viewport.y + this.getFontSize() * 2.2;
      this.x = -1 * Crafty.viewport.x + 20/ Crafty.viewport._scale;
      this.z = 9999;
    }
  }
})


