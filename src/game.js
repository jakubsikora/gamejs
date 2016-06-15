class Game {
  constructor() {
    this.canvas = null;
  }

  init() {
    console.log('Initializing game');

    this.canvas = document.getElementById('canvas');
  }
}

export default new Game();