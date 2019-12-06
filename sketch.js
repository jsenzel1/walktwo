let possibleDirs = ["left", "right", "forward"];

let numOfDirs = 5;

let tDir = "";

let dirs = [];

let dirInd;

let intro1, intro2;

let finished;

function setup(){
  

  
  finished = false;

  dirInd = 0;
  
  intro1 = createP("Today, if you'd like, you'll go on a walk. You can start wherever you are right now, just walk outisde");
  
  intro2 = createP("Below is a set of directions, each time you arrive at an intersection\, turn in the direction of the next item on the list, and tap the screen to cross it off");        
  
  

  makeDirections();
}

function draw() {

}

function mouseClicked(){
  
    
  if(dirInd > dirs.length-1){
    print("Finished");
    
    if(!finished){
    finished = true;
    }
  }
  
  if(!finished){
  
  dirs[dirInd].style("text-decoration: line-through");
  
  dirs[dirInd].style("color","rgb(130,130,130)");
  
  dirInd++;
    
  }

  
}

function makeDirections(){
   
  
  
  for(let i=0; i < numOfDirs; i++)
  {
    
    tDir = random(possibleDirs);
    dirs.push(createP(tDir));
    dirs[i].style("text-align","center");
    dirs[i].style("font-size","1.5em");
    
  }

}