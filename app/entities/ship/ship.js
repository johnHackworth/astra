Crafty.c('Ship', {
  init: function() {
    this.phases = [];
    this.currentPhase = null;
    this.requires('Entity, Solid, Collision, KeyListener, Gravity, GravityPhysics, Particles')
      // .color('#FFFFFF')
      .stopOnSolids()
    this.initBindings();
    this.counter = 0;
    // this.rotation = 270;
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
    if(this.counter % 10 === 0) {
      Crafty.trigger('checkSky', this.y)
    }
    var cosHeading = (Math.cos(this.toRadians(this.heading)));
    var sinHeading = (Math.sin(this.toRadians(this.heading)));
    this.inertia();
    this.checkKeyboardEvents();
  },
  inertia: function() {
    var currentTrust = this.currentPhase.getCurrentTrust();
    this.trustX = currentTrust.x;
    this.trustY = currentTrust.y;
    var newPosition = this.getNewPosition()
    this.x = newPosition[0];
    this.y = newPosition[1];
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
  toRadians: function(degrees) {
    return degrees * Math.PI / 180
  },
  get: function() {
    this.velocity += this.currentPhase.getCurrentTrust();
  },


  accelerate: function() {
    if(this.currentPhase) {
      this.currentPhase.accelerate();
    }
  },
  deccelerate: function() {
    if(this.currentPhase) {
      this.currentPhase.deccelerate();
    }
  },
  addPhase: function(phase, x, y) {
    if(!this.currentPhase) {
      this.currentPhase = phase;
    }
    this.phases.push(phase);
    this.attach(phase);
    phase.addShip(this);
    phase.x += x || 0;
    phase.y += y || 0;
  },
  testPhase: function() {
    var phase = Crafty.e('ShipPhase');
    phase.testRocket3();
    this.addPhase(phase);
    var phase2 = Crafty.e('ShipPhase');
    phase2.testModule();
    this.addPhase(phase2, 270);
    // var phase3= Crafty.e('ShipPhase');
    // phase3.testModule();
    // this.addPhase(phase3, 400);
    this.rotation = 270;
  },
  detachCurrentPhase: function() {
    if(this.phases.length  > 1) {
      var phase = this.phases.splice(0,1)[0];
      this.currentPhase = this.phases[0];
      this.detachPhase(phase)
      for(var eng in this.currentPhase.components.engines) {
        this.currentPhase.components.engines[eng].accelerate();
      }

    }
  },
  detachPhase: function(phase) {
    this.detach(phase);
    phase.trust = 0;
    phase.lateralSpeed = this.lateralSpeed;
    phase.verticalSpeed = this.verticalSpeed;
    phase.accelerationX = this.accelerationX;
    phase.accelerationY = this.accelerationY;
    phase.isDetached = true;
  },
  centerViewport: function() {
    Crafty.trigger('centerEntity', this);
  },
  crash: function(speed) {
    if(speed > 1000) {
      var latSpeed =  Math.random() * (this.lateralSpeed + (Math.random() * 1000 - 500));;
      if(latSpeed > 1000) {
        latSpeed = 1000;
      }
      var verSpeed = -1 * Math.random() * speed / 2;
      if(verSpeed > 1000) {
        verSpeed = 1000;
      }
      while(this.phases.length) {

        var phase = this.phases.splice(0,1)[0];

        phase.explosion();
        this.detachPhase(phase)

        // phase.lateralSpeed = latSpeed;
        // this.lateralSpeed = phase.lateralSpeed;
        // phase.verticalSpeed = verSpeed;
        // this.verticalSpeed = phase.verticalSpeed;
      }
    }
  },
  getWeight: function() {
    var weight = 0;
    for(var p in this.phases) {
      weight += this.phases[p].getWeight();
    }
    return weight;
  }

});

