window.astra = window.astra || {};
window.astra.src = window.astra.src || {};
window.astra.app = window.astra.app || {};
window.astra.app.scenes = window.astra.app.scenes || {};

window.astra.app.scenes.planet = {};

Crafty.scene('Planet', (function() {
  var self = this;
  window.astra.app.scenes.planet = this;
  this.zoomLevel = 1;
  this.TOTAL_WIDTH = 300000;
  this.TOTAL_HEIGHT = 300000;

  this.paintSky = function(altitude) {
    var r = Math.floor(150 - 150 * (Math.abs(altitude / this.TOTAL_HEIGHT)));
    if(r < 0) { r = 0} else if(r>255) { r = 255;};

    var g = Math.floor(200 - 200 * (Math.abs(altitude / this.TOTAL_HEIGHT)));
    if(g < 0) { g = 0} else if(g>255) { g = 255;};

    var b = Math.floor(255 - 255 * (Math.abs(altitude / this.TOTAL_HEIGHT)));
    if(b < 0) { b = 0} else if(b>255) { b = 255;};
    Crafty.background('rgb('+r+', '+g+', '+b+')');

    this.adjustZoom();
  }
  this.adjustZoom = function() {
    if(!this.rocket ) {
      return;
    }
    if(this.customZoom) {
      this.zoomLevel = this.customZoom;
      return;
    }
    var altitude = Math.abs(500 - this.rocket.y);
    if(altitude < 1000) {
      this.zoomLevel = 0.4;
    } else if(altitude < 10000) {
      this.zoomLevel = 0.3;
    } else if(altitude < 30000) {
      this.zoomLevel = 0.25;
    } else if(altitude < 50000) {
      this.zoomLevel = 0.2;
    } else if(altitude < 100000) {
      this.zoomLevel = 0.15;
    } else if(altitude < 3000000) {
      this.zoomLevel = 0.1;
    } else if(altitude < 5000000) {
      this.zoomLevel = 0.07;
    }

  }
  this.centerViewport = function(entity) {
    Crafty.viewport.y = 4/3* Crafty.viewport.height/2/Crafty.viewport._scale - entity.y;
    Crafty.viewport.x = Crafty.viewport.width/2/Crafty.viewport._scale - entity.x;
    if(this.zoomLevel > Math.floor(100 * Crafty.viewport._scale) / 100) {
        Crafty.viewport._scale = Crafty.viewport._scale + 0.0025;
        // Crafty.viewport.scale(newScale);
    } else if(this.zoomLevel < Math.floor(100 * Crafty.viewport._scale) / 100) {
        Crafty.viewport._scale = Crafty.viewport._scale - 0.0025;
        // Crafty.viewport.scale(newScale);
    }
  }

  this.cameraView = function(param) {
    this.paintSky(500 - this.rocket.y);
    this.centerViewport(this.rocket);
  }
  Crafty.bind('EnterFrame', this.cameraView.bind(this));

  window.clouds= []
  for(var i = 0; i <600; i++) {
    var cloud = Crafty.e('Cloud');
    var y = 600 - Math.random() * this.TOTAL_HEIGHT;
    cloud.attr({
      x: (-1 * this.TOTAL_WIDTH / 2 ) + Math.random() * this.TOTAL_WIDTH ,
      y: y,
    });
    if(y > -3000) {
      cloud.setZ(-1);
    }
    window.clouds.push(cloud);
  }

  window.soil = Crafty.e('Soil');
  window.soil.set({x: -1 * this.TOTAL_WIDTH/2, y: -100,w: this.TOTAL_WIDTH, h: 2000 })

  window.stars = [];
  for(var i = 0; i < 300; i++) {
    var star = Crafty.e('Star');
    window.stars.push(star);
  }
  window.sun = Crafty.e('Sun')

  window.altitude = Crafty.e('AltitudeHUD');
  window.speed = Crafty.e('SpeedHUD');
  window.fuel = Crafty.e('FuelHUD');
  window.gravity = Crafty.e('GravityHUD');
  window.throddle = Crafty.e('ThroddleHUD');

  window.rocket = Crafty.e('Ship');
  // window.rocket.testPhase();
  window.rocket = astra.shipGenerator.generate({
    phases:[
      // {
      //   engines:['RocketEngine', 'RocketEngine','RocketEngine',
      //     'RocketEngine', 'RocketEngine','RocketEngine',
      //     'RocketEngine','RocketEngine'],
      //   fuel: ['LiquidFuelTankMedium','LiquidFuelTankMedium','LiquidFuelTankMedium']
      // },
      {
        engines:['RocketEngine','RocketEngine',
          'RocketEngine'],
        fuel: ['LiquidFuelTankMedium']
      },
      // {
      //   engines:['RocketEngine','RocketEngine','RocketEngine'],
      //   fuel:['LiquidFuelTankSmall', 'LiquidFuelTankSmall', 'LiquidFuelTankSmall'  ],
      //   // control:['ShipCone1']
      // },
      {
        engines:['RocketEngine','RocketEngine'],
        fuel:['LiquidFuelTankSmall', 'LiquidFuelTankSmall'  ],
        control:['ShipCone1']
      }
    ]
  })

  window.rocket.at(300, 490);
  this.rocket = window.rocket;

  window.altitude.associateShip(window.rocket);
  window.speed.associateShip(window.rocket);
  window.fuel.associateShip(window.rocket);
  window.gravity.associateShip(window.rocket);
  window.throddle.associateShip(window.rocket);
  this.zoomLevel = 0.5;
  Crafty.viewport._scale = 0.5;

  this.radio = Crafty.e("TextList")
  this.radio.subscribeChannel(1);
  this.radio.at(20,
    Crafty.viewport.height - 200,
    20);
  setTimeout(function() {
    Crafty.trigger('textMessage', {
      text: 'Clear for Takeoff',
      channel: 1,
      color: '#FFFF99',
      origin: {
        name: 'Mission Control'
      }
    })
  }, 1000);
  this.cameraView(0)

}).bind(window.astra.app.scenes.planet ),
function() {

});
