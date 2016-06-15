class Game {
  constructor(hero) {
    // Canvas properties
    this.canvas = null;
    this.ctx = null;

    // Local player
    this.hero = hero;

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
  }

  // State changes will trigger this method
  render(prevState, state) {
    this.hero.update();
  }
}

export default new Game();
