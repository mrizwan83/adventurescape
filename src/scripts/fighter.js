import Sprite from "./sprite";

export default class Fighter extends Sprite {

  constructor({ position, image, frames = { max: 1 }, sprites, ctx, moving = false, isTarget = false, name }) {
    super({
      position,
      image,
      frames,
      sprites,
      ctx,
      moving
    })
    this.isTarget = isTarget;
    this.name = name;
    this.health = 100;
  }




  attack({ attack, receiver }) {
    document.querySelector('#dialogue').style.display = 'block'
    document.querySelector('#dialogue').innerHTML = `${this.name} chose ${attack.name}`
    let healthBar = '#healthbargreenE';
    if (this.isTarget) healthBar = '#healthbargreen';

    receiver.health -= attack.damage
    switch (attack.name) {
      case 'Poison':
        const timeline1 = gsap.timeline();

        let change1 = 0;
        if (this.isTarget) change1 = 0;

        timeline1.to(this.position, {
          y: this.position.y - change1
        }).to(this.position, {
          y: this.position.y + change1 * 4,
          duration: 0.1,
          onComplete: () => {
            gsap.to(healthBar, {
              width: receiver.health + '%'
            })
            gsap.to(receiver.position, {
              y: receiver.position.y + 10,
              yoyo: true,
              repeat: 7,
              duration: 0.05,
            })
            gsap.to(receiver, {
              opacity: 0,
              repeat: 7,
              yoyo: true,
              duration: 0.05
            })
          }
        }).to(this.position, {
          y: this.position.y
        })
        break
        case 'Stomp':
          const timeline2 = gsap.timeline();
  
          let change2 = 5;
          if (this.isTarget) change2 = 5;
  
          timeline2.to(this.position, {
            y: this.position.y - change2
          }).to(this.position, {
            y: this.position.y + change2 * 4,
            duration: 0.1,
            onComplete: () => {
              gsap.to(healthBar, {
                width: receiver.health + '%'
              })
              gsap.to(receiver.position, {
                y: receiver.position.y + 10,
                yoyo: true,
                repeat: 7,
                duration: 0.05,
              })
              gsap.to(receiver, {
                opacity: 0,
                repeat: 7,
                yoyo: true,
                duration: 0.05
              })
            }
          }).to(this.position, {
            y: this.position.y
          })
          break
      case 'BodySlam':
        const timeline = gsap.timeline();

        let change = 25;
        if (this.isTarget) change = -25;

        timeline.to(this.position, {
          x: this.position.x - change
        }).to(this.position, {
          x: this.position.x + change * 4,
          duration: 0.1,
          onComplete: () => {
            gsap.to(healthBar, {
              width: receiver.health + '%'
            })
            gsap.to(receiver.position, {
              x: receiver.position.x + 10,
              yoyo: true,
              repeat: 7,
              duration: 0.05,
            })
            gsap.to(receiver, {
              opacity: 0,
              repeat: 7,
              yoyo: true,
              duration: 0.05
            })
          }
        }).to(this.position, {
          x: this.position.x
        })
        break;
    }
  }

  // lose() {
  //   document.querySelector("dialogue").innerHTML = this
  // }

   // switchHBar()=> {
  //   if (healthBar === '#healthbargreenE') {
  //     healthBar = '#healthbargreen'
  //   } else {
  //     healthBar = '#healthbargreenE'
  //   }
  // }
}