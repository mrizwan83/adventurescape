const canvas = document.getElementById('scene1');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

//lets try to make battlezones

///
// const canvas2 = document.getElementById('scene2');
// const c2 = canvas2.getContext('2d')
// canvas2.width = 1024;
// canvas2.height = 576;

////

const battleMap = [];
for (let i = 0; i < battleTiles.length; i += 70 ) {
  battleMap.push(battleTiles.slice(i, (i +70)));
}


const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, (i + 70)));
}
const battleZones = [];
const boundaries = [];
const offset = {
    x: -1290,
    y: -600
}

collisionsMap.forEach((row, i) => {
    row.forEach((ele, j) => {
        if (ele === 3404)
        boundaries.push(
        new Boundary({
            position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
        }
    }))
    })
});


battleMap.forEach((row, i) => {
  row.forEach((ele, j) => {
    if (ele === 1738 )
      battleZones.push(
        new Zone({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        }))
  })
})



const worldmap = new Image();
worldmap.src = 'wireframes\\map.png';

const foregroundImage = new Image();
foregroundImage.src = 'wireframes\\foregroundObjects.png';

// const knightImage = new Image ();
// knightImage.src = 'wireframes\\down.png'

const heroDownImage = new Image () ;
heroDownImage.src = 'wireframes\\herodown.png';

const heroUpImage = new Image () ;
heroUpImage.src = 'wireframes\\heroup.png';

const heroLeftImage = new Image () ;
heroLeftImage.src = 'wireframes\\heroleft.png'

const heroRightImage = new Image () ;
heroRightImage.src = 'wireframes\\heroright.png'

const hero = new Sprite({
    position: {
        x: canvas.width / 2 - 128 / 4 / 2,
        y: canvas.height / 2 - 48 / 2,
    },
    image: heroDownImage,
    frames: {
        max: 4
    },
    sprites: {
        down: heroDownImage,
        up: heroUpImage,
        left: heroLeftImage,
        right: heroRightImage
    }
})
console.log(hero)
// const knight = new Sprite({
//     position: {
//         x: canvas.width / 2 - 576 / 9 / 2,
//         y: canvas.height / 2 - 64 / 2,
//     },
//     image: knightImage,
//     frames: {
//         max: 8
//     }
// })

const background = new Sprite({
    position: {
    x: offset.x,
    y: offset.y
    },
    image: worldmap
})

const foreground = new Sprite({
    position: {
    x: offset.x,
    y: offset.y
    },
    image: foregroundImage
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    c: {
        pressed: false
    }
}



const movables = [background, ...boundaries, foreground, ...battleZones];

function rectangularCollision({rectangle1, rectangle2}) {
    return (rectangle1.position.x + rectangle1.width -8 >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width -10 &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height - 35 &&
        rectangle1.position.y + rectangle1.height + 4 >= rectangle2.position.y)
}


function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach(boundary => {
        boundary.draw();
    })
    battleZones.forEach(zone => {
        zone.draw();
    })
    // knight.draw();
    hero.draw();
    foreground.draw();
    
    let moving = true;
    hero.moving = false;
    //lets try battlezone activation
    if (keys.c.pressed && lastKey === 'c') {
      for (let i = 0; i < battleZones.length; i++) {
        const zone = battleZones[i];
        if (rectangularCollision({
          rectangle1: hero,
          rectangle2: {...zone, position : {
            x: zone.position.x,
            y: zone.position.y
          }}
        })) {
          console.log("this is temporary placement for my code that will initite fighting scene")
          break;
        }
    }
  }

    if (keys.w.pressed && lastKey === 'w') {
        hero.moving = true;
        hero.image = hero.sprites.up;

        for (let i =0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({
                    rectangle1: hero,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }}
                })) {
                console.log("colliding")
                moving = false;
                break
            }
        }
        if (moving)
        movables.forEach(movable => {
            movable.position.y += 3
        })
    }
    else if (keys.s.pressed && lastKey === 's') {
        hero.moving = true;
        hero.image = hero.sprites.down;

        for (let i =0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({
                    rectangle1: hero,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }}
                })) {
                console.log("colliding")
                moving = false;
                break
            }
        }
        if (moving)
        movables.forEach(movable => {
            movable.position.y -= 3
        })
    }
    else if (keys.a.pressed && lastKey === 'a') {
        hero.moving = true;
        hero.image = hero.sprites.left;

        for (let i =0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({
                    rectangle1: hero,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }}
                })) {
                console.log("colliding")
                moving = false;
                break
            }
        }
        if (moving)
        movables.forEach(movable => {
            movable.position.x += 3
        })
    }
    else if (keys.d.pressed && lastKey === 'd') {
        hero.moving = true;
        hero.image = hero.sprites.right;

        for (let i =0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({
                    rectangle1: hero,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y 
                    }}
                })) {
                console.log("colliding")
                moving = false;
                break
            }
        }
        if (moving)
        movables.forEach(movable => {
            movable.position.x -= 3
        })
    }
}

animate();

let lastKey = '';
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            break
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break
        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            break
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break
        case 'c':
            keys.c.pressed = true;
            lastKey = 'c';
            break
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false;
            break
        case 'a':
            keys.a.pressed = false;
            break
        case 's':
            keys.s.pressed = false;
            break
        case 'd':
            keys.d.pressed = false;
            break
        case 'c':
        keys.c.pressed = false;
        break
    }
});











// const gravity = 0.7;

// class Sprite1 {
//   constructor({position, velocity}) {
//     this.position = position;
//     this.velocity = velocity;
//     this.height = 150;
//     this.lastKey
//   }

//   draw() {
//     c2.fillStyle = 'blue';
//     c2.fillRect(this.position.x, this.position.y, 50, this.height);
//   }


//   update() {
//     this.draw();
//     this.position.x += this.velocity.x;
//     this.position.y += this.velocity.y;

//     if (this.position.y + this.height + this.velocity.y >= canvas.height) {
//       this.velocity.y = 0;
//     } else {
//       this.velocity.y += gravity;
//     }
//   }
// }

// const player = new Sprite1({
//   position: {
//   x: 100,
//   y: 100
//   },
//   velocity: {
//     x: 0,
//     y: 10
//   }
// });

// const npc = new Sprite1({
//   position: {
//     x: 850,
//     y: 100
//   },
//   velocity: {
//     x: 0,
//     y: 10
//   }
// });


// console.log(player);

// const keys2 = {
//   a: {
//     pressed: false
//   },
//   d: {
//     pressed: false
//   },
//   w: {
//     pressed: false
//   },
//   ArrowRight: {
//     pressed: false
//   },
//   ArrowLeft: {
//     pressed: false
//   }
// }

// let lastKey2;

// console.log(npc);


// function animate2() {
//   window.requestAnimationFrame(animate2);
//   c2.fillStyle = 'black';
//   c2.fillRect(0, 0, canvas2.width, canvas2.height);
//   player.update();
//   npc.update();

//   player.velocity.x = 0;
//   npc.velocity.x = 0;
//   if (keys2.a.pressed && lastKey === 'a') {
//     player.velocity.x = -1;
//   } else if (keys2.d.pressed && lastKey === 'd') {
//     player.velocity.x = 1;
//   }
//   ///npc movement
//   if (keys2.ArrowLeft.pressed && npc.lastKey === 'ArrowLeft') {
//     npc.velocity.x = -1;
//   } else if (keys2.ArrowRight.pressed && npc.lastKey === 'ArrowRight') {
//     npc.velocity.x = 1;
//   }
// }
// animate2();


// // const npc = new Sprite({
// //   position: {
// //     x: 400,
// //     y: 100
// //   },
// //   velocity: {
// //     x: 0,
// //     y: 0
// //   }
// // });
// // player.draw();
// // console.log(player);


// // function render() {
// //   window.requestAnimationFrame(render);
// //   c.fillStyle = 'black';
// //   c.fillRect(0, 0, canvas.width, canvas.height)
// //   player.update();
// //   npc.update();

// //   player.velocity.x = 0;
// //   npc.velocity.x = 0;

// //   if (keys.a.pressed && player.lastKey === 'a') {
// //     player.velocity.x = -5;
// //   } else if (keys.d.pressed && player.lastKey === 'd') {
// //     player.velocity.x = 1;
// //   }

// //   if (keys.ArrowLeft.pressed && npc.lastKey === 'ArrowLeft') {
// //     player.velocity.x = -1;
// //   } else if (keys.ArrowRight.pressed && npc.lastKey === 'ArrowRight') {
// //     player.velocity.x = 1;
// //   }
// // }

// // // render();

// window.addEventListener('keydown', (event) => {
//   console.log(event.key);
//   switch (event.key) {
//     case ('d'):
//       // player.velocity.x = 1;
//       keys2.d.pressed = true;
//       lastKey2 = 'd'
//       // player.lastKey = 'd';
//       break
//     case ('a'):
//       // player.velocity.x = -1;
//       keys2.a.pressed = true;
//       lastKey2 = 'a'
//       // player.lastKey = 'd';
//       break
//     case ('w'):
//       player.velocity.y = -10;
//       break

//     case ('ArrowRight'):
//       // player.velocity.x = 1;
//       keys2.ArrowRight.pressed = true;
//       npc.lastKey2 = 'ArrowRight'
//       // player.lastKey = 'd';
//       break
//     case ('ArrowLeft'):
//       // player.velocity.x = -1;
//       keys2.ArrowLeft.pressed = true;
//       npc.lastKey2 = 'ArrowLeft'
//       // player.lastKey = 'd';
//       break
//     case ('ArrowUp'):
//       npc.velocity.y = -10;
//       break
//   }
// })

// window.addEventListener('keyup', (event) => {
//   console.log(event.key);
//   switch (event.key) {
//     case ('d'):
//       // player.velocity.x = 0;
//       keys2.d.pressed = false;
//       // player.lastKey = 'd';
//       break
//     case ('a'):
//       // player.velocity.x = 0;
//       keys2.a.pressed = false;
//       // player.lastKey = 'd';
//       break
    

//       //npc
//     case ('ArrowRight'):
//       // player.velocity.x = 0;
//       keys2.ArrowRight.pressed = false;
//       // player.lastKey = 'd';
//       break
//     case ('ArrowLeft'):
//       // player.velocity.x = 0;
//       keys2.ArrowLeft.pressed = false;
//       // player.lastKey = 'd';
//       break
//   }
// })
