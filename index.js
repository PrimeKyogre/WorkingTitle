function setup() {
  createCanvas(400, 400)
  setInterval(interval, 20)
}

var m = 0;
var crumbCounter = 0;
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
var towerMenuIsOpen = false;
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
    if(this.x <= 60){
      this.x += this.speed; //Until paths created
    }
    else if(this.x >= 50 && this.y >=110&&this.x <=70){
      this.y -= this.speed;
    }
    else if(this.y <= 110 && this.x >=60 && this.x <= 140){
      this.x+= this.speed;
    }
    else if(this.x >= 140&&this.y<310&&this.x <200){
      this.y+=this.speed;
    }
    else if(this.y>=310&&this.x<320){
        this.x+=this.speed
    }
    else if(this.x>=315&&this.y>200){
      this.y-=this.speed;
    }
    else if(this.y>=200){
      this.x+=this.speed;
    }
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
    super(x, y, 2, 100, 'Pecker');
  }
  attack() {
    for (var k in breadUsed) {
      //console.log(Math.sqrt( Math.pow((this.x-breadUsed[k].x), 2) + Math.pow((this.y-breadUsed[k].y), 2) ));
      if (Math.sqrt( Math.pow((this.x-breadUsed[k].x), 2) + Math.pow((this.y-breadUsed[k].y), 2) ) <= this.range) {
        breadUsed[k].health--;
        crumbCounter++;
        return;
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
    else if(textureChoice === "Path"){
        noStroke();
        fill(255, 204, 0);
        rect(x,y+190,50,20);
        rect(x+50,y+100,20,110);
        rect(x+50,y+100,80,20);
        rect(x+130,y+100,20,200);
        rect(x+130,y+300,180,20);
        rect(x+310,y+190,20,130);
        rect(x+310,y+190,100,20);
        
    }
    else if(textureChoice === "Crumb"){
        fill(168, 105, 34);
        ellipse(x,y,10,10);
    }
    else if(textureChoice === "SideArrow"){
        fill(255,255,255);
        triangle(x+10,y-10,x-10,y,x+10,y+10);
    }
    else if(textureChoice === "TowerMenu"){
      stroke(100,100,100);
      fill(235, 175, 85);
      rect(x,y,100,399);
      fill(0,0,0);
      stroke(0,0,0);
      textSize(20);
      text("Towers",x+17,y+50);
      fill(200,200,200);
      ellipse(x+50,y+100,50,50);
      fill(255,255,255);
      ellipse(x+50,y+100,20,20);
      triangle(x+40,y+98,x+33,y+100,x+40,y+102);
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
        textures("Path",0,0);
        stroke(0,0,0);
        textSize(12);
        fill(0,0,0);
        text(crumbCounter,5,20);
        textures("Crumb",40,15);
        textures("SideArrow",380,15);
        for (var j in breadUsed) 
          breadUsed[j].draw();
      o.draw();
        if(mouseIsPressed&&mouseX>300&&mouseY<50){
           towerMenuIsOpen = true;
        }
        if(towerMenuIsOpen){
          textures("TowerMenu",300,0);
          textures("SideArrow",280,15);
          if(mouseIsPressed&&mouseX>280&&mouseX<310&&mouseY<50){
            towerMenuIsOpen = false;
          }
        }
   }
   
};
