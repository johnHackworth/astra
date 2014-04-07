var _PIXELS_PER_METER = 4;
Crafty.c('GravityPhysics', {
  _PIXELS_PER_METER: _PIXELS_PER_METER,
  _TERMINAL_VELOCITY: 10000,
  _FRAMES_PER_SECOND: 50,
  _GRAVITY: 98 * _PIXELS_PER_METER,
  _LIMIT_RIGHT: 149000,
  _LIMIT_LEFT: -149000,
  _ORBITAL_SPEED: 9000,
  _ATMOSPHERE_HEIGHT: 300000,
  ZERO_POINT: 500,
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
    return this.ZERO_POINT - this.y;
  },
  gravity: function() {
    var gravity = this._GRAVITY / Math.pow( (this.altitude()/1000+6400) / 6400, 2);
    var gravityDiff = Math.abs(this.lateralSpeed / this._ORBITAL_SPEED);
    if(gravityDiff < 0) {
      gravityDiff = 0;
    } else if(gravityDiff > 1) {
      gravityDiff = 1;
    }

    return gravity * (1 - gravityDiff);
  },

  getNewPosition: function() {
    this.calculateAcceleration();
    this.calculateSpeed();
    this.gravityTurn();
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
    this.accelerationY = this.trustY + this.gravity();
    this.accelerationX = this.trustX;
    var orientation = 0;
    if(this.verticalSpeed) {
      orientation = this.verticalSpeed / Math.abs(this.verticalSpeed);
    }
    var verticalAirBrake = this.airBrake().y;
    if(orientation == 1) {
      verticalAirBrake = 0;
    }
    this.accelerationY -= orientation * verticalAirBrake;
    var originOrientation = this.getOrientationX();

    // console.log(this.accelerationX, originOrientation * this.airBrake().x);
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
    this.lateralSpeed += (acceleration.x);
    this.verticalSpeed += (acceleration.y);
    if(Math.abs(this.lateralSpeed) > this._TERMINAL_VELOCITY) {
      this.lateralSpeed = Math.floor(-150 + Math.random() * 300 + this._TERMINAL_VELOCITY * Math.abs(this.lateralSpeed) / this.lateralSpeed);
    }
    if(Math.abs(this.verticalSpeed) > this._TERMINAL_VELOCITY) {
      this.verticalSpeed = Math.floor(-150 + Math.random() * 300 + this._TERMINAL_VELOCITY * Math.abs(this.verticalSpeed) / this.verticalSpeed);
    }
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
    var maxAltitude = this._ATMOSPHERE_HEIGHT;
    var brakeConstant = 5;
    var brakeConstantX = brakeConstant;
    var brakeConstantY = brakeConstant;
    if(this.altitude() <= 10) {
      brakeConstantX = 10;
    }
    var airBrakeX = Math.abs(this.lateralSpeed / this._FRAMES_PER_SECOND / brakeConstantX );
    var airBrakeY = Math.abs(this.verticalSpeed / (this._FRAMES_PER_SECOND / brakeConstantY));

    var altitudeModificator = this.altitude() / maxAltitude;
    altitudeModificator = altitudeModificator > 1? 1: altitudeModificator;

    airBrakeX = airBrakeX * (1 - altitudeModificator);
    airBrakeY = airBrakeY * (1 - altitudeModificator);

    return {
      x: airBrakeX,
      y: airBrakeY
    }
  },

  gravityTurn: function() {
    if(this.rotation != 270 && this.rotation != 90) {
      var speed = 1 + Math.abs(30 * Math.cos(this.toRadians(this.rotation)));
      if(this.rotation > 90 && this.rotation < 270) {
        this.turn(-1 * speed);
      } else {
        this.turn(speed)
      }

    }
  }
})
