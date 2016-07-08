import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import reducer from './reducers/index';
import Keys from './keys';
import raf from 'raf';
import canvas from './canvas';
import { initHero, updateHero } from './actions';

class Game {
  constructor() {
    this.keys = new Keys();

    // Game state
    const logger = createLogger();

    this.store = createStore(
      reducer,
      applyMiddleware(logger)
    );
  }

  init() {
    console.log('Initializing game');

    // Set canvas element
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    // Set canvas dimensions
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;

    this.animate();

    const subscribeCallback = () => {
      this.update(this.store.getState());
    };

    this.store.subscribe(subscribeCallback);

    this.setEventHandlers();

    subscribeCallback();

    // Initialize Hero
    this.initHero();
  }

  initHero() {
    // TODO: for now i will use some random data
    this.store.dispatch(initHero({
      pos: [this.canvas.width / 2, this.canvas.height / 2],
      size: [30, 30],
    }));
  }

  // State changes will trigger this method
  update(state) {
    if (this.hero) this.hero.update(state);
  }

  animate() {
    const animateCallback = () => {
      this.store.dispatch(updateHero());
      this.render();
    };

    raf(function tick() {
      animateCallback();

      raf(tick);
    });
  }

  render() {
    // Wipe the canvas clean
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.renderHero();
  }

  renderHero() {
    const state = this.store.getState();

    this.ctx.rect(
      state.hero.pos[0],
      state.hero.pos[1],
      state.hero.size[0],
      state.hero.size[1]
    );

    this.ctx.stroke();
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
