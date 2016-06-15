import game from './src/game';
import Hero from './src/hero';

const hero = new Hero({
  src: './assets/img/speedway_bike.png',
});

hero.load();

game.init(800, 500);
game.animate();
