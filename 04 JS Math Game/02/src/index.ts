const gameArea = document.querySelector(".game") as HTMLDivElement;
const gameOptions = document.querySelector(".gameOptions") as HTMLDivElement;
const btn = document.createElement("button");
const btn1 = document.createElement("button");
const output = document.createElement("div");
const message = document.createElement("div");

// Update of elements
btn1.style.display = "none";
btn.classList.add("btn", "btn-danger", "btn-lg", "startBtn");
btn.style.display = "block";
btn1.classList.add("btn", "btn-success", "btn-lg", "csvBtn");
output.textContent = "Click the button to start the game";
btn.textContent = "Start New Game";
output.classList.add("output");
message.classList.add("message");

// Adding elements to page
gameArea.append(message);
gameArea.append(output);
gameArea.append(btn);
gameArea.append(btn1);

// Game options
const opts = ["*", "/", "+", "-"];
const game = { correct: "", maxValue: 10, questions: 10, oVals: [0, 1, 2, 3], curQue: 0, hiddenVal: 3, inplay: false };
const player = { correct: 0, incorrect: 0, score: [] as any[], playerName: "tester" };

// Event listeners
btn.addEventListener("click", startGame);
btn1.addEventListener("click", createCSV);

function startGame() {
  btn1.style.display = "none";
  btn.style.display = "none"; // Hide start button
  gameOptions.style.display = "none"; // Hide to options inputs

  player.score.length = 0;
  player.correct = 0;
  player.incorrect = 0;

  getValues(); // Game parameters reset
  buildBoard(); // Create game board
}

function buildBoard() {
  output.innerHTML = "";
  for (let i = 0; i < game.questions; i++) {
    const div = document.createElement("div"); // Parent question div
    div.classList.add("question");
    (div as any).indexVal = i;
    div.append(document.createTextNode(i + 1 + ". ")); // Add counter
    output.append(div); // Add to html page
    buildQuestions(div); // Add question
  }
}

function buildQuestions(div: HTMLDivElement) {
  let vals = [];
  vals[0] = Math.ceil(Math.random() * game.maxValue);
  let tempMax = game.maxValue + 1; // Temporary max value
  game.oVals.sort(() => {
    return 0.5 - Math.random(); // Randomize array
  });
  if (game.oVals[0] === 3) {
    tempMax = vals[0]; // Remove negative numbers
  }
  vals[1] = Math.floor(Math.random() * tempMax); // Random value for second value
  if (game.oVals[0] === 0) {
    // Multiply not by zero
    if (vals[1] === 0) {
      vals[1] = 1;
    }
    if (vals[0] === 0) {
      vals[0] = 1;
    }
  }
  if (game.oVals[0] === 1) {
    // Division none by zero
    if (vals[0] === 0) {
      vals[0] = 1;
    }
    let temp = vals[0] * vals[1];
    vals.unshift(temp); // Create vals[2] largest number first
  } else {
    vals[2] = eval(vals[0] + opts[game.oVals[0]] + vals[1]); // Set vals[2]
  }
  vals[3] = opts[game.oVals[0]];

  let hiddenVal;
  if (game.hiddenVal !== 3) {
    // Check is hidden is set
    hiddenVal = game.hiddenVal;
  } else {
    hiddenVal = Math.floor(Math.random() * 3);
  }

  const answer = document.createElement("input") as HTMLInputElement;
  const myBtn = document.createElement("div");
  answer.setAttribute("type", "number");
  answer.setAttribute("max", 999 as any);
  answer.setAttribute("min", 0 as any);
  answer.classList.add("boxAnswer");
  answer.addEventListener("keyup", (event) => {
    if (event.code === "Enter") {
      checkAnswer();
    }
  });

  function checkAnswer() {
    player.score[(div as any).indexVal][4] = true;
    answer.disabled = true;
    if ((answer as any).correct === Number(answer.value)) {
      player.score[(div as any).indexVal][3] = "correct";
      // div.style.backgroundColor = "green";
      myBtn.style.backgroundColor = "green";
      div.classList.add("bg-success", "bg-opacity-75");
    } else {
      player.score[(div as any).indexVal][3] = "wrong";
      div.style.backgroundColor = "red";
      div.classList.add("bg-danger", "bg-opacity-75");
    }
    // console.log(player.score[(div as any ).indexVal]);
    checkComplete();
    myBtn.textContent = (answer as any).correct;
  }

  function checkComplete() {
    let cnt = 0;
    player.score.forEach((elem) => {
      // console.log(elem[4]);
      if (elem[4]) {
        cnt++;
      }
    });
    if (cnt >= game.questions) {
      console.log("Game Over");
      btn.style.display = "block";
      btn1.style.display = "block";
      btn1.textContent = "Download Score";
    }
    // console.log("Questions Done " + cnt);
  }

  let ansx = [] as string[];
  let quex = [] as string[];
  for (let i = 0; i < 3; i++) {
    ansx.push(vals[i]);
    if (hiddenVal === i) {
      quex.push("_");
      (answer as any).correct = vals[i];
      div.append(answer);
    } else {
      maker1(div, vals[i], "box");
      quex.push(vals[i]);
    }
    if (i === 0) {
      let tempSign = vals[3] == "*" ? "&times;" : vals[3];
      ansx.push("x");
      quex.push("x");
      maker1(div, tempSign, "boxSign");
    }
    if (i === 1) {
      ansx.push("=");
      quex.push("=");
      maker1(div, "=", "boxSign");
    }
    if (i === 2) {
      myBtn.classList.add("myBtn");
      myBtn.textContent = "check";
      myBtn.addEventListener("click", checkAnswer, { once: true });
      div.append(myBtn);
    }
  }
  quex = quex.join(" ") as any;
  ansx = ansx.join(" ") as any;
  // console.log(quex,ansx);
  player.score.push([(div as any).indexVal, quex, ansx, false, false]);
  // console.log(player.score);
}
function maker1(div: HTMLDivElement, v: string, cla: string) {
  const temp = document.createElement("div");
  temp.classList.add(cla);
  temp.innerHTML = v;
  div.append(temp);
}

function getValues() {
  game.maxValue = Number(document.querySelector("#maxVal" as any).value);
  game.questions = document.querySelector("#numQuestions" as any).value;
  let temp = document.querySelector("#selOpt" as any);
  let tempArr = [];
  for (let i = 0; i < temp.options.length; i++) {
    if (temp.options[i].selected) {
      tempArr.push(i);
    }
  }
  game.oVals = tempArr;
}

function createCSV() {
  let file;
  let holder: string[] | string = [];
  let filename = player.playerName + ".csv";
  let properties = {
    type: "text/csv;charset=utf-8;",
  };
  player.score.forEach((elem) => {
    console.log(elem);
    holder += clean(elem) + "\n";
  });
  file = new File([holder as any], filename, properties);
  let link = window.document.createElement("a");
  let url = window.URL.createObjectURL(file);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function clean(row: string[]) {
  let rep = "";
  row.forEach((cell, index) => {
    cell = cell == null ? "" : cell.toString();
    if (cell.search(/("|,|\n)/g) >= 0) cell = '"' + cell + '"';
    if (index > 0) rep += ",";
    rep += cell;
  });
  return rep;
}
