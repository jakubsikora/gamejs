import canvas from './canvas';

class Sprite {
  constructor(options = {}) {
    this.ctx = canvas.getContext('2d');
    this.size = [0, 0];
    this.pos = options.pos || [canvas.width / 2, canvas.height / 2];
    this.vel = [0, 0];
    this.angle = 0;
    this.angleVel = 0;
    this.friction = options.friction || 0;
    this.src = options.src;
    this.speed = 0;
  }

  load() {
    const image = new Image();

    image.onload = () => {
      this.size = [image.width, image.height];
    };

    image.src = this.src;
  }
}

export default Sprite;
