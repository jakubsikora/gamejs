import Sprite from './sprite';

class Hero extends Sprite {
  init() {
    this.load();
  }

  update(state) {
    if (state.keyUp) {
      this.pos[0] += 1;
    }
  }

  draw() {
    // TODO: draw sprite on canvas
  }
}

export default Hero;
