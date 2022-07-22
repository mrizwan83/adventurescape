const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

class Sprite {
  constructor({position, velocity}) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.lastKey
  }

  draw() {
    c.fillStyle = 'blue';
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }


  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }


}

const player = new Sprite({
  position: {
  x: 100,
  y: 100
  },
  velocity: {
    x: 0,
    y: 10
  }
});

const npc = new Sprite({
  position: {
    x: 850,
    y: 100
  },
  velocity: {
    x: 0,
    y: 10
  }
});


console.log(player);

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  w: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}

let lastKey;

console.log(npc);


function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  npc.update();

  player.velocity.x = 0;
  npc.velocity.x = 0;
  if (keys.a.pressed && lastKey === 'a') {
    player.velocity.x = -1;
  } else if (keys.d.pressed && lastKey === 'd') {
    player.velocity.x = 1;
  }
  ///npc movement
  if (keys.ArrowLeft.pressed && npc.lastKey === 'ArrowLeft') {
    npc.velocity.x = -1;
  } else if (keys.ArrowRight.pressed && npc.lastKey === 'ArrowRight') {
    npc.velocity.x = 1;
  }
}


animate();


// const npc = new Sprite({
//   position: {
//     x: 400,
//     y: 100
//   },
//   velocity: {
//     x: 0,
//     y: 0
//   }
// });
// player.draw();
// console.log(player);


// function render() {
//   window.requestAnimationFrame(render);
//   c.fillStyle = 'black';
//   c.fillRect(0, 0, canvas.width, canvas.height)
//   player.update();
//   npc.update();

//   player.velocity.x = 0;
//   npc.velocity.x = 0;

//   if (keys.a.pressed && player.lastKey === 'a') {
//     player.velocity.x = -5;
//   } else if (keys.d.pressed && player.lastKey === 'd') {
//     player.velocity.x = 1;
//   }

//   if (keys.ArrowLeft.pressed && npc.lastKey === 'ArrowLeft') {
//     player.velocity.x = -1;
//   } else if (keys.ArrowRight.pressed && npc.lastKey === 'ArrowRight') {
//     player.velocity.x = 1;
//   }
// }

// render();

window.addEventListener('keydown', (event) => {
  console.log(event.key);
  switch (event.key) {
    case ('d'):
      // player.velocity.x = 1;
      keys.d.pressed = true;
      lastKey = 'd'
      // player.lastKey = 'd';
      break
    case ('a'):
      // player.velocity.x = -1;
      keys.a.pressed = true;
      lastKey = 'a'
      // player.lastKey = 'd';
      break
    case ('w'):
      player.velocity.y = -10;
      break

    case ('ArrowRight'):
      // player.velocity.x = 1;
      keys.ArrowRight.pressed = true;
      npc.lastKey = 'ArrowRight'
      // player.lastKey = 'd';
      break
    case ('ArrowLeft'):
      // player.velocity.x = -1;
      keys.ArrowLeft.pressed = true;
      npc.lastKey = 'ArrowLeft'
      // player.lastKey = 'd';
      break
    case ('ArrowUp'):
      npc.velocity.y = -10;
      break
  }
})

window.addEventListener('keyup', (event) => {
  console.log(event.key);
  switch (event.key) {
    case ('d'):
      // player.velocity.x = 0;
      keys.d.pressed = false;
      // player.lastKey = 'd';
      break
    case ('a'):
      // player.velocity.x = 0;
      keys.a.pressed = false;
      // player.lastKey = 'd';
      break
    

      //npc
    case ('ArrowRight'):
      // player.velocity.x = 0;
      keys.ArrowRight.pressed = false;
      // player.lastKey = 'd';
      break
    case ('ArrowLeft'):
      // player.velocity.x = 0;
      keys.ArrowLeft.pressed = false;
      // player.lastKey = 'd';
      break
  }
})
