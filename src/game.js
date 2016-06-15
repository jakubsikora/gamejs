class Game {
  constructor(hero) {
    // Canvas properties
    this.canvas = null;
    this.ctx = null;

    // Local player
    this.hero = null;

    // Game state
    this.store = {};
  }

  init(width, height) {
    console.log('Initializing game');

    // Set canvas element
    this.canvas = document.getElementById('canvas');

    // Set canvas dimensions
    this.canvas.width = width;
    this.canvas.height = height;

    // Set canvas context
    this.ctx = this.canvas.getContext('2d');

    // animate();
  }

  // State changes will trigger this method
  update(state) {
    console.log('game updated');
    console.log('new state', state);
    this.hero.update(state);
  }

  animate() {
    this.draw();

    // window.requestAnimFrame(this.animate);
  }

  draw() {
    this.hero.draw();
  }
}

export default new Game();
