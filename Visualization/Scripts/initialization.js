// Global variables
const width=400;
const unitSize=width/8;
const borderWidth=4;

const remainedBarWidth=40;

const blockGap=3.5;
const blockBorderRadius=4;

const radiusGap=5;

// Green Blue Orange Pink
const colorArray=["rgb(13, 211, 82)","rgb(22, 218, 224)","rgb(224, 134, 60)","rgb(243, 121, 137)"];

// Set a default speed scale for replay
speedScale=1;



initial={
  totalFrames: 200,
  totalRemains: 90,
  scores: {
    absolute: {
      left: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      right : [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    },
    relative: [1,2,3,4,5,6,7,1,20] // Left minus Right
  },
  frames: [
    {
      currentPlayer: "leftTeam",
      remainedBarStatus: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      sidebarStatus:{
        left:{
          status: "领先", // "领先" "落后" "持平"
          totalScores: 100,
          highestCombo: 10,
          currentCombos: 5,
        },
        right:{
          status: "落后",
          totalScores: 90,
          highestCombo: 9,
          currentCombos: 4,
      boardStatus: {
        preboard: {
          r8c2: [1,2],
          r7c3: [2,3]
        },
        mainboard:{
          r3c5: [6,5],
          r2c7: [7,7],
        }
      }
        }
      }
    },
    {

    },
    {

    },
    {

    }
  ]
}

totalRemains=initial.totalRemains;

// Get the total number of frames
totalFrames=initial.totalFrames;

// Define a function to draw the frame
function drawFrame(frameData) {

}


// Define an inital value for frame
let frame = 1;
// Define a function to play the animation
function play() {
  while (frame<=totalFrames) {
    // Get the frame data
    frameData=initial.Frames[frame-1];
    // Draw the frame
    drawFrame(frameData);
    // Increment the frame
    frame++;
    // Wait for the next frame
    sleep(1000/speedScale);
  }
}



// Define a function to draw the remained bar
const remainedBar=document.getElementsByClassName("remained-bar");

function updateRemainedBar(remainlist) {
  for (i=0;i<remainlist.length;i++) {
    remainedBar[i].style.height=`${remainlist[i] / totalRemains * remainedBarWidth}px`;
  }
}


// Define a function to draw the sidebars
const sideBar=document.getElementsByClassName("sidebar");
const leftItems = sideBar[0].querySelectorAll('div');
const rightItems = sideBar[1].querySelectorAll('div');

// NodeList(11) [div.status, div.total-scores, div.sidebar-header, div.numbers, div.highest-combo, div.sidebar-header, div.numbers, div.current-combos, div.sidebar-header, div.numbers, div.placeholder]

function updateSideBar(object) {
  leftItems[0]=object.left.status;
  leftItems[3]=object.left.totalScores;
  leftItems[6]=object.left.highestCombo;
  leftItems[9]=object.left.currentCombos;

  rightItems[0]=object.right.status;
  rightItems[3]=object.right.totalScores;
  rightItems[6]=object.right.highestCombo;
  rightItems[9]=object.right.currentCombos;
}


// Define a function to draw the score graph



// Define a function to initialize the girds on the board and run it
function initializeGrids() {
  for (let i=1;i<=10;i++) {
    for (let j=1;j<=8;j++){

      let backgroudBlock=document.createElement("div");
      backgroudBlock.className="backgourd-block";
      backgroudBlock.style.position="absolute";
      backgroudBlock.style.boxSizing="border-box";
      backgroudBlock.style.width=`${unitSize - blockGap}px`;
      backgroudBlock.style.height=`${unitSize - blockGap}px`;
      backgroudBlock.style.borderRadius=`${blockBorderRadius}px`;
      if (i<=2){
        backgroudBlock.style.backgroundColor="white";
        backgroudBlock.style.opacity="0.9";
      } else{
        backgroudBlock.style.backgroundColor="white";
        backgroudBlock.style.opacity="0.2";
      }

      backgroudBlock.style.border="none";
      backgroudBlock.style.zIndex="10";
      backgroudBlock.style.left=`${borderWidth + (j-1) * unitSize + blockGap/2}px`;
      backgroudBlock.style.top=`${borderWidth + (i-1) * unitSize + blockGap/2}px`;
      document.getElementById("board").appendChild(backgroudBlock);

    }
  }
}  

initializeGrids();

// Define a series of functions to create pieces with different colors
function createPiece(id,color) {
  let piece=document.createElement("div");
  piece.className="piece";
  piece.id=id;
  piece.style.position="absolute";
  piece.style.boxSizing="border-box";
  piece.style.width=`${unitSize - blockGap -radiusGap}px`;
  piece.style.height=`${unitSize - blockGap -radiusGap}px`;
  piece.style.borderRadius=`50%`;
  piece.style.backgroundColor=color;
  piece.style.zIndex="20";
  piece.style.position="absolute"
  piece.style.display="none";
  piece.style.transition="all 0.3s ease-in-out";

  piece.style.borderColor="black";
  piece.style.borderStyle="solid";
  piece.style.borderWidth="2px";
  piece.style.boxShadow="0px 0px 2px 0px rgba(0,0,0,0.75)";

  document.getElementById("board").appendChild(piece);
  return piece;
}

// Define a function to create all the pieces
function createAllPieces() {

}


// Define a function to eliminate a piece
function eliminate(piece,team){
  if (piece.style.display === "none") {
    return;
  } else{
  piece.classList.add("eliminated");
  setTimeout(function(){
    piece.style.display="none";
    piece.classList.remove("eliminated");
    piece.style.top=`${borderWidth +  10 * unitSize + blockGap/2+radiusGap / 2}px`;
  }
  ,300);
  }
}

// Define a function to move a piece
function moveTo(piece,x,y){
  if (piece.style.display==="none") {
    piece.style.display="block";
  }
  piece.style.left=`${borderWidth + (x-1) * unitSize + blockGap/2+radiusGap / 2}px`;
  piece.style.top=`${borderWidth + (y-1) * unitSize + blockGap/2+radiusGap / 2}px`;
}


// A function for testing
function test() {
  for(i=1;i<=8;i++){
    for (j=1;j<=10;j++){
      let piece=createPiece(`r${j}c${i}`,colorArray[Math.floor(Math.random()*colorArray.length)]);
      moveTo(piece,i,j);
    }
  }
}



