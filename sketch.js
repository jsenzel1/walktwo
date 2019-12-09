let possibleDirs = ["left", "right", "forward"];

let numOfDirs = 8;

let tDir = "";

let dirs = [];

let dirInd;

let intro1, intro2;

let finished;

let database, ref;

let input, subButton;

let previousDescriptions = [];

function setup() {

  fireBaseInit();

  finished = false;

  dirInd = 0;

  intro1 = createP("Today, if you'd like, you'll go on a walk. You can start wherever you are right now, just walk outisde");

  intro2 = createP("Below is a set of directions, each time you arrive at an intersection\, turn in the direction of the next item on the list, and tap the screen to cross it off");

  createP("If you can't complete the direction at the next intersection, continue straight until you can, or follow the simplest path you see");



  makeDirections();
}

function draw() {

}

function createSubmit() {

  let pars = selectAll('p');

  //console.log(pars);

  for (let i = 0; i < pars.length; i++) {
    pars[i].remove();
  }

  endP = createP("where did you end up?")
  endP = createP("write a short description of your surroundings")

  input = createInput();
  //input.position(20, 65);

  input.style("width", "100%");
  input.style("height", "50%");

  input.style("padding", "12px 20px");
  input.style("margin", "8px 0");

  input.style("box-sizing", "border-box");

  //input.style("font-size", "20px");

  input.style("font-family", "Georgia");
  input.style("font-size", "1.2em");

  input.style("border-radius", "20px");







  // width: 100%;
  // padding: 12px 20px;
  // margin: 8px 0;
  // box-sizing: border-box;



  subButton = createButton("press here when you're finished");
  //subButton.position(input.x + input.width, 65);
  subButton.mousePressed(submitEntry);


  //subButton.style("border", "none");
  subButton.style("border-radius", "20px");

  subButton.style("margin", "auto");
  subButton.style("display", "block");

  subButton.style("width", "100%");


  subButton.style("padding", "30px 40px");

  subButton.style("font-family", "Georgia");
  subButton.style("font-size", "1.2em");

}

function submitEntry() {
  let data = { description: input.value() }
  ref.push(data);

  let pars = selectAll('p');

  for (let i = 0; i < pars.length; i++) {
    pars[i].remove();
  }

  input.remove();
  subButton.remove();

  fetchData();
}

function mouseClicked() {


  if (dirInd > dirs.length - 1) {


    if (!finished) {
      finished = true;
      print("Finished");

      createSubmit();

    }
  }

  if (!finished) {

    dirs[dirInd].style("text-decoration: line-through");

    dirs[dirInd].style("color", "rgb(130,130,130)");

    dirInd++;

  }


}

function makeDirections() {



  for (let i = 0; i < numOfDirs; i++) {

    tDir = random(possibleDirs);
    dirs.push(createP(tDir));
    dirs[i].style("text-align", "center");
    dirs[i].style("font-size", "1.5em");

  }

}

function fireBaseInit() {
  var firebaseConfig = {
    apiKey: "AIzaSyC2z8Z_HgBaz9lYxTDbtxm8dpirYAL4HCg",
    authDomain: "objwalk-2cae7.firebaseapp.com",
    databaseURL: "https://objwalk-2cae7.firebaseio.com",
    projectId: "objwalk-2cae7",
    storageBucket: "objwalk-2cae7.appspot.com",
    messagingSenderId: "729046445473",
    appId: "1:729046445473:web:81c9835f483fd6f2fb6fe0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize Firebase

  console.log(firebase);


  database = firebase.database();
  ref = database.ref('descriptions');


  // var data = {
  //   name: "jonah",
  //   score: 100
  // }

  //ref.push(data);


  var storage = firebase.storage();


  var storageRef = storage.ref();
}

function displayPrevious() {

  createP("Other people found themselves at these places: ")

  for (let i = 0; i < previousDescriptions.length; i++) {
    let myP = createP("\"" + previousDescriptions[i].description + "\"");
    myP.style("text-align", "center")
    myP.style("font-size", "1.2em");
    let delineator = createP("-----");

    delineator.style("text-align", "center");
    delineator.style("font-size", "1.2em");

  }
}


function fetchData() {
  var ref = database.ref("descriptions");
  objData = ref.on("value", gotData);
  //console.log(objData);
}

function gotData(data) {
  var dataVals = data.val();
  var keys = Object.keys(dataVals);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    // Look at each fruit object!
    var curObj = (dataVals[key]);
    previousDescriptions.push(curObj);
  }



  displayPrevious();
}