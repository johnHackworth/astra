Crafty.c('Entity', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  },
  turn: function(amount) {
    this.rotation += amount / 50;
    if(this.rotation < 0) {
      this.rotation = 360 + this.rotation;
    }
    if(this.rotation >= 360) {
      this.rotation = this.rotation - 360;
    }
    this.heading = this.rotation;
    this.checkMaxTurn();
  },
  getSpeed: function() {
    return Math.sqrt(this.lateralSpeed * this.lateralSpeed + this.verticalSpeed * this.verticalSpeed);
  },
  checkMaxTurn: function() {
    if(this.altitude() <= 0) {
      if(this.rotation < 180 && this.rotation >=90) {
        this.rotation = 180;
      } else if(this.rotation > 0 && this.rotation < 90) {
        this.rotation = 0;
      }
      this.heading = this.rotation;
    }
  },
});

