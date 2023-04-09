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
const game = { maxValue: 10, questions: 10, oper: [2] };
