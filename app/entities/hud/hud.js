Crafty.c('HUD', {
  init: function() {
    if(!this.fontSize) {
      this.fontSize = 10;
    }
  },
  associateShip: function(ship) {
    this.ship = ship;
  },
  getFontSize: function() {
    return (this.fontSize / Crafty.viewport._scale);
  }
})


