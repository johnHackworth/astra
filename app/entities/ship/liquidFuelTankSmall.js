Crafty.sprite('assets/tank1.png', {
  sprTank: [0,0,100,50]
});

Crafty.c('LiquidFuelTankSmall', {
  fuel: 5000,
  weight: 50,
  fuelType: 'rocket fuel',
  init: function() {
    this.requires('ShipFuelTank, sprTank')
  }
})


