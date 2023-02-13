// sketch.js - purpose and description here
// Author: Hitesh Ahuja, Johnny Wong
// Date: 2/11/23

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
let angle = 0;
let size = 100;


function setup() {
	createCanvas(windowWidth, windowHeight,WEBGL);
	// createEasyCam();
    lights();
	background(100);
    red = random(0,255);
    green = random(0,255);
    blue = random(0,255);
}

function draw() {
    let movingX = windowWidth/6;
    let movingY = windowHeight/6;
	
    rotateZ(angle);
    rotateX(angle);
    rotateY(angle);


    let time_ct = frameCount/60;
    if(time_ct % 5 == 0){
        red = random(0,255);
        green = random(0,255);
        blue = random(0,255);
    }
    // noStroke();
    red += 255/size/5;
    green += 255/size/5;
    blue += 255/size/5;

    fill(red, green, blue);
	sphere(size);
    noFill("white");
	box(size*2);


    rotateX(sin(angle/3)+ (random(2)/10));
    rotateY(cos(angle/2)+ (random(2)/10));
	push();
	translate(movingX,movingY);
	fill('red');
	box(10);
	pop();

    rotateX(cos(angle/3)+ (random(2)/10));
    rotateY(sin(angle/2)+ (random(2)/10));
    push();
	translate(-movingX,-movingY);
	fill('red');
	box(10);
	pop();
    //angle += 0.5;

    movingX += sin(angle)*1000;
	angle += 0.05;
    if (size > 300){
        red = random(0,255);
        green = random(0,255);
        blue = random(0,255);
        size = 100;
    }
    else{
        size += 0.5;
    } 
}