const gameArea = document.querySelector(".game");
// console.log(gameArea);
gameArea.textContent = "hello world";
gameArea.style.backgroundColor = "red";
//* Own property
gameArea.val = "Hidden";
// console.log(gameArea);
gameArea.addEventListener("click", (e) => {
  console.log(e);
  if (e.target.style.backgroundColor == "red") {
    e.target.style.backgroundColor = "green";
  } else {
    e.target.style.backgroundColor = "red";
  }
});
