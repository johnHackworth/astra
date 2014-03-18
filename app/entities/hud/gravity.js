Crafty.sprite('assets/gravityHUD.png', {
  sprGravityHUD: [0,0,100,100]
});
Crafty.sprite('assets/marker.png', {
  sprMarker: [0,0,40,10]
});

Crafty.c('GravityHUD', {
  init: function(opt) {
    this.requires('2D, Canvas, HUD, Sprite, sprGravityHUD')
    Crafty.bind('EnterFrame', this.repaint.bind(this));
    this.marker = Crafty.e('2D, Canvas, Sprite, sprMarker');
    this.marker.attr({
      z:10000,
      x: 50
    })
    this.attach(this.marker)
  },

  repaint: function() {
    if(this.ship) {
      var scale = Crafty.viewport._scale;
      this.y = -1 * Crafty.viewport.y + Crafty.viewport.height / scale  - 60 / scale;
      this.x = -1 * Crafty.viewport.x + 20/ scale;
      this.w = 80 / scale;
      this.h = 80 / scale;
      this.repaintMarker();
      this.z = 9999;
    }
  },
  repaintMarker: function() {
    var scale = Crafty.viewport._scale;
    this.marker.h = 40 / scale;
    this.marker.w = 10 / scale;
    this.marker.x = this.x +  this.w / 2;
    this.marker.y = this.y + this.h / 2;
    var range = 270 - 90;
    var position = range * (1 - this.ship.gravity() / 9.8);
    this.marker.rotation = 270 - position;

  }

})


