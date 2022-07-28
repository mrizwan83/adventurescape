import { fightTiles } from "./data/battle";
import { collisions } from "./data/collisions";
import Sprite from "./scripts/sprite";
import Boundary from "./scripts/boundary";
import Zone from "./scripts/zone";
import { attacks } from "./data/attacks";
import Fighter from "./scripts/fighter";
import { audio } from "./data/audio";
import Game from "./scripts/game";





const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const fw = document.querySelector('#fw')
const b2 = document.querySelector('#b2')

canvas.width = 1024;
canvas.height = 576;


window.addEventListener('DOMContentLoaded', (event) => {
    


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
    const animationID = window.requestAnimationFrame(animate);
    document.querySelector('#ui').style.display = 'none';
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

    // gsap.to('#attacksection', {
    //     opacity: 0
    // })
    // gsap.to('#healthsection', {
    //     opacity: 0
    // })
    // gsap.to('#healthsectionE', {
    //     opacity: 0
    // })

    
    
    let moving = true;
    hero.moving = false;
    //lets try battlezone activation
    if (fight.started) return
    else {
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
          //deactivate animation loop
          window.cancelAnimationFrame(animationID);
        //   fight.started = true;
            gsap.to('#attacksection', {
                opacity: 1
            })
            gsap.to('#healthsection', {
                opacity: 1
            })
            gsap.to('#healthsectionE', {
                opacity: 1
            })
          gsap.to('#canvasdiv', {
            opacity: 1,
            repeat: 4,
            yoyo: true,
            duration: 0.5,
            onComplete() {
                gsap.to('#canvasdiv', {
                    opacity: 1,
                    duration: 0.5,
                    onComplete() {
                        renderFight();
                        document.querySelector('#ui').style.display = 'block';
                        gsap.to('#canvasdiv', {
                            opacity: 0,
                            duration: 0.4
                        })
                    }
                })
                //start fight animation loop
            }
        });
            fight.started = true;
          break;
        }
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
                moving = false;
                break
            }
        }
        if (moving)
        movables.forEach(movable => {
            movable.position.x += 3
        })
    }
    else if (keys.d.pressed && lastKey === 'd' && !fight.started) {
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

// animate();
    const fightBackgroundImage = new Image();
    fightBackgroundImage.src = 'wireframes\\woods.png'

    const hero1Image = new Image();
    hero1Image.src = 'wireframes\\andagain.png'

    const warriorImage = new Image();
    warriorImage.src = 'wireframes\\warriortry1.png'

    const fightBackground = new Sprite({
        position: {
            x: 0,
            y: 0
        },
        image: fightBackgroundImage
    });

    const hero1 = new Fighter({
        position: {
            x: 280,
            y: 325
        },
        image: hero1Image,
        frames: {
            max: 8,
        },
        moving: true,
        name: 'You'
    });

    const warrior = new Fighter({
        position: {
            x: 480,
            y: 260
        },
        image: warriorImage,
        frames: {
            max: 10,
        },
        moving: true,
        isTarget: true,
        name: 'Green Warrior'
    })

    let sceneover = false;

    function renderFight() {
        let fightAnimationId = window.requestAnimationFrame(renderFight);
        fightBackground.draw();
        hero1.draw();
        warrior.draw();
        // document.querySelector('#ui').style.display = 'block';
        // document.querySelector('#healthbargreen').style.width = '100%';
        // document.querySelector('#healthbargreenE').style.display = '100%';
        // document.querySelector('#dialogue').innerHTML = '';
        if (sceneover) {
            window.cancelAnimationFrame(fightAnimationId);
            animate();
        }

    }
    // ///testing
    // renderFight();
    animate();

    // document.querySelector('#ui').getElementsByClassName.display = none;
    // if (sceneover) {
    //     animate();
    // }
   


    const queue = [attacks.BodySlam, attacks.Poison];


    document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', (e) => {
            const chosenAttack = attacks[e.currentTarget.innerHTML];
            hero1.attack({
                attack: chosenAttack,
                receiver: warrior
            })
      
            setTimeout(()=> {
                warrior.attack({
                    attack: queue[Math.floor(Math.random()*2)],
                    receiver: hero1
                })
            }, 1500);
 

            if (hero1.health <= 0) {
                document.getElementById("dialogue").innerHTML = `${hero1.name} lost!`;
                setTimeout(()=> {gsap.to(hero1.position, {
                    y: hero1.position.y + 20
                })}, 1500)
                setTimeout(()=> { gsap.to(hero1, {
                    opacity: 0
                })}, 1500)
        
            }

            if (warrior.health <= 0) {
                document.getElementById("dialogue").innerHTML = `${warrior.name} lost!`;
                setTimeout(() => {
                    gsap.to(warrior.position, {
                        y: warrior.position.y + 20
                    })
                }, 1500)
                setTimeout(() => {
                    gsap.to(warrior, {
                        opacity: 0
                    })
                }, 1500)
         
                setTimeout(()=> {gsap.to('#canvasdiv', {
                    opacity: 1,
                    onComplete: ()=> {
                        sceneover = true
                        gsap.to('#canvasdiv', {
                            opacity: 0
                        })
                        fight.started = false
                        gsap.to('#attacksection', {
                            opacity: 0
                        })
                        gsap.to('#healthsection', {
                            opacity: 0
                        })
                        gsap.to('#healthsectionE', {
                            opacity: 0
                        })
                        document.querySelector('#healthbargreen').style.width = '100%';
                        document.querySelector('#healthbargreenE').style.display = '100%';
                        document.querySelector('#dialogue').innerHTML = '';
                        // window.cancelAnimationFrame(fightAnimationId)
                    }
                })}, 2500)
            }
        })
    })

  

    // if (hero1.health <= 0) {
    //     lose();
    
    // }

    // if (warrior.health <= 0) {
    //     lose();
     
    // }



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

let played = false;

    // function handlemusic() {
    //     if (played && fight.started) {
    //         fw.pause();
    //         b2.play();
    //     } else if (played && !fight.started) {
    //         b2.pause();
    //         fw.play();
    //     }
    // }
    

    
    const soundbutton = document.querySelector('#playsound')
    soundbutton.addEventListener('click', (e)=> {
        if (!played && !fight.started) {
        fw.play();
        played = true;
        } else if (!played && fight.started) {
            b2.play();
            played = true
        } else if (played && fight.started) {
            b2.pause();
            played = false;
        }
        else {
            fw.pause();
            played = false;
        }
    })

    

});