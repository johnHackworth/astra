Crafty.sprite('assets/sun.png', {
  sprSun: [0,0,1000,1000]
});

Crafty.c('Sun', {
  SUN_HEIGHT: 4000,
  init: function(opt) {
    this.requires('2D, Canvas, Tween, sprSun')
    this.z = -599;
    this.origSize = 700;
    this.size = this.origSize;
    this.w = this.size;
    this.h = this.size;
    this.origX = Math.floor(Math.random() * Crafty.viewport.width);
    this.origY = -500 -1 * Math.floor(Math.random() * this.SUN_HEIGHT);
    this.x = this.origX;
    this.y = this.origY;
    Crafty.bind('EnterFrame', this.tick.bind(this));
  },
  tick: function() {
    var scale = Crafty.viewport._scale;
    this.updatePos();
  },
  updatePos: function() {

    var scale = Crafty.viewport._scale;
    // var invScale = 1 / scale;
    var correctionX = Math.floor(this.origX);
    var correctionY = Math.floor(this.origY);
    // console.log(this.origX, correctionX);
    this.y = -1 * Crafty.viewport.y + correctionY + Math.floor(Crafty.viewport.y / 10);
    this.x = -1 * Crafty.viewport.x + correctionX + Math.floor(Crafty.viewport.x / 1000);
    this.w = this.size / scale;
    this.h = this.size / scale;
    if(Math.random() < 0.3) {
      var pix = this.origSize + Math.floor(Math.random() * 5);
      this.tween({
        size: pix
      }, 100)
    }
    this.checkGlare();
  },
  checkGlare: function() {
    if(this.isAtCenter() && !this.hasGlared) {
      this.hasGlared = true;
      this.initGlare();
    }
  },
  initGlare: function() {
    var scale = Crafty.viewport._scale;
    this.glare = Crafty.e('Glare');
    this.glare.set({sun: this, x: this.origX + this.w / 2, y: this.origY + this.size / 2})
  },
  isAtCenter: function() {
    var yFactor = Math.abs(Crafty.viewport.y + this.y);
    if(yFactor < 200 ) {
      return true;
    }
    return false;
  }


})


