// sketch.js - Bouncing Ball hits drums and makes sounds
// Author: Hitesh Ahuja, Johnny Wong
// Date:2/4/2023


// bouncing ball code inspired from https://github.com/pselodux/Bounce/blob/master/bounce.js

// image interaction inspired from https://editor.p5js.org/wmodes/sketches/xTft1pelA

// audio interaction inspired from https://openprocessing.org/sketch/611472 

// drum sfx from https://www.fesliyanstudios.com/royalty-free-sound-effects-download/bass-drum-274

let balls = [];
let lines = [];
let guns = [];
let buttons = [];
let ballSize = 15;
let lineWidth = 10;
let timerAmount = 0.25;
let inertia = 1; // make this less than 1 for a ball that gradually slows down
let bgravity = 0.05;
let lineWasHit = false;
let onLinePoint = true;
let onMenu = false;
let menuButtonDown = false;
let preparingBall = false;
let adjustingGun = false;
let adjustingStretch = false;
let dragTimer;
let dragTimerAmount = 0.5;
let pointNum;
let target;

let maxBalls = 15;
let ballFreq = 5;

let autoBall = false;

let firstMousePos;
let stretchPos;

let bkCol;
let lineCol;
let ballCol;


var bass1;
var bass2;
var bass3;
var bass4;
var bass5;
var bass6;
var bass7;
var bass8;
var bass9;
var bass10;
var bass11;
var bass12;


function preload() {
  spritesheet = loadImage('redball2.png');
  for (var i=0;i<paintings.length;i++){
    paintings[i].image = loadImage(paintings[i].file);
  }

  bass1 = loadSound('Bass1.mp3');
  bass2 = loadSound('Bass2.mp3');
  bass3 = loadSound('Bass3.mp3');
  bass4 = loadSound('Bass4.mp3');
  bass5 = loadSound('Bass5.mp3');
  bass6 = loadSound('Bass6.mp3');
  bass7 = loadSound('Bass7.mp3');
  bass8 = loadSound('Bass8.mp3');
  bass9 = loadSound('Bass9.mp3');
  bass10 = loadSound('Bass10.mp3');
  bass11 = loadSound('Bass11.mp3');
  bass12 = loadSound('Bass12.mp3');

}


function setup() {
  createCanvas(998, 1000);

  bkCol = color('#bbbb77')
  lineCol = color('#eecc88');
  ballCol = color('#ffeebb');

  let l1s = [338, 694, 116, 411, 570, 932];
  let l2s = [158, 253, 553, 769, 818, 756];


  for (let i = 0; i < 6; i+=2) {
    
    let l1 = createVector(l1s[i],l2s[i]);
    let l2 = createVector(l1s[i+1],l2s[i+1]);

    let newLine = new bounceLine(l1, l2);
    lines.push(newLine);
  }


  // painting
  gravity = createVector(0, 0.3);
  for (let x = 0; x < spritesheet.width; x += 32) {
    for (let y = 0; y < spritesheet.height; y += 32) {
      let img = spritesheet.get(x, y, 32, 32);
      image(img, x, y);
      textures.push(img);
    }
  }
  
  pIndex = 0;
  setupPaintingAndSnow(pIndex);

}

// =====================


function mousePressed() {
  if (!onLinePoint) {
    firstMousePos = createVector(mouseX, mouseY);
  }
}

function mouseReleased() {
  preparingBall = false;
  if (!onLinePoint && !adjustingGun && !adjustingStretch && !onMenu) {
    let stretchVector = stretchPos.sub(firstMousePos);
    let index = balls.length;
    let gen = new ball(firstMousePos, stretchVector, index);
    balls.push(gen);
  }
}

//===============



// ===== BALLZ =====

class ball {
  constructor(bp1, stretch, index) {
    this.p1 = bp1;
    this.speed = 1;
    this.ballVel = createVector(0, 0, 0);
    this.ballVel.sub(stretch.mult(0.1));
    this.hasBounced = false;
    this.timer = timerAmount;
    this.index = index;
  }

  move() {

    this.p1.add(this.ballVel);
    this.ballVel.add(0, bgravity, 0);

    this.incidence = p5.Vector.mult(this.ballVel, inertia * -1);
    // this.incidence.normalize();

    //detect line
    for (let i = 0; i < lines.length; i++) {
      if (this.p1.dist(lines[i].p1) + this.p1.dist(lines[i].p2) <= lines[i].p1.dist(lines[i].p2) + 0.35 && !this.hasBounced) {
        this.linePos = this.p1.dist(lines[i].p2);
        this.maxPos = lines[i].p1.dist(lines[i].p2);
        lines[i].hit = true;
        lines[i].timer = 1.0;
        this.note = floor(map(this.linePos, 0, this.maxPos, 0, scale.length));
        
        /////////////////////////////////////////////////
        /////////// playing sound
        // playSound(bass1);
        var sounds = Array(bass1, bass2, bass3, bass4, bass5, bass6, bass7, bass8, bass9, bass10, bass11, bass12);
        var sound = sounds[Math.floor(Math.random()*sounds.length)];
        sound.play();

        this.hasBounced = true;
        // calculate dot product of incident vector and line
        let dot = this.incidence.dot(lines[i].normal);

        // calculate reflection vector
        // assign reflection vector to direction vector
        this.ballVel.set(
          2 * lines[i].normal.x * dot - this.incidence.x,
          2 * lines[i].normal.y * dot - this.incidence.y,
          0
        );

      }
      // run a timer before bounce can happen again
      if (this.hasBounced) {
        this.timer -= 0.01;
        if (this.timer <= 0) {
          this.hasBounced = false;
          this.timer = timerAmount;
        }
      }
    }


    // detect edges of screen (do I want this?)
    if (this.p1.x > 1000) {
      this.p1.x = 1000;
      this.ballVel.x *= inertia * -1;
    }

    if (this.p1.x < 0) {
      this.p1.x = 0;
      this.ballVel.x *= inertia * -1;
    }

    if (this.p1.y > 1000 - ballSize/2) {
      // old code where it bounces off the bottom
      // this.p1.y = 1000;
      this.ballVel.y *= inertia * -1;
      this.ballVel.x *= inertia;

      

    }


    if (balls.length > maxBalls){
      balls.splice(balls[0],1);
      for(let i = balls.length-1; i>= 0; i-- && balls){
        balls[i].index--;
      }
    }

    if (this.p1.y < 0) {
      this.p1.y = 0;
      this.ballVel.y *= inertia * -1;
      this.ballVel.x *= inertia;
    }

  }

  removeBall(){
    let tempIndex = this.index;
    balls.splice(this.index,1);
    for(let i = balls.length-1; i >=tempIndex; i-- && balls){
      balls[i].index--;
    }
  }

  display(num) {
    stroke("limegreen");
    strokeWeight(ballSize);
    strokeCap(ROUND);
    point(this.p1.x, this.p1.y);

    // debug text for ball vector
    // noStroke();
    // fill('black');
    // text(this.ballVel.toString(), 10, 10 + num * 10);
  }
}

// ===== BOUNCY LINES =====

class bounceLine {
  constructor(lp1, lp2) {
    this.p1 = lp1;
    this.p2 = lp2;
    this.hit = false;
    this.timer = 1.0;
  }

  display() {
    
      stroke(lineCol);
    
    strokeWeight(0);
    strokeCap(ROUND);
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);

    this.lineDelta = p5.Vector.sub(this.p2, this.p1);
    this.lineDelta.normalize();
    this.normal = createVector(-this.lineDelta.y, this.lineDelta.x);
    this.intercept = p5.Vector.dot(this.p1, this.normal);

    if (!mouseIsPressed){
      onLinePoint = false;
      pointNum = 0;
    }

    if(pointNum == 1 && mouseIsPressed && !preparingBall && !onMenu){
      target.p1.x = mouseX;
      target.p1.y = mouseY;
      if (target.p1.y >= 1000 - 80 - ballSize/2){
        target.p1.y = 1000 - 80 - ballSize/2;
      }
    } else if (pointNum == 2 && mouseIsPressed && !preparingBall && !onMenu){
      target.p2.x = mouseX;
      target.p2.y = mouseY;
      if (target.p2.y >= 1000 - 80 - ballSize/2){
        target.p2.y = 1000 - 80 - ballSize/2;
      }
    }

  }

}




let snow;
let gravity;
let pIndex;

let zOff = 0;

let spritesheet;
let textures = [];
let piles;

let paintings = [
  {
    painting: "The Son of Man",
    artist: "René Magritte",
    file: "drums.png",
    image: null,
    surfaces: [
      // hat
      [[334,120,50],[410,118,45]],
      [[323,129,45],[421,130,40]],
      [[292,202,40],[460,203,35]],
      // shoulders
      [[204,401,40],[309,359,50]],
      [[437,359,40], [547,406,50]],
      // wall left
      [[1,810,50],[172,811,65]],
      [[1,800,65],[172,801,70]],
      [[1,790,70],[172,791,75]],
      // wall right
      [[581,810,50],[759,811,65]],
      [[581,800,65],[759,801,70]],
      [[581,790,70],[759,791,75]],
    ]
  }
]



function setupPaintingAndSnow(pIndex) {
  createCanvas(paintings[pIndex].image.width, paintings[pIndex].image.height);
  
  snow = [];
  piles = [];
  for (let i = 0; i < 600; i++) {
    let x = random(width);
    let y = random(height);
    let design = random(textures);
    snow.push(new Snowflake(design, paintings[pIndex].surfaces));
  }
}

function draw() {
  background(0);
  image(paintings[pIndex].image, 0, 0);
  
  zOff += 0.1;

//   for (flake of piles) {
//     // noStroke();
//     // fill(color("rgba(255,255,255,1)"));
//     // ellipse(flake.x, flake.y, flake.r * 0.75   
//     push();
//     translate(flake.x, flake.y);
//     imageMode(CENTER);
//     image(flake.img, 0, 0, flake.r, flake.r);
//     pop();
//   }
//   for (flake of snow) {
//     let xOff = flake.pos.x / width;
//     let yOff = flake.pos.y / height;
//     let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
//     let wind = p5.Vector.fromAngle(wAngle);
//     wind.mult(0.1);

//     flake.applyForce(gravity);
//     flake.applyForce(wind);
//     flake.update();
//     flake.render();
//   }




    // background(220);

    // draw lines from line class
    for (let i = 0; i < lines.length; i++) {
        lines[i].display();
    }

    // draw balls from ball class
    for (let i = 0; i < balls.length; i++) {
        balls[i].display(i);
        balls[i].move();
    }



    if (mouseIsPressed && !onLinePoint && !adjustingGun && !adjustingStretch && !onMenu ) {
        stroke(ballCol);
        strokeWeight(ballSize);
        strokeCap(ROUND);
        point(firstMousePos.x, firstMousePos.y);
        stretchPos = createVector(mouseX, mouseY);
        stroke(ballCol);
        strokeWeight(2);
        strokeCap(SQUARE);
        line(stretchPos.x, stretchPos.y, firstMousePos.x, firstMousePos.y);
        preparingBall = true;
    }
  


}


function createPt(x, y, z) {
  return { x: x, y: y, z: z };
}