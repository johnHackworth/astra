Crafty.c('GravityPhysics', {
  _TERMINAL_VELOCITY: 50,
  _FRAMES_PER_SECOND: 50,
  _LIMIT_RIGHT: 23000,
  _LIMIT_LEFT: -23000,
  init: function() {
    this.accelerationX = this.accelerationX || 0;
    this.accelerationY = this.accelerationY || 0;
    this.trustX = this.trustX || 0;
    this.trustY = this.trustY || 0;
    this.lateralSpeed = this.lateralSpeed || 0;
    this.verticalSpeed = this.verticalSpeed || 0;
  },
  toRadians: function(degrees) {
    return degrees * Math.PI / 180
  },
  altitude: function() {
    return 500 - this.y;
  },
  gravity: function() {
    var gravity = 9.8 / Math.pow( (this.altitude()/1000+6400) / 6400, 2);
    return gravity;
  },

  getNewPosition: function() {
    this.calculateAcceleration();
    this.calculateSpeed();
    var newX = this.x + this.lateralSpeed / this._FRAMES_PER_SECOND;
    var newY = this.y + this.verticalSpeed / this._FRAMES_PER_SECOND;
    if(newX > this._LIMIT_RIGHT) {
      newX = this._LIMIT_LEFT;
    }
    if(newX < this._LIMIT_LEFT) {
      newX = this._LIMIT_RIGHT;
    }
    return [newX, newY]
  },
  getOrientationX: function(acceleration) {
    var orientationX = 0;
    acceleration = acceleration || 0;
    var additionalAcceleration = acceleration / this._FRAMES_PER_SECOND;
    if(this.lateralSpeed) {
      orientationX = (this.lateralSpeed + additionalAcceleration) / Math.abs(this.lateralSpeed + additionalAcceleration);
    }
    return orientationX;
  },
  calculateAcceleration: function() {
    this.accelerationY += this.trustY + this.gravity();
    var orientation = 0;
    if(this.verticalSpeed) {
      orientation = this.verticalSpeed / Math.abs(this.verticalSpeed);
    }
    this.accelerationY -= orientation * this.airBrake().y;
    this.accelerationX += this.trustX;
    var originOrientation = this.getOrientationX();
    this.accelerationX -= originOrientation * this.airBrake().x;
    var newOrientation = this.getOrientationX(this.accelerationX);
    if(originOrientation != 0 && newOrientation != originOrientation) {
      this.accelerationX = 0;
      this.lateralSpeed = 0;
    }
  },
  accelerationPerFrame: function() {
    return {
      x: this.accelerationX / this._FRAMES_PER_SECOND,
      y: this.accelerationY / this._FRAMES_PER_SECOND
    }
  },
  calculateSpeed: function() {
    var acceleration = this.accelerationPerFrame();
    this.lateralSpeed += acceleration.x;
    this.verticalSpeed += acceleration.y;
    if(this.y >= 500){
      this.y = 500;
      if(this.accelerationY > 0) {
        if(this.crash) {
          this.crash(this.verticalSpeed);
        }
        this.verticalSpeed = 0;
        this.accelerationY = 0;
      }
    }
  },
  airBrake: function() {
    var maxAltitude = 300000;
    var brakeConstant = 30;
    var brakeConstantX = brakeConstant;
    var brakeConstantY = brakeConstant;
    if(this.altitude() <= 10) {
      brakeConstantX = 5;
    }
    var airBrakeX = Math.abs(this.lateralSpeed / this._FRAMES_PER_SECOND / brakeConstantX );
    var airBrakeY = Math.abs(Math.abs(this.verticalSpeed / this._FRAMES_PER_SECOND / brakeConstantY) );

    var altitudeModificator = this.altitude() / maxAltitude;
    altitudeModificator = altitudeModificator > 1? 1: altitudeModificator;

    airBrakeX = airBrakeX * (1 - altitudeModificator);
    airBrakeY = airBrakeY * (1 - altitudeModificator);

    return {
      x: airBrakeX,
      y: airBrakeY
    }
  }
})
