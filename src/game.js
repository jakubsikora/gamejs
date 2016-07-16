import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import reducer from './reducers/index';
import Keys from './keys';
import raf from 'raf';
import canvas from './canvas';
import { initHero, updateHero } from './actions';
import { UPDATE_HERO } from './actionTypes';

class Game {
  constructor() {
    this.keys = new Keys();

    // Game state
    const logger = createLogger({
      predicate: (getState, action) => action.type !== UPDATE_HERO,
    });

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
      position: [this.canvas.width / 2, this.canvas.height / 2],
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
    const cx = state.hero.position[0] + (state.hero.size[0] / 2);
    const cy = state.hero.position[1] + (state.hero.size[1] / 2);
    const heroX = 0 - state.hero.size[0] / 2;
    const heroY = 0 - state.hero.size[0] / 2;

    this.ctx.save();
    this.ctx.translate(cx, cy);
    this.ctx.rotate(state.hero.angle);

    this.ctx.beginPath();
    this.ctx.rect(
      heroX,
      heroY,
      state.hero.size[0],
      state.hero.size[1]
    );
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#000';

    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo((state.hero.size[0] / 2), 0);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#000';
    this.ctx.stroke();

    this.ctx.restore();

    // Debug
    const x = cx + state.hero.velocity[0] * 10;
    const y = cy + state.hero.velocity[1] * 10;

    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy);
    this.ctx.lineTo(x, y);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#6aff00';
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
