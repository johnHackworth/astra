Crafty.sprite('assets/tank2.png', {
  sprTank2: [0,0,200,200]
});

Crafty.c('LiquidFuelTankMedium', {
  fuel: 5000,
  weight: 1000,
  fuelType: 'rocket fuel',
  init: function() {
    this.requires('ShipFuelTank, sprTank2')
  }
})


