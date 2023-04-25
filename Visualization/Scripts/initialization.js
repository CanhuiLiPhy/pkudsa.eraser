// Global variables
const width=400;
const unitSize=width/8;
const borderWidth=5;

const remainedBarWidth=40;

const pieceGap=3;
const pieceBorderRadius=4;

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

// Get the size of the board and the total number of frames
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

function drawRemainedBar(remainlist) {
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



// Define a function to initialize the girds on the board
function initializeGrids() {
  for (let i=1;i<=10;i++) {
    for (let j=1;j<=8;j++){

      let backgroudBlock=document.createElement("div");
      backgroudBlock.className="backgourd-block";
      backgroudBlock.style.position="absolute";
      backgroudBlock.style.boxSizing="border-box";
      backgroudBlock.style.width=`${unitSize - pieceGap}px`;
      backgroudBlock.style.height=`${unitSize - pieceGap}px`;
      backgroudBlock.style.borderRadius=`${pieceBorderRadius}px`;
      if (i<=2){
        backgroudBlock.style.backgroundColor="rgb(220, 220, 220)";
      } else{
        backgroudBlock.style.backgroundColor="rgb(240, 240, 240)";
      }

      backgroudBlock.style.border="None";
      backgroudBlock.style.zIndex="10";
      backgroudBlock.style.left=`${borderWidth + (j-1) * unitSize + pieceGap/2}px`;
      backgroudBlock.style.top=`${borderWidth + (i-1) * unitSize + pieceGap/2}px`;
      document.getElementById("board").appendChild(backgroudBlock);

    }
  }
}  

initializeGrids();


// Define a function to move a piece


function moveTo(piece,x,y){
}


