Crafty.sprite('assets/connector.png', {
  sprConnector50: [0,0,25,50]
});

Crafty.c('ShipConnector50', {
  weight: 3,
  init: function() {
    this.requires('ShipComponent, sprConnector50')
  }
})
