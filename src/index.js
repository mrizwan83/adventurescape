import { fightTiles } from "./data/battle";
import { collisions } from "./data/collisions";
import Sprite from "./scripts/sprite";
import Boundary from "./scripts/boundary";
import Zone from "./scripts/zone";
import Game from "./scripts/game";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;


// all the tiles where we can activate a fight/battle
const battleMap = [];
for (let i = 0; i < fightTiles.length; i += 70 ) {
  battleMap.push(fightTiles.slice(i, (i +70)));
}

// all the tiles where we shouldnt be able to move past
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, (i + 70)));
}
const battleZones = [];
const boundaries = [];

// offset for worldmap image and collsions and battlezones 
const offset = {
    x: -1270,
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
worldmap.src = 'wireframes/mapredo.png';

const foregroundImage = new Image();
foregroundImage.src = 'wireframes/foreg.png';

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

const fight = {
  started: false
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
   
        if (keys.c.pressed && lastKey === 'c' && !fight.started) {
      for (let i = 0; i < battleZones.length; i++) {
        const zone = battleZones[i];
        if (rectangularCollision({
          rectangle1: hero,
          rectangle2: {...zone, position : {
            x: zone.position.x,
            y: zone.position.y
          }}
        })) {
          console.log("activate fight")
          fight.started = true
          break;
        }
    }
  }


    if (keys.w.pressed && lastKey === 'w' && !fight.started) {
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
    else if (keys.s.pressed && lastKey === 's' && !fight.started) {
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
    else if (keys.a.pressed && lastKey === 'a' && !fight.started) {
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
