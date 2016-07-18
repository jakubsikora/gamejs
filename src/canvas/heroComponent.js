import Component from './component';

class HeroComponent extends Component {
  render(state) {
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
    this.renderHeroDebug(state);
  }

  renderHeroDebug(state) {
    function canvasArrow(context, fromx, fromy, tox, toy) {
      const headlen = 10;   // length of head in pixels
      const angle = Math.atan2(toy - fromy, tox - fromx);

      context.moveTo(fromx, fromy);
      context.lineTo(tox, toy);
      context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
      context.moveTo(tox, toy);
      context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    }

    const cx = state.hero.position[0] + (state.hero.size[0] / 2);
    const cy = state.hero.position[1] + (state.hero.size[1] / 2);

    const x = cx + state.hero.velocity[0] * 20;
    const y = cy + state.hero.velocity[1] * 20;

    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#6aff00';

    canvasArrow(this.ctx, cx, cy, x, y);

    this.ctx.stroke();
  }
}

export default HeroComponent;
