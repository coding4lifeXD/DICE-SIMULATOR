// starter variables
const selector = document.getElementById("selector");
const rollBtn = document.getElementById("rollBtn");
const resetBtn = document.getElementById("resetBtn");
const diceRollOutput = document.getElementById("diceRollsOut");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");

// variables to change (roll)
let rollValue1;
let rollValue2;
let userPrompt;
let diceRollArray = [];
let probabilityArr = [];
let twoDiceSum;
let outputProbabillityAlertOutput;
let totalAmountOfRolls = 0;
let indexStart = 0;
// spinning dices
let imgDeg = 0;
let imgSrc = 0;
let snakeEyes = ``;
let spinInterval = setInterval(spinDice, 100);

// creating probabilityArr from 2 to 16
for (let i = 2; i < 13; i++) {
  probabilityArr.push({ num: i, amountOfType: 0 });
}
//iteration function through the probabilityArr in order to get the amount of each number and output the corresponding percents
function getStuff(index) {
  outputProbabillityAlertOutput += `\n ${index.num}: ${
    (index.amountOfType / totalAmountOfRolls * 100).toFixed(1).replace(".0", "")
  }%`;
  return index.num, index.amountOfType;
}
// function to output alert, as well as reset outputProb to avoid duplication
function outputAlert() {
  probabilityArr.forEach(getStuff)
  alert(outputProbabillityAlertOutput)
  outputProbabillityAlertOutput = ``
}
function spinDice() {
  if (imgSrc === 7) {
    imgSrc = 1;
  }
  if (imgDeg > 360) {
    imgDeg = 0;
  }
  img1.style.transform = `rotate(${imgDeg}deg)`;
  img2.style.transform = `rotate(${imgDeg}deg)`;
  img1.src = `${imgSrc}.png`;
  img2.src = `${imgSrc}.png`;
  imgSrc += 1;
  imgDeg += 10;
}

// adding event listener to reset button and resetting img1, img2 src and reseting setInterval. we also reset indexstart, totalAmount of Rolls, prob array and outputAlertOutput
resetBtn.addEventListener("click", () => {
  totalAmountOfRolls = 0;
  probabilityArr = [];
  for (let i = 2; i < 13; i++) {
    probabilityArr.push({ num: i, amountOfType: 0 });
  }
  outputProbabillityAlertOutput = ``;
  clearInterval(spinInterval);
  spinInterval = setInterval(spinDice, 100);
  indexStart = 0;
  diceRollArray = [];
  img1.src = `0.png`;
  img2.src = `0.png`;
  diceRollOutput.innerHTML = `<h3>Dice Rolls</h3>`;
});

// adding event listener to roll button
rollBtn.addEventListener("click", () => {
  // reseting time interval for spinDice function
  clearInterval(spinInterval);
  //  rolling based on amount of times needed to roll
  switch (selector.value) {
    case "roll1":
      roll(1);
      outputAlert()
      break;
    case "roll3":
      roll(3);
      outputAlert()
      break;
    case "roll5":
      roll(5);
      outputAlert()
      break;
    case "rollX":
      let userPrompt = +prompt("How many rolls?");
      roll(userPrompt);
      outputAlert()
      break;
    case "rollSnakeEyes":
      // looping roll function until we get `11` and reseting snakeEyes to avoid errors. we put 1 as the argument for roll to roll once at a time until we hit `11`
      while (snakeEyes != `11`) {
        roll(1);
      }
      snakeEyes = ``;
      break;
  }
  display();
});
// updating diceRollOutput div to the correct dices rolled and changing the img1 and img2 photos to match the correct dices
// adding indexStart to prevent duplicating in html
function display() {
  for (let i = indexStart; i < diceRollArray.length; i++) {
    diceRollOutput.innerHTML += `<span>${diceRollArray[i]}</span>`;
    img1.src = `${diceRollArray[i].charAt(0)}.png`;
    img2.src = `${diceRollArray[i].charAt(2)}.png`;
    indexStart++;
  }
}
// roll function to roll as many times needed
function roll(rollNum) {
  for (let i = 0; i < rollNum; i++) {
    // reset snakeEyes if too big
    if (snakeEyes.length == 2) {
      snakeEyes = ``;
    }
    let rollValue1 = Math.floor(Math.random() * 6) + 1;
    let rollValue2 = Math.floor(Math.random() * 6) + 1;
    diceRollArray.push(`${rollValue1},${rollValue2}`);
    snakeEyes += `${rollValue1}${rollValue2}`;
    // add amount of rolls by two and update probabilityArr Array
    totalAmountOfRolls++;
    probabilityArr[rollValue1 + rollValue2 - 2].amountOfType++;
  }
  return diceRollArray;
}
