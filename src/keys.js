import {
  pressUp,
  releaseUp,
  pressDown,
  releaseDown,
  pressLeft,
  releaseLeft,
  pressRight,
  releaseRight,
  updateThrust,
} from './actions';

class Keys {
  down(event, store) {
    switch (event.code) {
      case 'ArrowUp':
        // store.dispatch(pressUp());
        store.dispatch(updateThrust(true));
        break;

      case 'ArrowDown':
        store.dispatch(pressDown());
        break;

      case 'ArrowLeft':
        store.dispatch(pressLeft());
        break;

      case 'ArrowRight':
        store.dispatch(pressRight());
        break;

      default:
    }
  }

  up(event, store) {
    switch (event.code) {
      case 'ArrowUp':
        // store.dispatch(releaseUp());
        store.dispatch(updateThrust(false));
        break;

      case 'ArrowDown':
        store.dispatch(releaseDown());
        break;

      case 'ArrowLeft':
        store.dispatch(releaseLeft());
        break;

      case 'ArrowRight':
        store.dispatch(releaseRight());
        break;

      default:
    }
  }
}

export default Keys;
