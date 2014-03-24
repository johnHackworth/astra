Crafty.sprite('assets/soil1.png', {
  sprSoil11: [0,0,500,900],
  sprSoil12: [500,0,500,900],
  sprSoil13: [1000,0,500,900]
});
Crafty.sprite('assets/soil2.png', {
  sprSoil21: [0,0,500,900],
  sprSoil22: [500,0,500,900],
  sprSoil23: [1000,0,500,900]
});
Crafty.sprite('assets/soil3.png', {
  sprSoil31: [0,0,500,900],
  sprSoil32: [500,0,500,900],
  sprSoil33: [1000,0,500,900]
});
Crafty.c('Soil', {
  TOTAL_WIDTH: 300000,
  TILE_WIDTH: 1000,
  basetiles: ['sprSoil11', 'sprSoil12', 'sprSoil13',
    'sprSoil21', 'sprSoil22', 'sprSoil23',
    'sprSoil31', 'sprSoil32', 'sprSoil33'
  ],
  tiles: [],
  init: function() {
  },
  set: function(opt) {
    this.attr(opt);
    var y = opt.y;
    var h = opt.h;
    var w = this.TILE_WIDTH;
    for(var i = 0; i < this.TOTAL_WIDTH / this.TILE_WIDTH; i++) {
      var soilBaseTile = this.basetiles[Math.floor(Math.random() * this.basetiles.length)];
      var tile = Crafty.e("2D, Canvas, "+soilBaseTile)
      tile.attr({x: this.x + i * this.TILE_WIDTH, y: y, h: h, w: w})
      this.tiles.push(tile);
    }
    window.t = this.tiles;
  },


})


