// Legends Never Die
// By: Hitesh Ahuja, Johnny Wong

// Used P_3_2_2_01 by generative design as jumping off point and inspiration
// (https://editor.p5js.org/generative-design/sketches/P_3_2_2_01)

// Used Confetti by FugQueue as reference for the confetti effect
// (https://editor.p5js.org/FugQueue/sketches/saW0wiHMy)

/**
 * fontgenerator with dynamic elements
 *
 * MOUSE
 * position x          : curve rotation
 * position y          : curve height
 *
 * KEYS
 * a-z                 : text input (keyboard)
 * del, backspace      : remove last letter
 * alt                 : toggle fill style
 * ctrl                : save png
 */

var textTyped = 'Kobe Bryant';

var font;

var filled = false;

let confetti = [];

function setup() {
  intersect = false;
  timer = 10;
  createCanvas(windowWidth, windowHeight);
  noLoop();

  opentype.load('js/FreeSans.otf', function(err, f) {
    if (err) {
      print(err);
    } else {
      font = f;
      loop();
    }
  });
}

function draw() {
  if (!font) return;

  background(36,36,36);
  
  //////////////////
  // White Border //
  //////////////////

  let time_ct = frameCount/60;

  for (let i = 0; i < random(10); i++){
    confetti.push(new Confetti());
  }

  if (intersect == true){
    for (let i of confetti) {
        i.update(time_ct);
        i.display(); 
    }
  }

  if (filled) {
    noStroke();
    fill(0);
  } else {
    noFill();
    stroke(255);
    strokeWeight(20);
  }
  // margin border
  translate(20, 260);


  if (textTyped.length > 0) {
    // get a path from OpenType.js
    var fontPath = font.getPath(textTyped, 0, 0, 200);
    // convert it to a g.Path object
    var path = new g.Path(fontPath.commands);
    // resample it with equidistant points
    path = g.resampleByLength(path, 11);
    // path = g.resampleByAmount(path, 500);

    // map mouse axis
    var addToAngle = map(mouseX, 0, width, -PI, PI);
    var curveHeight = map(mouseY, 0, height, 0.1, 5);

    for (var i = 0; i < path.commands.length - 1; i++) {
      var pnt0 = path.commands[i];
      var pnt1 = path.commands[i + 1];
      var d = dist(pnt0.x, pnt0.y, pnt1.x, pnt1.y);

      // create a gap between each letter
      if (d > 20) continue;

      // alternate in every step from -1 to 1
      var stepper = map(i % 2, 0, 1, -1, 1);
      var angle = atan2(pnt1.y - pnt0.y, pnt1.x - pnt0.x);
      angle = angle + addToAngle;

      var cx = pnt0.x + cos(angle * stepper) * d * 4 * curveHeight;
      var cy = pnt0.y + sin(angle * stepper) * d * 3 * curveHeight;

      bezier(pnt0.x, pnt0.y, cx, cy, cx, cy, pnt1.x, pnt1.y);
    }
  }


  //////////////////
  // Colored Text //
  //////////////////  

   if (filled) {
     noStroke();
     fill(0);
   } else {
     noFill();

     let r = map(mouseX, 0, 1000, 0, 169);
     let g = map(mouseX, 0, 1000, 0, 148);
     let b = map(mouseX, 0, 1000, 0, 92);
     stroke(84+r,37+g,130-b);


     strokeWeight(5);
   }
 
   // margin border
  //  translate(20, 260);
 
   if (textTyped.length > 0) {
     // get a path from OpenType.js
     var fontPath = font.getPath(textTyped, 0, 0, 200);
     // convert it to a g.Path object
     var path = new g.Path(fontPath.commands);
     // resample it with equidistant points
     path = g.resampleByLength(path, 11);
     // path = g.resampleByAmount(path, 500);
 
     // map mouse axis
     var addToAngle = map(mouseX, 0, width, -PI, PI);
     var curveHeight = map(mouseY, 0, height, 0.1, 5);
 
     for (var i = 0; i < path.commands.length - 1; i++) {
       var pnt0 = path.commands[i];
       var pnt1 = path.commands[i + 1];
       var d = dist(pnt0.x, pnt0.y, pnt1.x, pnt1.y);
 
       // create a gap between each letter
       if (d > 20) continue;
 
       // alternate in every step from -1 to 1
       var stepper = map(i % 2, 0, 1, -1, 1);
       var angle = atan2(pnt1.y - pnt0.y, pnt1.x - pnt0.x);
       angle = angle + addToAngle;
 
       var cx = pnt0.x + cos(angle * stepper) * d * 4 * curveHeight;
       var cy = pnt0.y + sin(angle * stepper) * d * 3 * curveHeight;
 
       bezier(pnt0.x, pnt0.y, cx, cy, cx, cy, pnt1.x, pnt1.y);
     }
   }

   // change here for intersect
   /*if(intersect == true){
    circle(200,200,20);
    
  }*/
  
  
  stroke(0);
  strokeWeight(2);
  fill(223,109,27);
  ellipse (mouseX, mouseY-200, 60, 60);
  line(mouseX-30, mouseY-200, mouseX+30  ,mouseY-200);
  line(mouseX, mouseY-200-30, mouseX  ,mouseY-200+30);
  noFill();
  beginShape();
        curveVertex(mouseX-20,mouseY-200-20);
        curveVertex(mouseX-20,mouseY-200-20);
        curveVertex(mouseX,mouseY-200);
        curveVertex(mouseX+20,mouseY-200-20);
        curveVertex(mouseX+20,mouseY-200-20);
  endShape();
  beginShape();
        curveVertex(mouseX-20,mouseY-200+22);
        curveVertex(mouseX-20,mouseY-200+22);
        curveVertex(mouseX,mouseY-200);
        curveVertex(mouseX+20,mouseY-200+22);
        curveVertex(mouseX+20,mouseY-200+22);
  endShape();
  
  
  strokeWeight(4);
  
  stroke(255);
  noFill();
  beginShape();
        curveVertex(180,160);
        curveVertex(180,160);
        curveVertex(215,220);
        curveVertex(220,250);
        curveVertex(220,250);
  endShape();
  
  beginShape();
        curveVertex(310,160);
        curveVertex(310,160);
        curveVertex(275,220);
        curveVertex(270,250);
        curveVertex(270,250);
  endShape();
  
  line(195, 180, 295  ,180);
  line(205, 200, 285  ,200);
  
  line(215, 220, 275  ,220);
  line(220, 240, 270  ,240);
  
  line(230, 160, 230  ,250);
  line(260, 160, 260  ,250);
  
  line(200, 160, 200  ,190);
  line(290, 160, 290  ,190);
  
  
  
  stroke(239,58,39);
  strokeWeight(15);
  fill(255);
  line(160, 160, 330  ,160);
  
  noStroke();
  // circle(245,  230, 50);
  distance = sqrt((mouseX - 245) * (mouseX - 245) + (mouseY-200 - 230) * (mouseY-200 - 230));
  if(distance < 50){
    intersect = true;
    timer = 10;
    while (frameCount % 60 == 0 && timer > 0) {
      timer--;
    }
  }else{
    if(timer == 0){
      intersect = false;
    }
  }
  
  
}

function keyReleased() {
  // export png
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');
  if (keyCode == ALT) filled = !filled;
}

function keyPressed() {
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, textTyped.length - 1);
    }
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
  }
}

class Confetti{
    constructor(){
        this.x = 100;
        this.y = random(-100,0);
        this.angle = random(0,5);
        this.size = 3;
        this.radius = sqrt(random(pow(width / 2, 2)));
        this.color = color(random(255), random(255), random(255));
    }

    update(time){
        let angle = 0.4 * time + this.angle;
        this.x = width / 2 + this.radius * sin(angle);
        this.y += pow(this.size, 0.5);
        if (this.y > height) {
            let i = confetti.indexOf(this);
            confetti.splice(i, 1);
        }
    }

    display() {
        fill(this.color);
        rect(this.x, this.y, this.size, this.size/2);
    }
}