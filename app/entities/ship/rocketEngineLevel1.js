Crafty.sprite('assets/engine1.png', {
  sprEngine: [0,0,50,50]
});

Crafty.c('RocketEngine', {
  horsePower:7550,
  maxTrust: 12,
  init: function() {
    this.requires('ShipEngine, sprEngine, SpriteAnimation, Particles')

    this.bind('accelerate', this.onAccelerate.bind(this));
    this.bind('deccelerate', this.onDeccelerate.bind(this));
  },
  onAccelerate: function() {
    if(!this.isOn) {
      this.isOn = true;
      if(typeof this._Particles.particleCount === 'undefined') {
        this.particles(window.astra.explosions.rocketExhaust);
      } else {
        this._Particles.init(window.astra.explosions.rocketExhaust)
      }
    }
    this._Particles.maxParticles = 60;
    this._Particles.lifeSpanRandom   = 8 +(Math.abs(this.trust.y/10));
    this._Particles.speedRandom = 10 + rocket.verticalSpeed / 100;
  },
  onDeccelerate: function() {
    if(this.totalTrust <= 0) {
      this._Particles.stop();
      this.isOn = false;
    }
  }
})


