Crafty.c('Ship', {
  lateralSpeed: 0,
  verticalSpeed: 0,
  init: function() {
    this.phases = [];
    this.currentPhase = null;
    this.requires('Entity, Solid, Collision, KeyListener, GravityPhysics, Particles')
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
    this.bind("bigAirBrake", this.shake.bind(this));
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
    if(this.currentPhase) {
      var currentTrust = this.currentPhase.getCurrentTrust();
      this.trustX = currentTrust.x;
      this.trustY = currentTrust.y;
      var newPosition = this.getNewPosition()
      this.x = newPosition[0];
      this.y = newPosition[1];
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
  addPhase: function(phase, height, x, y) {
    if(!this.currentPhase) {
      this.currentPhase = phase;
    }
    this.phases.push(phase);
    this.attach(phase);
    phase.addShip(this);
    phase.x += x || 0;
    phase.y += y || 0;
    phase.height = height;
  },
  testPhase: function() {
    var phase = Crafty.e('ShipPhase');
    phase.testRocket3();
    this.addPhase(phase, 270);
    var phase2 = Crafty.e('ShipPhase');
    phase2.testModule();
    this.addPhase(phase2, 100, 270);
    // var phase3= Crafty.e('ShipPhase');
    // phase3.testModule();
    // this.addPhase(phase3, 400);
    this.rotation = 270;
  },
  detachCurrentPhase: function() {
    if(this.phases.length  > 1) {
      if(!this.counterDetached || this.counter - this.counterDetached > 500) {
        this.counterDetached = this.counter;
        var phase = this.phases.splice(0,1)[0];
        var detachedHeight = phase.height;
        this.currentPhase = this.phases[0];
        this.currentPhase.copyEnginePercentage(phase);
        this.detachPhase(phase)
        for(var ph in this.phases) {
          this.phases[ph].attr({y: this.phases[ph].y + detachedHeight});
          this.y -= detachedHeight;
        }
        for(var eng in this.currentPhase.components.engines) {
          this.currentPhase.components.engines[eng].accelerate();
        }
        Crafty.trigger('textMessage', {
          text: 'Phase detached',
          channel: 1,
          color: '#CCCCCC'
        })
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

        phase.lateralSpeed = latSpeed;
        this.lateralSpeed = phase.lateralSpeed;
        phase.accelerationY = 0;
        phase.accelerationX = 0;
        phase.verticalSpeed = verSpeed;
        this.verticalSpeed = phase.verticalSpeed;
      }
      this.accelerationX = 0;
      this.accelerationY = 0;
    }
  },
  getWeight: function() {
    var weight = 0;
    for(var p in this.phases) {
      weight += this.phases[p].getWeight();
    }
    return weight;
  },
  getEnginePercentage: function() {
    if(!this.currentPhase) {
      return 0;
    } else {
      return this.currentPhase.getEnginePercentage();
    }
  },
  getHeading: function() {
    var verticalSpeed = Math.floor(this.verticalSpeed);
    var lateralSpeed = Math.floor(this.lateralSpeed);
    if(!lateralSpeed) {
      if(verticalSpeed > 0) {
        return 90;
      } else {
        return 270;
      }
    } else if (!verticalSpeed) {
      if(lateralSpeed > 0) {
        return 0;
      } else {
        return 180;
      }
    }
    var headingRadians = Math.atan(verticalSpeed / lateralSpeed);
    var heading = (this.toDegrees(headingRadians) + 360 )% 360 ;
    return Math.floor(heading);
  },
  shake: function(amount) {
    if(Math.floor(Math.abs(this.trustX)) == 0 && Math.floor(Math.abs(this.trustY)) == 0) {
      var orientation = 15  - Math.floor(Math.random() * 31);
      this.turn(orientation);
    }
  }

});

