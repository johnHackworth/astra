Crafty.c('ShipEngine', {
  percentage: 0,
  DEFAULT_HORSEPOWER: 1,
  trust: {x:0,y:0},
  totalTrust: 0,
  brakes: 0.03,
  DEFAULT_MAX_TRUST: 100,
  weight: 100,
  currentFuel: 0,
  DEFAULT_COMSUMPTION: [2, 2, 2, 2, 2],
  init: function() {
    this.horsePower = this.horsePower || this.DEFAULT_HORSEPOWER;
    this.maxTrust = this.maxTrust || this.DEFAULT_MAX_TRUST;
    this.requires('ShipComponent')
    this.trust = {x:0, y:0}
    this.consumption = this.consumption || this.DEFAULT_COMSUMPTION;
    this.initBindings();
  },
  initBindings: function() {
    this.bind("tick", this.onTick.bind(this));
  },

  onTick: function() {
    this.heading = this.rotation;
    this.trust.x = (Math.cos(this.toRadians(this.heading)) * this.totalTrust);
    this.trust.y = (Math.sin(this.toRadians(this.heading)) * this.totalTrust);

  },
  getCurrentConsuption: function() {
    return Math.floor(100 * this.percentage / 20)
  },
  getTrust: function() {
    this.currentFuel = this.phase.getFuel(this.getCurrentConsuption())
    if(this.trust.x != 0 && this.trust.y != 0 && !this.currentFuel) {
      this.trust = {x: 0, y:0};
      this.totalTrust = 0;
      this.trigger('deccelerate')
    }
    return this.trust;
  },
  accelerate: function() {
    this.percentage += 0.01;
    if(this.percentage > 1) {
      this.percentage = 1;
    }
    this.totalTrust = this.percentage * (this._FRAMES_PER_SECOND * this.horsePower) / this.ship.getWeight();
    this.totalTrust = this.totalTrust > this.maxTrust? this.maxTrust: this.totalTrust;

    this.trigger('accelerate')
  },
  deccelerate: function() {
    this.percentage -= this.brakes;
    if(this.percentage < 0) {
      this.percentage = 0;
    }
    this.totalTrust = this.percentage * this.horsePower / this.ship.getWeight();
    this.totalTrust = this.totalTrust < 0? 0 : this.totalTrust;

    this.trigger('deccelerate')
  }
})


