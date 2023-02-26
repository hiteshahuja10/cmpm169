// sketch.js - purpose and description here
// Author: Hitesh Ahuja, Johnny Wong
// Date: 2-25-23

let dog;
let foodarray = [];
let height = 200;
let randomX,randomY;

function preload(){
	food = loadJSON('foods.json');	
}

function setup() {
  createCanvas(800, 600);
  textSize(40);
  background(30);
  DrawWords();
  
}

function draw() {
  let time_ct = frameCount/60;
  if(time_ct % 2 == 0){
    DrawWords();
  }
}

function DrawWords(){

  let food1 = food["Pizza"];
  let food2 = food["Burrito"];
  let food3 = food["Pasta"];
  let food4 = food["Ice Cream"];
  let food5 = food["French Fries"];
  let food6 = food["Wings"];
  let food7 = food["Surstromming"];
  let food8 = food["Tuna"];
  let food9 = food["Fish"];
  let food10 = food["Burgers"];
  
  background(30);
  
  
  fill(60, 170, 75);
  foodarray.push(food1);
  foodarray.push(food2);
  foodarray.push(food3);
  foodarray.push(food4);
  foodarray.push(food5);
  foodarray.push(food6);
  foodarray.push(food7);
  foodarray.push(food8);
  foodarray.push(food9);
  foodarray.push(food10);
  
  for(let i = 0; i < 10; i++){
    fill(random(0,255), random(0,255), random(0,255))
    textSize(foodarray[i].yummy * 6+20);
    randomX = random(50, 700);
    randomY = random(50, 700);
    text(foodarray[i].name, randomX, randomY);
  }
}