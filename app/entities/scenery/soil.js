Crafty.c('Soil', {
  set: function(opt) {
    this.attr(opt);
    this.bg = Crafty.e("2D, Canvas, Image")
              .attr(opt)
              .image('assets/soil1.png',
              "repeat");
  },


})


