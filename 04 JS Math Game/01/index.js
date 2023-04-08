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

const gameArea = document.querySelectorAll(".game")[0];
// console.log(gameArea);
const output = document.createElement("div");
output.textContent = "hello world";
output.val = 0;
output.classList.add("box");
output.addEventListener("click", (e) => {
  output.val++;
  output.textContent = output.val;
  let temp = output.val % 2 ? "red" : "blue";
  output.style.backgroundColor = temp;
});
gameArea.append(output);
// document.body.prepend(output);
// let val = gameArea.appendChild(output);
// console.log(val);
console.log(output);
