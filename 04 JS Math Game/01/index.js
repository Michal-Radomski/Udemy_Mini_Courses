// const gameArea = document.querySelector(".game");
// // console.log(gameArea);
// gameArea.textContent = "hello world";
// gameArea.style.backgroundColor = "red";
// //* Own property
// gameArea.val = "Hidden";
// // console.log(gameArea);
// gameArea.addEventListener("click", (e) => {
//   console.log(e);
//   if (e.target.style.backgroundColor == "red") {
//     e.target.style.backgroundColor = "green";
//   } else {
//     e.target.style.backgroundColor = "red";
//   }
// });

// const gameArea = document.querySelectorAll(".game")[0];
// // console.log(gameArea);
// const output = document.createElement("div");
// output.textContent = "hello world";
// output.val = 0;
// output.classList.add("box");
// output.addEventListener("click", (e) => {
//   output.val++;
//   output.textContent = output.val;
//   let temp = output.val % 2 ? "red" : "blue";
//   output.style.backgroundColor = temp;
// });
// gameArea.append(output);
// // document.body.prepend(output);
// // let val = gameArea.appendChild(output);
// // console.log(val);
// console.log(output);

// const gameArea = document.querySelector(".game");
// const btn = document.createElement("button");
// const game = { max: 10, arr: ["a", "b", "c", "d"] };
// console.log(game);
// gameArea.appendChild(btn);
// btn.textContent = "start game";
// btn.addEventListener("click", startGame);

// function startGame() {
//   for (let i = 0; i < 20; i++) {
//     const div = document.createElement("div");
//     // let temp = Math.floor(Math.random() * (game.max + 1));
//     let temp = Math.floor(Math.random() * game.arr.length);
//     // console.log(temp);
//     div.textContent = game.arr[temp];
//     gameArea.append(div);
//   }
// }

const gameArea = document.querySelector(".game");
const btn = document.createElement("button");
const game = { max: 10, arr: ["a", "b", "c", "d", "e"] };
// console.log(game);
gameArea.appendChild(btn);
btn.textContent = "start game";
btn.addEventListener("click", startGame);

function startGame() {
  for (let i = 0; i < game.max; i++) {
    const div = document.createElement("div");
    game.arr.sort(() => {
      const answer = 0.5 - Math.random();
      // console.log({ answer });
      return answer;
    });
    div.textContent = game.arr.join(" ");
    gameArea.append(div);
  }
}
