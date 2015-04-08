Crafty.c('MultiLineText', {
  init: function() {
    this.requires('2d, Canvas, Color')
    this.initialize();
    this.ready = true;
  },
  initialize: function() {
    this.bind('EnterFrame', this.tick.bind(this));
    this.opacity = 1;
    this.texts = [];
    this.drawnTexts = [];
    this.fontSize = 15;
    this.lineSpacing = 5;
    this.textColor = '#333333';
  },
  setOptions: function(options) {
    if(options.backgroundColor) {
      this.backgroundColor = options.backgroundColor;
      this.color(this.backgroundColor);
    }
    this.textColor = options.textColor || this.textColor;
    this.fontSize = options.fontSize || this.fontSize;
    this.lineSpacing = options.lineSpacing || this.lineSpacing;
  },

  addLine: function(line, color, size) {
    color = color || this.textColor;
    size = size || this.size;
    this.texts.push({
      text: line,
      color: color,
      size: size
    })

    this.drawnTexts.push(Crafty.e('Text, Entity'))
  },
  at: function(x,y) {
    this.xPos = x;
    this.yPos = y;
    return this;
  },
  tick: function(ctx) {
    var scale = Crafty.viewport._scale;
    this.y = -1 * Crafty.viewport.y + this.yPos / scale;
    this.x = -1 * Crafty.viewport.x + this.xPos / scale;

    var i = 0;
    var yPos = 0;
    for(var i = 0, l = this.texts.length; i < l; i++) {
      var textColor = this.texts[i].color || this.color;
      var fontSize = this.texts[i].size || this.fontSize;
      this.drawnTexts[i].text(this.texts[i].text)
        .textColor(textColor)
        .textFont('size', (fontSize / scale) + 'px')
        .at(this.x, (this.y + yPos));
      yPos += (fontSize + this.lineSpacing) / scale;
    }
  },
  clear: function() {
    if(this.interval) {
      clearInterval(this.interval);
    }
    this.texts = [];
    for(var i = 0, l = this.drawnTexts.length; i < l; i++) {
      this.drawnTexts[i].destroy();
    }
    this.drawnTexts = [];
  },
  timer: function(milliseconds) {
    setTimeout(this.clear.bind(this), milliseconds);
  },
  reduceStepOpacity: function() {
    this.opacity = this.opacity - 0.01;
    if(this.opacity < 0) {
      this.opacity = 0;
    }
    for(var i in this.drawnTexts) {
      this.drawnTexts[i].alpha = this.opacity;
    }
  },
  fadeOut: function(milliseconds) {
    var step = Math.floor(milliseconds / 100);
    this.interval = setInterval(
      this.reduceStepOpacity.bind(this),
      step
    );
    this.timer(milliseconds);
  }
});
