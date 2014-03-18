Crafty.c('KeyListener', {
  counter: 0,
  init: function() {
    this.requires('Keyboard');
    this.initializeKeyboard();
  },
  initializeKeyboard: function() {
    this.bind('EnterFrame',this.checkKeyboardEvents.bind(this));
  },
  checkKeyboardEvents: function() {
    this.counter++;
    if(this.isDown('LEFT_ARROW') && this.counter % 1 == 0) {
      this.turn(-4);
    }
    if (this.isDown('RIGHT_ARROW') && this.counter % 1 == 0) {
      this.turn(4);
    }

    if (this.isDown('UP_ARROW') && this.counter % 10 == 0) {
      this.accelerate()
    }
    if (this.isDown('DOWN_ARROW') && this.counter % 10 == 0) {
      this.deccelerate();
    }
    if (this.isDown('D') && this.counter % 10 == 0) {
      this.detachCurrentPhase();
    }

  }
});
