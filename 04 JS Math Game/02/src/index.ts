// console.log("Test");

const gameArea = document.querySelector(".game");
const btn = document.createElement("button");
btn.classList.add("btn", "btn-primary");
const output = document.createElement("div");
const answer = document.createElement("input");
output.textContent = "Click the button to start the game";
btn.textContent = "Start Game";
gameArea!.append(output);
gameArea!.append(btn);

const opts = ["*", "/", "+", "-"];
const game = { maxValue: 10, questions: 10, oper: [2], curQue: 0 };

btn.addEventListener("click", startGame);

// for(let i=0;i<100;i++){
//     let val = Math.floor(Math.random()*(game.maxValue+1));
//     //console.log(val);
// }

function startGame() {
  game.curQue = 0;
  buildQuestion();
}

function buildQuestion() {
  if (game.curQue < game.questions) {
    game.curQue++;
    output.innerHTML = "";
    let vals = [];
    vals[0] = Math.floor(Math.random() * (game.maxValue + 1));
    vals[1] = Math.floor(Math.random() * (game.maxValue + 1));
    vals[2] = eval(vals[0] + opts[2] + vals[1]);
    output.innerHTML = `${vals[0]} ${opts[2]} ${vals[1]} = ${vals[2]} `;
  }
}
