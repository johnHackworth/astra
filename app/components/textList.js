Crafty.c("TextList", {
  channels:[],
  init: function() {
    this.requires('2D, Canvas')
    this.xPos = 20;
    this.yPos = 20;
    this.ready = true;
    this.context = Crafty.canvas.context;
    this.messages = [];
    this.texts = [];
    this.fontSize = 15;
    this.bind("EnterFrame", this.tick.bind(this));
    Crafty.bind("textMessage", this.receive.bind(this));
    for(var i = 0; i < 10; i++) {
      this.texts[i] = Crafty.e('Text, Entity')
    }
  },
  at: function(x,y, size) {
    this.xPos = x;
    this.yPos = y;
    this.fontSize = size;
    return this;
  },
  receive: function(message) {
    if(this.channels.indexOf(message.channel) >= 0) {
      this.messages.unshift(message);
    }
  },
  subscribeChannel: function(channelNumber) {
    this.channels.push(channelNumber);
  },
  tick: function(ctx) {
    var scale = Crafty.viewport._scale;
    this.y = -1 * Crafty.viewport.y + this.yPos / scale;
    this.x = -1 * Crafty.viewport.x + this.xPos / Crafty.viewport._scale;

    var i = 0;
    var color = '#FFFFFF';
    while(i<10) {
      if(this.messages[i]) {
        if(this.messages[i].color) {
          color = this.messages[i].color;
        }
        var text = this.messages[i].text;
        if(this.messages[i].origin) {
          text = this.messages[i].origin.name + ': ' + text;
        }
        this.texts[i].text(text)
          .textColor(color, 0.1 * (10/(i+1)))
          .at(this.x, (this.y + i* this.fontSize / scale))
        if(this.fontSize) {
          this.texts[i].textFont("size", (this.fontSize / scale) + 'px')
          // console.log(this.texts[i].w)
        }
      }
      window.texts = this.texts;
      i++;
    }
  }

});
