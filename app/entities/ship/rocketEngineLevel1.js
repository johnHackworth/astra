Crafty.sprite('assets/engine1.png', {
  sprEngine: [0,0,50,50]
});
Crafty.sprite(150, 300, 'assets/rocketScape.png', {
  sprExhaust: [0, 0]
});


Crafty.c('RocketEngine', {
  horsePower:3000,
  maxTrust: 700,
  consumption: [0.1, 0.3, 0.5, 0.6, 0.7],
  init: function() {
    this.requires('ShipEngine, sprEngine, SpriteAnimation, Particles')
    this.scapeSprite = Crafty.e('2D, Canvas, Tween, SpriteAnimation, sprExhaust');
    this.scapeSprite.reel('motorRunning', 300,  0, 0, 4);
    this.scapeSprite.rotation = 90;
    this.scapeSprite.attr({
      alpha: 0,
      x: 10,
      y: -40
    })
    this.attach(this.scapeSprite);
    this.bind('accelerate', this.onAccelerate.bind(this));
    this.bind('deccelerate', this.onDeccelerate.bind(this));
  },
  onAccelerate: function() {
    if(!this.isOn && this.currentFuel) {
      this.isOn = true;
      if(typeof this._Particles.particleCount === 'undefined') {
        // this.particles(window.astra.explosions.rocketExhaust);
      } else {
        // this._Particles.init(window.astra.explosions.rocketExhaust)
      }
      this.scapeSprite.tween({alpha: 1}, 500);
      this.scapeSprite.attr({h: 100});
      this.scapeSprite.animate('motorRunning', -1);
    }
    // this._Particles.maxParticles = this.getNumberOfParticles();
    // this._Particles.angle = this.getScapeAngle();
    // this._Particles.sizeRandom = 20 + 40 * this.percentage;
    // this._Particles.lifeSpanRandom = this.getScapeLifespan()
    // this._Particles.speedRandom = this.getScapeSpeed();
    // this._Particles.angleRandom = this.getScapeAngle();
    this.scapeSprite.attr({h: this.getScapeHeight()});
  },
  getNumberOfParticles: function() {
    if(this.ship.altitude() < 3600) {
      return 150;//0 + Math.floor(this.ship.altitude() / 50);
    } else {
      return 3;
    }
  },
  getScapeHeight: function() {
    var scapeHeight = 300 * this.totalTrust / 3  / this._FRAMES_PER_SECOND;
    if(scapeHeight < 100) {
      scapeHeight = 100;
    }
    if(this.y >= 490) {
      scapeHeight = 100;
    }
    return scapeHeight;
  },
  getScapeAngle: function() {
    if(this.ship.altitude() < 3600) {
      return 360 - Math.floor(this.ship.altitude() / 10);
    } else {
      return 0;
    }
  },
  getScapeLifespan: function() {
    if(this.ship.altitude() < 1000) {
      return 15;
    } else {
      return 5;
    }
  },
  getScapeSpeed: function() {
    if(this.ship.altitude() < 3600) {
      return 10;
    } else {
      return this.ship.verticalSpeed / 100;
    }
  },
  getScapeAngle: function() {
    return (this.ship.getHeading() -90) % 360;
  },
  onDeccelerate: function() {
    if(this.totalTrust <= 0) {
      this._Particles.stop();
      this.isOn = false;
      this.scapeSprite.tween({alpha: 0}, 100);
    }
  }
})


