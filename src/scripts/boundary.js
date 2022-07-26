const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
export default class Boundary {
  static width = 36;
  static height = 36;
  constructor({ position, ctx }) {
    this.position = position;
    this.width = 36;
    this.height = 36;
    this.ctx = ctx;
  }

  draw() {
    // c.fillStyle = 'green';
    ctx.fillStyle = 'rgba(255, 0, 0, 0.0)'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
