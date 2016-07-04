import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import reducer from './reducers/index';
import Keys from './keys';
import raf from 'raf';
import Canvas from './canvas';

class Game {
  constructor() {
    // Canvas properties
    this.canvas = null;
    this.ctx = null;

    // Local player
    this.hero = null;

    this.keys = new Keys();

    // Game state
    const logger = createLogger();

    this.store = createStore(
      reducer,
      applyMiddleware(logger)
    );
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

    // this.animate();

    const subscribeCallback = () => {
      this.update(this.store.getState());
    };

    this.store.subscribe(subscribeCallback);

    this.setEventHandlers();

    subscribeCallback();
  }

  // State changes will trigger this method
  update(state) {
    if (this.hero) this.hero.update(state);
  }

  animate() {
    const animateCallback = () => {
      this.draw();
    };

    raf(function tick() {
      animateCallback();

      raf(tick);
    });
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
