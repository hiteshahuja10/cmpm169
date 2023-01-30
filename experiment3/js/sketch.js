// sketch.js - purpose and description here
// Author: Hitesh Ahuja, Johnny Wong
// Date: 1-28-23

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
let x, y;

function setup() {
  createCanvas(1000, 600);
  background(0);
  stroke(255);
  xc = -600;
  yc = 600;
  x = width / 2;
  y = height / 2;
  xx = width / 2;
  yy = height / 2;
  xxx = width / 2;
  yyy = height / 2;
  red = random(0,255);
  green = random(0,255);
  blue = random(0,255);
  transparency = 15;
  xxred = random(0,255);
  xxgreen = random(0,255);
  xxblue = random(0,255);
  xxtransparency = 15;
  xxxred = random(0,255);
  xxxgreen = random(0,255);
  xxxblue = random(0,255);
  xxxtransparency = 15;
}

function draw() {
  num = 0
  let time_ct = frameCount/60;
    point(x, y);
    xOld = x;
    yOld = y;
    x = width / 2 + random(xc, yc);
    y = height / 2 + random(xc, yc);
    x = constrain(x, 0, width);
    y = constrain(y, 0, height);
    let distance = dist(500,300, x,y);
    let transparency = map(distance, 0, 450, 255, 0);
    // Draw a line from the last point to the current point
    if(time_ct % 5 == 0){
      red = random(0,255);
      green = random(0,255);
      blue = random(0,255);
      xc += 100;
      yc -= 100;
    }
    stroke(red, blue, green, transparency);
    line(xOld, yOld, x, y);
    
    point(xx, yy);
    xxOld = xx;
    yyOld = yy;
    xx = width / 2 + random(xc, yc);
    yy = height / 2 + random(xc, yc);
    xx = constrain(xx, 0, width);
    yy = constrain(yy, 0, height);
    let xxdistance = dist(500,300, xx,yy);
    let xxtransparency = map(xxdistance, 0, 450, 255, 0);
    // Draw a line from the last point to the current point
    if(time_ct % 5 == 0){
      xxred = random(0,255);
      xxgreen = random(0,255);
      xxblue = random(0,255);
      
    }
    stroke(xxred, xxblue, xxgreen, xxtransparency);
    line(xxOld, yyOld, xx, yy);

    point(xxx, yyy);
    xxxOld = xxx;
    yyyOld = yyy;
    xxx = width / 2 + random(xc, yc);
    yyy = height / 2 + random(xc, yc);
    xxx = constrain(xxx, 0, width);
    yyy = constrain(yyy, 0, height);
    let xxxdistance = dist(500,300, xxx,yyy);
    let xxxtransparency = map(xxxdistance, 0, 450, 255, 0);
    // Draw a line from the last point to the current point
    if(time_ct % 5 == 0){
      xxxred = random(0,255);
      xxxgreen = random(0,255);
      xxxblue = random(0,255);
      
    }
    stroke(xxxred, xxxblue, xxxgreen, xxxtransparency);
    line(xxxOld, yyyOld, xxx, yyy);
}

function lineGenerator(xOld, yOld, x, y){
  let time_ct = frameCount/60;
  point(x, y);
  // Draw a line from the last point to the current point
  line(xOld, yOld, x, y);
  if(time_ct % 5 == 0){
    stroke(random(0,255),random(0,255),random(0,255));
  }
}