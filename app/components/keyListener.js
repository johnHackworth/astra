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
    var speed = this.getSpeed() || 1;
    var speedModificator = speed / 500;
    if(speedModificator < 4) {
      speedModificator = 4;
    } else if(speedModificator > 30) {
      speedModificator = 30;
    }
    if(this.isDown('LEFT_ARROW') && this.counter % 1 == 0) {
      this.turn(-1 * speedModificator);
    }
    if (this.isDown('RIGHT_ARROW') && this.counter % 1 == 0) {
      this.turn(speedModificator);
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
