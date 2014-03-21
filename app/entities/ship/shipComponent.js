Crafty.c('ShipComponent', {
  isOn: false,
  init: function() {
    this.requires('Entity, Solid, Collision, GravityPhysics')
      // .color('#FFFFFF')
      .stopOnSolids()
    this.initBindings();
    this.counter = 0;
  },
  velocity: 0,
  velocityX: 0,
  velocityY: 0,
  position: [0,0],
  heading: 270,
  initBindings: function() {
    this.bind("EnterFrame", this.tick.bind(this));
  },

  tick: function() {
    this.counter++;
    var cosHeading = (Math.cos(this.toRadians(this.heading)));
    var sinHeading = (Math.sin(this.toRadians(this.heading)));
    this.inertia();
    if(this.onTick) {
      this.onTick()
    }
  },
  stopOnSolids: function() {
    return this;
  },
  // Stops the movement
  stopMovement: function(elements) {
    this.velocityX = 0;
    this.velocityY = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },
  calculateSpeed: function() {
    this.velocityX = (Math.cos(this.toRadians(this.heading)) * this.velocity);
    var velocityY = (Math.sin(this.toRadians(this.heading)) * this.velocity) + this.gravity();
    if(this.y >= 500 && velocityY > 0) {
      this.velocityY = 0;
      this.y = 500;
    } else {
      this.velocityY = velocityY;
    }
    this.lateralSpeed = this.velocityX;
    this.verticalSpeed = this.velocityY;
  },

  inertia: function() {
    if(this.isDetached) {
      this.calculateSpeed();
      var newPosition = this.getNewPosition()
      this.x = newPosition[0];
      this.y = newPosition[1];
    }
  },
  turn: function(amount) {

  },
});

