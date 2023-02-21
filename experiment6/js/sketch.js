// sketch.js - Road Trip
// Author: Hitesh Ahuja, Johnny Wong
// Date: 2-20-23

// Inspired from https://openprocessing.org/sketch/691190

let str = "Hawaii Italy Tokyo France London Florida Canada Barcelona";
let str_arr = [];

let font;
let switcher = false;


function preload() {
  font = loadFont("Autumn.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  red = random(0,255);
  green = random(0,255);
  blue = random(0,255);
  let strs = str.split(" ");
  for (let i = 0; i < strs.length*20; i++) {
    let x = random();
    if(x < 0.5){
        x = -width / 2;
    }else{
        x = width / 2;
    }
    let y = random();
    if(y < 0.5){
        y = -height / 2;
    }else{
        y = height / 2;
    }
    let z = random(-width*5, width/2);
    str_arr.push(new Type(strs[i%strs.length], x, y, z));
  }
}

function draw() {
  background(0,0,0);
	orbitControl();
  for (let i = 0; i < str_arr.length; i++) {
    str_arr[i].update();
    str_arr[i].display();
  }
}

class Type {
  constructor(_str, _x, _y, _z) {
    this.str = _str;
    this.x = _x;
    this.y = _y;
    this.z = _z;
  }

  update() {
    this.z += 10;
    if(this.z > width/2){
    	this.z = -width*5;
    }

  }

  display() {
    let time_ct = frameCount/60;
    if(time_ct % 2 == 0){
        switcher = true;
    }else if(time_ct % 2 == 1){
        switcher = false;
    }
    if(switcher == false){
        this.x -= 20;
    }
    if(switcher == true){
        this.x += 20;
    }

    red = random(0,255);
    green = random(0,255);
    blue = random(0,255);
    push();
    translate(this.x, this.y, this.z);
    textAlign(CENTER, CENTER);
    textFont(font);
    textSize(100);
	fill(red, green, blue);
    text(this.str, 0, 0);
    pop();
  }
}