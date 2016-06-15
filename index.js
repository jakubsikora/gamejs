import game from './src/game';
import Hero from './src/hero';
import { createStore } from 'redux';
import { keys } from './src/reducers';
import { pressUp } from './src/actions';

const hero = new Hero({
  src: './assets/img/speedway_bike.png',
});

hero.load();

game.init(800, 500);
game.hero = hero;

const store = createStore(keys);
const updateGame = () => {
  game.update(store.getState());
};

store.subscribe(updateGame);
updateGame();

store.dispatch(pressUp());
store.dispatch(pressUp());


// game.animate();
