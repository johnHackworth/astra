Crafty.c('ShipFuelTank', {
  DEFAULT_FUEL: 1000,
  DEFAULT_FUEL_TYPE: 'rocket fuel',
  DEFAULT_WEIGHT: 100,
  init: function() {
    this.fuel = this.fuel || DEFAULT_FUEL;
    this.fuelType = this.fuelType || DEFAULT_FUEL_TYPE;
    this.weight = this.weight || DEFAULT_WEIGHT;
    this.requires('ShipComponent')
  },
  getFuel: function() {
    if(this.fuel) {
      this.fuel--;
      return 1;
    }
    return 0;
  },
  getWeight: function() {
    return (this.weight + this.fuel / 100)
  }

})


