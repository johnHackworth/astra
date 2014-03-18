Crafty.sprite('assets/littleWingLeft.png', {
  sprLittleWingLeft: [0,0,50,50]
});
Crafty.sprite('assets/littleWingRight.png', {
  sprLittleWingRight: [0,0,50,50]
});
Crafty.c('ShipLittleWingLeft', {
  weight: 1,
  init: function() {
    this.requires('ShipComponent, sprLittleWingLeft')
  }
})
Crafty.c('ShipLittleWingRight', {
  weight: 1,
  init: function() {
    this.requires('ShipComponent, sprLittleWingRight')
  }
})
