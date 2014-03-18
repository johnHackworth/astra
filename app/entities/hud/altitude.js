Crafty.c('AltitudeHUD', {
  init: function(opt) {
    this.requires('2D, Canvas, HUD, Text')
    this.textColor('#FFFFFF');
    Crafty.bind('EnterFrame', this.repaint.bind(this));
  },
  fontSize: 40,
  repaint: function() {
    if(this.ship) {
      this.textFont({size: this.getFontSize() + 'px'});
      var altitude = 500 + Math.floor(-1 * this.ship.y )
      this.text(altitude + ' m. high');
      this.y = -1 * Crafty.viewport.y;
      this.x = -1 * Crafty.viewport.x + 20/ Crafty.viewport._scale;
      this.z = 9999;
    }
  }
})


