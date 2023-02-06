class Snowflake {

    constructor(img, surfaces) {
      this.pos;
      this.randomize();
      this.img = img;
      this.angle = random(TWO_PI);
      this.dir = (random(1) > 0.5) ? 1 : -1;
      this.xOff = 0;
      this.surfaces = surfaces;
    }
  
    applyForce(force) {
      // Parallax Effect hack
      let f = force.copy();
      f.mult(this.r);
      this.acc.add(f);
    }
  
    randomize() {
      let x = random(width);
      let y;
      let z = random(0, 100);
      if (!this.pos) {
        y = random(0, height);
      } else {    
        y = random(-100, -10);
      }
      this.pos = createVector(x, y, z);
      this.vel = createVector(0, 0);
      this.acc = createVector();
      this.r = this.getSize(z);
    }
  
    update() {
      this.xOff = sin(this.angle * 2) * 2 * this.r;
  
      this.vel.add(this.acc);
      this.vel.limit(this.r * 0.2);
  
      if (this.vel.mag() < 1) {
        this.vel.normalize();
      }
      
      // update the position based on velocity
      this.pos.add(this.vel);
      this.acc.mult(0);
      
      // check for colision w surface
      if (this.checkForSurface()) {
        // if yes, start again at top
        this.randomize();
      }
  
      // if snowflake has hit bottom, start again at top
      if (this.pos.y > height + this.r) {
        this.randomize();
      }
      // wrap around left edge
      if (this.pos.x < -this.r) {
        this.pos.x = width + this.r;
      }
      // wrap around right edge
      if (this.pos.x > width + this.r) {
        this.pos.x = -this.r;
      }
      this.angle += this.dir * this.vel.mag() / 200;
    }
  
    render() {
      push();
      translate(this.pos.x + this.xOff, this.pos.y);
      rotate(this.angle);
      imageMode(CENTER);
      image(this.img, 0, 0, this.r, this.r);
      pop();
    }
    
    getSize(z) {
      // let r = map(z, 0,100, 32,1);
      return map(z, 0, 100, 24, 1);
    }
    
    isBetween(number, a, b) {
      let min = Math.min(a, b);
      let max = Math.max(a, b);
      return number > min && number < max;
    }
    
    checkForSurface() {
      // iterate through current surfaces
      for(var i=0;i<this.surfaces.length;i++) {
        let pt1 = createVector(...this.surfaces[i][0]);
        let pt2 = createVector(...this.surfaces[i][1]);
        // is z within range of hitting surface?
        if(! this.isBetween(this.pos.z, pt1.z, pt2.z)) {
          // no, try another surface
          continue;
        }
        // is x within range of hitting surface?
        if(! this.isBetween(this.pos.x + this.xOff, pt1.x, pt2.x)) {
          // no, try another surface
          continue;
        }
        // is y within range of hitting surface?
        if(! this.isBetween(this.pos.y, pt1.y, pt2.y)) {
          // no, try another surface
          continue;
        }
        // console.log("within the box");
        // now we only have to check if the 
        // flake will intersect the line
        if (this.intersectsLine(pt1, pt2, 
            this.pos.x + this.xOff, this.pos.y, this.r*1.5)){
          // pile snow up
          let flake = {x: this.pos.x + this.xOff, y: this.pos.y, 
                       r: this.r, img: this.img};
          // console.log(flake);
          piles.push(flake);
          // console.log("collision");
          // restart snow at top
          return true;
        }
      }
      return false;
    }
    
    // Finds the intersection between a line defined by two points (pt1, pt2)
    // and a circle defined by a center point (x, y) and a radius (r)
    // Returns true if the line and the circle intersect, false otherwise.
    intersectsLine(pt1, pt2, x, y, r) {
      // Define the line as a function of the form ax + by = c
      let a = pt2.y - pt1.y;
      let b = pt1.x - pt2.x;
      let c = a * pt1.x + b * pt1.y;
  
      // Check if the distance between the center of the circle and the line is less than or equal to the radius of the circle
      let distance;
      if (a === 0) {
        distance = Math.abs(y - pt1.y);
      } else {
        distance = Math.abs(a * x + b * y - c) / Math.sqrt(a * a + b * b);
      }
      return distance <= r;
    }
  
  }