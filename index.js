function setup() {
  createCanvas(400, 400)
  setInterval(interval, 20)
}

var m = 0;

interval = function() {
  if (startGame) {
    m++;
    for(var j in breadUsed){
            breadUsed[j].move();
            if(breadUsed[j].health === 0){
                breadUsed.splice(j,1);
            }
        }
      if (m % (50 / o.rate) === 0) {
        o.attack();
      }
  }
}

/**
Progress Log:
Finished three textures
Made level creator work for 3 breads
3 bread functions
Pecker being added
**/
var level = 2;
var levels = [
    [1,1,1,1,1,1,1,1,1,1],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    []
    ];
var breadUsed = [];    
var placer = 0;
var startGame = false;

class Entity {
  constructor(x, y, textureId) {
    this.x = x;
    this.y = y;
    this.textureId = textureId;
  }
  move(spdX, spdY) {
    this.x += spdX;
    this.y += spdY;
  }
  draw() {
    textures(this.textureId, this.x, this.y);
  }
}

class Bread extends Entity {
  constructor(x, y, speed, health, textureId) {
    super(x, y, textureId);
    this.speed = speed;
    this.health = health;
  }
  move() {
    this.x += this.speed; //Until paths created
  }
}

class WhiteBread extends Bread {
  constructor(x, y) {
    super(x, y, 1, 2, 'WhiteBreadSlice');
  }
}

class WheatBread extends Bread {
  constructor(x, y) {
    super(x, y, 1.65, 3, 'WholeWheatSlice');
  }
}

class Cracker extends Bread {
  constructor(x, y) {
    super(x, y, 5, 0.5, 'Cracker');
  }
}



class Bird extends Entity {
  constructor(x, y, rate, range, textureId) {
    super(x, y, textureId);
    this.rate = rate;
    this.range = range;
    this.interval = setInterval(this.attack, rate);
  }
  attack() {
    
  }
}

class Pecker extends Bird {
  constructor(x, y) {
    super(x, y, 5, 100, 'Pecker');
  }
  attack() {
    for (var k in breadUsed) {
      //console.log(Math.sqrt( Math.pow((this.x-breadUsed[k].x), 2) + Math.pow((this.y-breadUsed[k].y), 2) ));
      if (Math.sqrt( Math.pow((this.x-breadUsed[k].x), 2) + Math.pow((this.y-breadUsed[k].y), 2) ) <= this.range) {
        breadUsed[k].health--;
      }
    }
  }
}


var textures = function(textureChoice,x,y){
    if(textureChoice === "Cracker"){
        fill(189, 142, 23);
        ellipse(x,y,15,15);
    }
    else if(textureChoice === "WhiteBreadSlice"){
        fill(255,255,255);
        rect(x-7.5,y-3,15.5,10);
        stroke(0, 0, 0);
        strokeWeight(1.25);
        arc(x-3,y-3,7.5,7.5,PI,2*PI);
        arc(x+5,y-3,7.5,7.5,PI,2*PI);
    }
    else if(textureChoice === "WholeWheatSlice"){
        fill(133, 97, 5);
        noStroke();
        rect(x-7.5,y-3,15.5,10);
        strokeWeight(1.25);
        stroke(0, 0, 0);
        arc(x-3,y-3,7.5,7.5,PI,2*PI);
        arc(x+5,y-3,7.5,7.5,PI,2*PI);
    }
    else if(textureChoice === "Pecker"){
        fill(255,255,255);
        ellipse(x,y,20,20);
        triangle(x-10,y-2,x-17,y,x-10,y+2);
        fill(0,0,0,100);
        ellipse(x,y,200,200);
    }
    else if(textureChoice === "Peck"){
        fill(255,255,255);
        ellipse(x,y,5,5);
    }
};


var o = new Pecker(200,230);
//}

//level creator{

for(var i = 0; i < levels[level-1].length; i++){
    if(levels[level-1][i] === 1){
        breadUsed.push(new Cracker(placer,200));
    }
    else if(levels[level-1][i] === 2){
        breadUsed.push(new WhiteBread(placer,200));
    }
    else if(levels[level-1][i] === 3){
        breadUsed.push(new WheatBread(placer,200));
    }
    placer -=20;
}

startGame = function() {
  //let a = setInterval(o.attack, 500);
}

draw = function() {
   background(0,255,0);
   textSize(50);
   fill(0);
   text("Working Title",75,100);
   textSize(45);
   text("Play",155,340);
   noFill();
   rect(150,300,100,50);

   if(mouseIsPressed&&mouseX>150&&mouseX<250&&mouseY>300&&mouseY<350){
     startGame = true;    
   }
   if(startGame === true){
        fill(0,255,0);
        rect(0,0,400,400);
        fill(255, 204, 0);
        rect(0,175,400,50);
        
        for (var j in breadUsed) 
          breadUsed[j].draw();
      o.draw();
   }
   
};
