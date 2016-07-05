import game from './src/game';
import Hero from './src/hero';

import './assets/css/game.scss';

game.init();

const hero = new Hero({
  src: './assets/img/speedway_bike.png',
});

hero.load();
game.hero = hero;


// game.animate();
