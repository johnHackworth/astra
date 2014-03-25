Crafty.sprite('assets/stars.png', {
  sprSky: [0,0,3000,2000]
});

Crafty.c('Star', {
  init: function(opt) {
    this.requires('2D, Canvas, Tween, Color')
    this.z = -600;
    this.size = Math.floor(Math.random() * 25) + 1;
    this.w = this.size;
    this.h = this.size;
    this.origX = -1.5 * Crafty.viewport.width + Math.floor(Math.random() * 4 * Crafty.viewport.width);
    this.origY = - 1 * Math.floor(Math.random() * 2 * Crafty.viewport.height);
    this.x = this.origX;
    this.y = this.origY;
    var randomColorsAdjust = [Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100)
    ];
    this.color('rgb('+ (155 + randomColorsAdjust[0]) +
      ','+ (155 + randomColorsAdjust[1]) +
      ','+ (155 + randomColorsAdjust[2]) + ')');
    Crafty.bind('EnterFrame', this.tick.bind(this));
  },
  tick: function() {
    var scale = Crafty.viewport._scale;
    if(Crafty.viewport.y < 100000) {
      this.alpha = 0;
      this.updatePos();
    } else if(Crafty.viewport.y < 200000) {
      this.alpha = 0.25;
      this.updatePos();
    } else if(Crafty.viewport.y < 300000) {
      this.alpha = 0.5;
      this.updatePos();
    } else {
      this.alpha = 1;
      this.updatePos();
    }
  },
  updatePos: function() {

    var scale = Crafty.viewport._scale;
    // var invScale = 1 / scale;
    var correctionX = Math.floor(this.origX / scale);
    var correctionY = Math.floor(this.origY / scale);
    // console.log(this.origX, correctionX);
    this.y = -1 * Crafty.viewport.y + correctionY + Math.floor(Crafty.viewport.y / 100);
    this.x = -1 * Crafty.viewport.x + correctionX + Math.floor(Crafty.viewport.x / 10);
    this.w = this.size  ;
    this.h = this.size ;
    if(Math.random() < 0.003) {
      var pix = Math.floor(Math.random() * 30);
      this.tween({
        size: pix
      }, 100)
    }
        // this.attr.y = -1 * Crafty.viewport.y + this._y / scale
    // this.x = -1 * Crafty.viewport.x + this._x / scale;
  }


})


