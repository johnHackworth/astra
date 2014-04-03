Crafty.c('ShipPhase', {
  counter: 0,
  numberOfComponents: 0,
  init: function() {
    this.requires('2D, Entity, GravityPhysics, Tween, Particles')
    this.components = {
      engines: [],
      fuel: [],
      control: [],
      connector: [],
      decoration: []
    };
    this.initBindings();
  },
  initBindings: function() {
    this.bind("EnterFrame", this.tick.bind(this));
  },
  tick: function() {
    this.counter++;
    this.inertia();
    if(this.flamesFrames){
      this.flamesFrames--;
      this.flames();
    }
  },

  inertia: function() {
    if(this.isDetached) {
      this.airBrake();
      this.trustX = 0;
      this.trustY = 0;
      var newPosition = this.getNewPosition()
      this.x = newPosition[0];
      this.y = newPosition[1];
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
    this.lateralSpeed = Math.floor(this.velocityX);
    this.verticalSpeed = Math.floor(this.velocityY);
  },
  addShipComponent: function(component, type, x, y) {
    this.numberOfComponents++;
    this.components[type].push(component);
    component.phase = this;
    this.attach(component);
    if(x) {
      component.x += x;
    }
    if(y) {
      component.y += y;
    }
  },
  testRocket: function() {
    var rocket = Crafty.e('RocketEngine');
    this.addShipComponent(rocket,'engines');
    // var rocket2 = Crafty.e('RocketEngine');
    // this.addShipComponent(rocket2,'engines');
    // rocket2.y += 50;

    var littleWingR = Crafty.e('ShipLittleWingRight')
    this.addShipComponent(littleWingR, 'decoration', 0, 50)
    var littleWingL = Crafty.e('ShipLittleWingLeft')
    this.addShipComponent(littleWingL, 'decoration', 0, -50)

    var connector1 = Crafty.e('ShipConnector50')
    this.addShipComponent(connector1, 'connector', 50)
    var connector2 = Crafty.e('ShipConnector50')
    this.addShipComponent(connector2, 'connector', 75)
    var fuelTank = Crafty.e('LiquidFuelTankSmall')
    this.addShipComponent(fuelTank, 'fuel', 100)
    var connector3 = Crafty.e('ShipConnector50')
    this.addShipComponent(connector3, 'connector', 200)
  },
  testRocket2: function() {
    var rocket = Crafty.e('RocketEngine');
    this.addShipComponent(rocket,'engines', 0, -50);
    var rocket2 = Crafty.e('RocketEngine');
    this.addShipComponent(rocket2,'engines', 0, 50);

    var littleWingR = Crafty.e('ShipLittleWingRight')
    this.addShipComponent(littleWingR, 'decoration', 30, 100)
    var littleWingL = Crafty.e('ShipLittleWingLeft')
    this.addShipComponent(littleWingL, 'decoration', 30, -100)


    var connector1 = Crafty.e('ShipConnector50')
    this.addShipComponent(connector1, 'connector', 50, -50)
    var connector2 = Crafty.e('ShipConnector50')
    this.addShipComponent(connector2, 'connector', 50, 50)
    var fuelTank = Crafty.e('LiquidFuelTankMedium')
    this.addShipComponent(fuelTank, 'fuel', 50, -75)
    var connector3 = Crafty.e('ShipConnector50')
    this.addShipComponent(connector3, 'connector', 200)
  },
  testRocket3: function() {
    var rocket = Crafty.e('RocketEngine');
    this.addShipComponent(rocket,'engines', 0, -50);
    var rocket2 = Crafty.e('RocketEngine');
    this.addShipComponent(rocket2,'engines', 0, 0);
    var rocket3 = Crafty.e('RocketEngine');
    this.addShipComponent(rocket3,'engines', 0, 50);

    var connector01 = Crafty.e('ShipConnector50')
    this.addShipComponent(connector01, 'connector', 50, -50)
    var connector02 = Crafty.e('ShipConnector50')
    this.addShipComponent(connector02, 'connector', 50, 50)
    var connector03 = Crafty.e('ShipConnector50')
    this.addShipComponent(connector03, 'connector', 50, 0)

    var littleWingR = Crafty.e('ShipLittleWingRight')
    this.addShipComponent(littleWingR, 'decoration', 30, 100)
    var littleWingL = Crafty.e('ShipLittleWingLeft')
    this.addShipComponent(littleWingL, 'decoration', 30, -100)


    var connector1 = Crafty.e('ShipConnector50')
    this.addShipComponent(connector1, 'connector', 75, -50)
    var connector2 = Crafty.e('ShipConnector50')
    this.addShipComponent(connector2, 'connector', 75, 50)
    var connector3 = Crafty.e('ShipConnector50')
    this.addShipComponent(connector3, 'connector', 200)
    var fuelTank = Crafty.e('LiquidFuelTankMedium')
    this.addShipComponent(fuelTank, 'fuel', 75, -75)

    var connector12 = Crafty.e('ShipConnector50')
    this.addShipComponent(connector12, 'connector', 270, -25)
    var connector11 = Crafty.e('ShipConnector50')
    this.addShipComponent(connector11, 'connector', 270, 25)
    var connector112 = Crafty.e('ShipConnector50')
    this.addShipComponent(connector112, 'connector', 290, -25)
    var connector111 = Crafty.e('ShipConnector50')
    this.addShipComponent(connector111, 'connector', 290, 25)
  },

  testModule: function() {
    var rocket = Crafty.e('RocketEngine');
    this.addShipComponent(rocket,'engines');
    var fuelTank = Crafty.e('LiquidFuelTankSmall')
    this.addShipComponent(fuelTank, 'fuel', 50)
    var cone = Crafty.e('ShipCone1');
    this.addShipComponent(cone, 'control', 150);
  },
  accelerate: function() {
    if(this.components.engines.length > 0) {
      for(var eng in this.components.engines) {
        this.components.engines[eng].accelerate();
      }
    }
  },
  deccelerate: function() {
    if(this.components.engines.length > 0) {
      for(var eng in this.components.engines) {
        this.components.engines[eng].deccelerate();
      }
    }
  },
  getCurrentTrust: function() {
    var trust = {x:0, y:0};
    for(var eng in this.components.engines) {
      var componentTrust = this.components.engines[eng].getTrust();
      trust.x += componentTrust.x;
      trust.y += componentTrust.y;
    }
    return {x: trust.x, y: trust.y};
  },
  getFuel: function() {
    var fuel = 0;
    for(var eng in this.components.fuel) {
      if(!fuel) {
        fuel += this.components.fuel[eng].getFuel();
      }
    }
    return fuel;
  },
  getTotalFuel: function() {
    var fuel = 0;
    for(var eng in this.components.fuel) {
      fuel += this.components.fuel[eng].fuel;
    }
    return fuel;
  },
  explosion: function() {
    this.flamesFrames = 30;
  },
  flames: function() {
    if(this.counter % 10 === 0) {
      var explosionOptions = _.clone(window.astra.explosions.shipCrash);
      var fuel = this.getTotalFuel();
      explosionOptions.duration = Math.abs(Math.random() * 100);
      explosionOptions.lifeSpanRandom = Math.abs(Math.random() * 50);

      this.particles(explosionOptions);
    }
    if(!this.flamesFrames) {
      this.smoke();
    }
  },
  smoke: function() {
    var fuel = this.getTotalFuel();
    var smokeOptions = _.clone(window.astra.explosions.shipCrashSmoke);
    smokeOptions.size = 2 * this.numberOfComponents;
    smokeOptions.duration = 50 * fuel;
    smokeOptions.speed = 1;
    this.particles(smokeOptions );
  },
  getWeight: function() {
    var weight = 0;
    for(var comp in this.components) {
      for(var c in this.components[comp]) {
        if(this.components[comp][c].weight) {
          weight += this.components[comp][c].weight;
        }
      }
    }
    return weight;
  },
  addShip: function(ship) {
    this.ship = this;
    for(var comp in this.components) {
      for(var c in this.components[comp]) {
        this.components[comp][c].ship = ship;
      }
    }
  },
  crash: function() {

  },
  getEnginePercentage: function() {
    var percentage = 0;
    var nEngines = 0;
    for(var eng in this.components.engines) {
      percentage += this.components.engines[eng].percentage;
      nEngines++;
    }
    if(!nEngines) {
      return 0;
    }
    return Math.floor(100 * percentage / nEngines);
  }

})


