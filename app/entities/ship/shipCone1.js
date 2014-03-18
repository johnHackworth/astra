Crafty.sprite('assets/cone1.png', {
  sprCone: [0,0,50,50]
});

Crafty.c('ShipCone1', {
  weight: 30,
  init: function() {
    this.requires('ShipComponent, sprCone')
  }
})
