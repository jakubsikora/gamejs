class Sprite {
  constructor(options = {}) {
    this.size = [0, 0];
    this.pos = options.pos || [0, 0];
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
