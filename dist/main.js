!function(){const e=document.getElementById("scene1");e.getContext("2d"),e.width=1024,e.height=576;const s=[];for(let e=0;e<battleTiles.length;e+=70)s.push(battleTiles.slice(e,e+70));const o=[];for(let e=0;e<collisions.length;e+=70)o.push(collisions.slice(e,e+70));const i=[],n=[],t=-1290,r=-600;o.forEach(((e,s)=>{e.forEach(((e,o)=>{3404===e&&n.push(new Boundary({position:{x:o*Boundary.width+t,y:s*Boundary.height+r}}))}))})),s.forEach(((e,s)=>{e.forEach(((e,o)=>{1738===e&&i.push(new Zone({position:{x:o*Boundary.width+t,y:s*Boundary.height+r}}))}))}));const a=new Image;a.src="wireframes\\map.png";const c=new Image;c.src="wireframes\\foregroundObjects.png";const p=new Image;p.src="wireframes\\herodown.png";const l=new Image;l.src="wireframes\\heroup.png";const g=new Image;g.src="wireframes\\heroleft.png";const d=new Image;d.src="wireframes\\heroright.png";const h=new Sprite({position:{x:e.width/2-16,y:e.height/2-24},image:p,frames:{max:4},sprites:{down:p,up:l,left:g,right:d}});console.log(h);const w=new Sprite({position:{x:t,y:r},image:a}),f=new Sprite({position:{x:t,y:r},image:c}),m={w:{pressed:!1},a:{pressed:!1},s:{pressed:!1},d:{pressed:!1},c:{pressed:!1}},y=[w,...n,f,...i];function x({rectangle1:e,rectangle2:s}){return e.position.x+e.width-8>=s.position.x&&e.position.x<=s.position.x+s.width-10&&e.position.y<=s.position.y+s.height-35&&e.position.y+e.height+4>=s.position.y}!function e(){window.requestAnimationFrame(e),w.draw(),n.forEach((e=>{e.draw()})),i.forEach((e=>{e.draw()})),h.draw(),f.draw();let s=!0;if(h.moving=!1,m.c.pressed&&"c"===u)for(let e=0;e<i.length;e++){const s=i[e];if(x({rectangle1:h,rectangle2:{...s,position:{x:s.position.x,y:s.position.y}}})){console.log("this is temporary placement for my code that will initite fighting scene");break}}if(m.w.pressed&&"w"===u){h.moving=!0,h.image=h.sprites.up;for(let e=0;e<n.length;e++){const o=n[e];if(x({rectangle1:h,rectangle2:{...o,position:{x:o.position.x,y:o.position.y+3}}})){console.log("colliding"),s=!1;break}}s&&y.forEach((e=>{e.position.y+=3}))}else if(m.s.pressed&&"s"===u){h.moving=!0,h.image=h.sprites.down;for(let e=0;e<n.length;e++){const o=n[e];if(x({rectangle1:h,rectangle2:{...o,position:{x:o.position.x,y:o.position.y-3}}})){console.log("colliding"),s=!1;break}}s&&y.forEach((e=>{e.position.y-=3}))}else if(m.a.pressed&&"a"===u){h.moving=!0,h.image=h.sprites.left;for(let e=0;e<n.length;e++){const o=n[e];if(x({rectangle1:h,rectangle2:{...o,position:{x:o.position.x+3,y:o.position.y}}})){console.log("colliding"),s=!1;break}}s&&y.forEach((e=>{e.position.x+=3}))}else if(m.d.pressed&&"d"===u){h.moving=!0,h.image=h.sprites.right;for(let e=0;e<n.length;e++){const o=n[e];if(x({rectangle1:h,rectangle2:{...o,position:{x:o.position.x-3,y:o.position.y}}})){console.log("colliding"),s=!1;break}}s&&y.forEach((e=>{e.position.x-=3}))}}();let u="";window.addEventListener("keydown",(e=>{switch(e.key){case"w":m.w.pressed=!0,u="w";break;case"a":m.a.pressed=!0,u="a";break;case"s":m.s.pressed=!0,u="s";break;case"d":m.d.pressed=!0,u="d";break;case"c":m.c.pressed=!0,u="c"}})),window.addEventListener("keyup",(e=>{switch(e.key){case"w":m.w.pressed=!1;break;case"a":m.a.pressed=!1;break;case"s":m.s.pressed=!1;break;case"d":m.d.pressed=!1;break;case"c":m.c.pressed=!1}}))}();