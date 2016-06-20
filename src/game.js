import { createStore } from 'redux';
import { keys } from './reducers';
import { pressUp } from './actions';
import Keys from './keys';

class Game {
  constructor(hero) {
    // Canvas properties
    this.canvas = null;
    this.ctx = null;

    // Local player
    this.hero = null;

    this.keys = new Keys();

    // Game state
    this.store = createStore(keys);
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

    const subscribeCallback = () => {
      this.update(this.store.getState());
    };

    this.store.subscribe(subscribeCallback);

    this.setEventHandlers();

    subscribeCallback();
  }

  // State changes will trigger this method
  update(state) {
    console.log('new state', state);
    // this.hero.update(state);
  }

  animate() {
    this.draw();

    // window.requestAnimFrame(this.animate);
  }

  draw() {
    this.hero.draw();
  }

  setEventHandlers() {
    window.addEventListener('keydown', (e) => {
      this.keys.down(e, this.store);
    }, false);

    window.addEventListener('keyup', (e) => {
      this.keys.up(e, this.store);
    }, false);
  }
}

export default new Game();
