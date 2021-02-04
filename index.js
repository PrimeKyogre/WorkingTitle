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
        arc(x-3,y-3,7.5,7.5,180,360);
        arc(x+5,y-3,7.5,7.5,180,360);
    }
    else if(textureChoice === "WholeWheatSlice"){
        fill(133, 97, 5);
        noStroke();
        rect(x-7.5,y-3,15.5,10);
        strokeWeight(1.25);
        stroke(0, 0, 0);
        arc(x-3,y-3,7.5,7.5,180,360);
        arc(x+5,y-3,7.5,7.5,180,360);
    }
    else if(textureChoice === "Pecker"){
        fill(255,255,255);
        ellipse(x,y,20,20);
        triangle(x-10,y-2,x-17,y,x-10,y+2);
        fill(0,0,0,100);
        ellipse(x,y,100,100);
    }
    else if(textureChoice === "Peck"){
        fill(255,255,255);
        ellipse(x,y,5,5);
    }
};

//cracker functions{
var cracker = function(x,y){
    this.x = x;
    this.y = y;
    this.speed = 0.5;
    this.health = 1;
};
cracker.prototype.draw = function() {
     textures("Cracker",this.x,200);
};
cracker.prototype.move = function() {
   this.x +=this.speed;
};
//}
//white bread functions{
var whiteBread = function(x,y){
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.health = 2;
};
whiteBread.prototype.draw = function() {
     textures("WhiteBreadSlice",this.x,200);
};
whiteBread.prototype.move = function(){
    this.x += this.speed;
};
//}
//wheat bread functions{
var wheatBread = function(x,y){
    this.x = x;
    this.y = y;
    this.speed = 1.65;
    this.health = 3;
};
wheatBread.prototype.draw = function() {
     textures("WholeWheatSlice",this.x,200);
};
wheatBread.prototype.move = function(){
    this.x += this.speed;
};
//}

//pecker functions{
var pecker = function(x,y,path1,path2){
    this.x = x;
    this.y = y;
    this.path1 = path1;
    this.path2 = path2;
};
pecker.prototype.draw = function() {
    textures("Pecker",this.x,this.y);
};
pecker.prototype.attack = function(){
    for(var k = 0; k < breadUsed.length; k++){
        /**
        if(breadUsed[k].x - this.x < 50&&breadUsed[k].x - this.x > -50 &&breadUsed[k].y - this.y > -50&&breadUsed[k].y - this.y < 50){
            println("Work");
        }
        **/
        if(breadUsed[k].x - this.x < 50&&breadUsed[k].x - this.x > -50&&breadUsed[k].y-this.y < 50&&breadUsed[k].y-this.y > -50){
            textures("Peck", breadUsed[k].x,breadUsed[k].y);
        }
    }
};
pecker.prototype.upgrades = function(){

};
var o = new pecker(200,230,0,0);
//}

//level creator{

for(var i = 0; i < levels[level-1].length; i++){
    if(levels[level-1][i] === 1){
        breadUsed.push(new cracker(placer,200));
    }
    else if(levels[level-1][i] === 2){
        breadUsed.push(new whiteBread(placer,200));
    }
    else if(levels[level-1][i] === 3){
        breadUsed.push(new wheatBread(placer,200));
    }
    placer -=20;
}
//}
draw = function() {
   background(0,255,0);
   textSize(50);
   fill(0);
   text("Working Title",75,100);
   noFill();
   rect(150,300,100,50);
   textSize(45);
   text("Play",155,340);
   if(mouseIsPressed&&mouseX>150&&mouseX<250&&mouseY>300&&mouseY<350){
        startGame = true;    
   }
   if(startGame === true){
        fill(0,255,0);
        rect(0,0,400,400);
        fill(255, 204, 0);
        rect(0,175,400,50);
        
        for(var j = 0; j < breadUsed.length; j++){
            breadUsed[j].draw();
            breadUsed[j].move();
            
        }
            o.draw();
            o.attack();
   }
   
};
