Crafty.sprite('assets/tank2.png', {
  sprTank2: [0,0,200,200]
});

Crafty.c('LiquidFuelTankMedium', {
  fuel: 50000,
  weight: 100,
  fuelType: 'rocket fuel',
  init: function() {
    this.requires('ShipFuelTank, sprTank2')
  }
})


