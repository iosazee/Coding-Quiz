let scoreElm = document.querySelector("#highscores");

let playerDetails = JSON.parse(localStorage.getItem("player-details"));
console.log(playerDetails);

if (playerDetails) {
  scoreElm.insertAdjacentHTML(
    "afterbegin",
    `<li>${playerDetails.initials} - ${playerDetails.finalscore}</li>`
  );
}

let clearButton = document.querySelector("#clear");

clearButton.addEventListener("click", clearScores);

function clearScores() {
  scoreElm.innerHTML = "";
  localStorage.removeItem("player-details");
}
