Crafty.c('Exhaust', {
  init: function(opt) {
    Crafty.bind('EnterFrame', this.tick.bind(this));
   },
  set: function(opt) {
    this.rotation = opt.rotation;
    this.h = opt.h;
    this.w = opt.w;
    this.verticalSpeed = opt.verticalSpeed;
    this.lateralSpeed = opt.lateralSpeed;
  },
  tick: function() {
    this.updatePos() ;
  },
  updatePos: function() {
    var scale = Crafty.viewport._scale;
    var correctionX = Math.floor(glare.origX);
    var correctionY = Math.floor(glare.origY);
    // console.log(glare.origX, correctionX);
    glare.y = -1 * Crafty.viewport.y + correctionY + Math.floor(Crafty.viewport.y / 10);
    glare.x = -1 * Crafty.viewport.x + correctionX + Math.floor(Crafty.viewport.x / 1000);
    if(glare.sun) {
      glare.y = glare.sun.y + glare.sun.h / 2;
    }
    glare.w = glare.size / scale;
    glare.h = glare.size / scale;


    if(Math.random() < 0.03) {
      var pix = glare.origSize + Math.floor(Math.random() * 55);
      glare.tween({
        size: pix
      }, 500)
    }
  }


})


