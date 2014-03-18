Crafty.c('Cloud', {
  init: function(opt) {
    this.requires('2D, Canvas, Color')
    this.z = Math.floor(-500 + Math.random() + 1000);
    this.darkness = 155 + Math.floor(Math.random() * 100);
    this.alpha = 1; //Math.random();
    this.chunks = [];
    this.nChunks = Math.ceil(Math.random() * 8);
    for(var n = 0; n < this.nChunks; n++) {
      this.addChunk(n % 4);
    }
  },
  addChunk: function(n) {
    var chunk = Crafty.e('2D, Canvas, Color');
    this.attach(chunk);
    chunk.w = 100 + Math.floor(1000 * Math.random());
    chunk.h = 100 + Math.floor(1000 * Math.random());
    chunk.z = this.z;
    if(n>0) {
      chunk.x = -1 * chunk.w + 50;
    }
    if(n>1) {
      chunk.y = -1 * chunk.y + 50;
    }
    if(n>2) {
      chunk.x = 0;
    }
    chunk.color('rgba('+this.darkness+','+this.darkness+','+this.darkness+','+this.alpha+')');
    this.chunks.push(chunk)
  },
  setZ: function(z) {
    this.attr({z:z});
    for(var i in this.chunks) {
      this.chunks[i].attr({z:z})
    }
  }


})


