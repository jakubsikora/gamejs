import Sprite from './sprite';

class Hero extends Sprite {
  init() {
    this.load();
  }

  update(state) {
    this.collisions();

    if (state.keys.up) {
      this.pos[0] += 10;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.pos[0],
      this.pos[1],
      15,
      0,
      2 * Math.PI
    );
    this.ctx.stroke();
  }
}

export default Hero;
