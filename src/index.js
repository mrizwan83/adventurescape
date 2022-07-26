import { fightTiles } from "./data/battle";
import { collisions } from "./data/collisions";
import Sprite from "./scripts/sprite";
import Boundary from "./scripts/boundary";
import Zone from "./scripts/zone";
import { attacks } from "./data/attacks";
import Fighter from "./scripts/fighter";






const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const fw = document.querySelector('#fw')
const b2 = document.querySelector('#b2')

canvas.width = 1024;
canvas.height = 576;


window.addEventListener('DOMContentLoaded', (event) => {

let welcome = document.getElementById('welcome-screen')
welcome.addEventListener('click', () => {
    document.querySelector('#welcome-screen').style.display = 'none';
    document.querySelector('#ingame').style.display = 'block';
})
    



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
    document.querySelector("#killcount").style.display = 'flex';
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
    if (killcount > 3) {
        window.cancelAnimationFrame(animationID);
        document.querySelector('#winner').style.display = 'flex';
        document.querySelector('#restart').addEventListener('click', () => {
            killcount = 0;
            document.getElementById("kc").innerHTML = killcount;
            document.querySelector('#winner').style.display = 'none';
            animate();
        })
        
    }
    
  
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

    const warrior2Image = new Image();
    warrior2Image.src = 'wireframes/bki.png'

    const warrior3Image = new Image();
    warrior3Image.src = 'wireframes/bodidle.png'

    const warrior4Image = new Image();
    warrior4Image.src = 'wireframes/wizardidle.png'

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
    });

    const warrior2 = new Fighter({
        position: {
            x: 480,
            y: 278
        },
        image: warrior2Image,
        frames: {
            max: 10,
        },
        moving: true,
        isTarget: true,
        name: 'Dark Knight'
    });

    const warrior3 = new Fighter({
        position: {
            x: 480,
            y: 305
        },
        image: warrior3Image,
        frames: {
            max: 8,
        },
        moving: true,
        isTarget: true,
        name: 'Bringer of Death'
    });

    const warrior4 = new Fighter({
        position: {
            x: 480,
            y: 305
        },
        image: warrior4Image,
        frames: {
            max: 6,
        },
        moving: true,
        isTarget: true,
        name: 'Dark Mage'
    });

    let killcount = 0;
    let i = 0;
    let sceneover = false;
    let warriors = [warrior, warrior2, warrior3, warrior4];
    let opponent = warriors[0]
    function renderFight() {
        document.querySelector("#killcount").style.display = 'none'
        let fightAnimationId = window.requestAnimationFrame(renderFight);
        fightBackground.draw();
        hero1.draw();
        warriors[0].draw();
        document.querySelector('#ui').style.display = 'block';
        if (sceneover) {
            window.cancelAnimationFrame(fightAnimationId);
            document.querySelector('#healthbargreen').style.width = '100%';
            document.querySelector('#healthbargreenE').style.width = '100%';
            fight.started = false;
            sceneover = false;
            animate();
            hero1.health = 100;
            warrior.health = 100;
            warrior2.health = 100;
            warrior3.health = 100;
            warrior4.health = 100;
            warriors.push(warriors.shift())
            opponent = warriors[0]
        }

    }

    animate();


    const queue = [attacks.BodySlam, attacks.Poison, attacks.Stomp];
    let chosenAttack = null;
    let before = new Date().getTime();


   




    function first(e) {
        chosenAttack = attacks[e.currentTarget.innerHTML];
        const curr = new Date().getTime();
        if (curr - before > 1600) {
            if (hero1.health > 0) {
                hero1.attack({
                   attack: chosenAttack,
                   receiver: opponent
               })
           }
          
          
     
           if (opponent.health > 0) {
              setTimeout(()=> {
                warriors[0].attack({
                   attack: queue[Math.floor(Math.random()*3)],
                   receiver: hero1
               })
           }, 1000);
            setTimeout(()=> {
                if (hero1.health <= 0) {
                    document.getElementById("dialogue").innerHTML = `${hero1.name} lost!`;
                    killcount -= 1;
                    document.getElementById("kc").innerHTML = killcount;
                    setTimeout(()=> {gsap.to(hero1.position, {
                        y: hero1.position.y + 20
                    })}, 1500)
                    setTimeout(()=> { gsap.to(hero1, {
                        opacity: 0
                    })}, 1500)
                    
        
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
                            document.querySelector('#healthbargreenE').style.width = '100%';
                            document.querySelector('#dialogue').innerHTML = '';
                            gsap.to(hero1.position, {
                                y: hero1.position.y - 20})
                                gsap.to(hero1, {
                                    opacity: 1
                                })
                        }
                    })}, 2500)
                    
            
                }
           }, 1200);
           }
        }
       before = curr;
         if (opponent.health <= 0) {
            document.getElementById("dialogue").innerHTML = `${opponent.name} lost!`;
            killcount += 1;
            document.getElementById("kc").innerHTML = killcount;
            setTimeout(() => {
                gsap.to(opponent.position, {
                    y: opponent.position.y + 20
                })
            }, 1500)
            setTimeout(() => {
                gsap.to(opponent, {
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
                    document.querySelector('#healthbargreenE').style.width = '100%';
                    document.querySelector('#dialogue').innerHTML = '';
                    gsap.to(opponent.position, {
                        y: opponent.position.y - 20})
                        gsap.to(opponent, {
                            opacity: 1
                        })
                }
            })}, 2500)
        }
    }


    document.querySelectorAll('button').forEach((button) => {
            button.addEventListener('click', first)
    })


    
  

 


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
let b2played = false
    

    
    const soundbutton = document.querySelector('#playsound')
    soundbutton.addEventListener('click', (e)=> {
        if ((played === false) && (fight.started === false)) {
        fw.play();
        played = true;
        } else if ((played === false) && (fight.started === true)) {
            b2.play();
            played = true
        } 
        else {
            fw.pause();
            b2.pause();
            played = false;
        }
    })

    

});