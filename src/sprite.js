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
    this.collisions = {
      canvas: false,
    };
  }

  load() {
    const image = new Image();

    image.onload = () => {
      this.size = [image.width, image.height];
    };

    image.src = this.src;
  }

  collisions() {
    this.canvasCollisions();
  }

  canvasCollisions() {
    if (!this.collisions.canvas) {
      if (this.pos[0] > canvas.width) {
        this.pos[0] = this.pos[0] % canvas.width;
      } else if (this.pos[0] < 0) {
        this.pos[0] = canvas.width + (this.pos[0] % canvas.width);
      }

      if (this.pos[1] > canvas.height) {
        this.pos[1] = this.pos[1] % canvas.height;
      } else if (this.pos[1] < 0) {
        this.pos[1] = canvas.height + (this.pos[1] % canvas.height);
      }
    }
  }
}

export default Sprite;
