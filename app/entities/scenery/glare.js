Crafty.c('Glare', {
  SUN_HEIGHT: 4000,
  GLARE_NUMBER: 4,
  init: function(opt) {
  },
  set: function(opt) {
    this.glares = [];
    for(var i = this.GLARE_NUMBER; i; i--) {
      var glare = Crafty.e('2D, Canvas, Tween, Color')
      glare.z = 99999;
      glare.sun = opt.sun;
      glare.i = i;
      glare.origSize = Math.floor(600 / i);
      glare.size = glare.origSize;
      glare.w = glare.size;
      glare.h = glare.size;
      if(this.glares.length > 0) {
        var lastGlare = this.glares[this.glares.length-1];
        glare.origX = lastGlare.x + lastGlare.w + 100;
        glare.destX = lastGlare.destX - lastGlare.w - 100;
      } else {
        glare.origX = opt.x + 50;
        glare.destX = opt.x - 50;
      }
      glare.origY = opt.y;
      glare.x = glare.origX;
      glare.y = glare.origY;
      glare.attr({
        alpha: 0
      });
      var r = Math.floor(Math.random() * 45);
      var g = Math.floor(Math.random() * 45);
      var b = Math.floor(Math.random() * 45);
      glare.color('rgb('+(210 + r)+','+(210 + g)+','+(210 + b)+')');

      glare.tween({
        alpha: 0.5
      }, 300);

      glare.tween({
        origX: glare.destX,
        rotation: 180
      }, 3000)

      setTimeout((function(glare) {
        return function() {
          glare.attr({
            alpha: 0.3
          })
        }
      })(glare), 2500);
      setTimeout((function(glare) {
        return function() {
          glare.attr({
            alpha: 0.1
          })
        }
      })(glare), 2800);

      this.glares.push(glare);
      Crafty.bind('EnterFrame', this.tick.bind(this, glare));
    }
  },
  tick: function(glare) {
    this.updatePos(glare) ;
  },
  updatePos: function(glare) {
    var scale = Crafty.viewport._scale;
    // var invScale = 1 / scale;
    var correctionX = Math.floor(glare.origX);
    var correctionY = Math.floor(glare.origY);
    // console.log(glare.origX, correctionX);
    glare.y = -1 * Crafty.viewport.y + correctionY + Math.floor(Crafty.viewport.y / 10);
    glare.x = -1 * Crafty.viewport.x + correctionX + Math.floor(Crafty.viewport.x / 1000);
    if(glare.sun) {
      glare.y = glare.sun.y + glare.sun.h / 2;
    }
    // glare.w = glare.size / scale;
    // glare.h = glare.size / scale;


    if(Math.random() < 0.03) {
      var pix = glare.origSize + Math.floor(Math.random() * 55);
      glare.tween({
        size: pix
      }, 500)
    }
  }


})


