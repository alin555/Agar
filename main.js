var intervalLeftOne;
var intervalRightOne;
var intervalUpOne;
var intervalDownOne;
var intervalLeftTwo;
var intervalRightTwo;
var intervalUpTwo;
var intervalDownTwo;
var dashTwo = 0;
var dashOne = 0;
var canDash1 = true;
var canDash2 = true;
var name1;
var name2;
var counter1 = 0;
var counter2 = 0;
var score1 = document.getElementById("counter1");
var score2 = document.getElementById("counter2");
var board = document.getElementById("board");
var player1 = document.getElementById("player1");
var player2 = document.getElementById("player2");
var apples = [];



// var greenApples = [];
// var godMode1 = false;
// var godMode2 = false;


document.getElementById("button").addEventListener("click", function () {
  name1 = document.getElementById("player1Name").value;
  // name2 = document.getElementById("player2Name").value;
  document.getElementById("player1NameTop").innerHTML = name1;
  // document.getElementById("player2NameTop").innerHTML = name2;
  document.getElementById("names").style.display = "none";
  document.getElementById("board").style.display = "block";
  Initial();

});




function moveRight1() {
  player1.style.transform = "rotate(0)";
  clearIntervalsOne();
  intervalRightOne = setInterval(function () {
    Checks();
    if (parseInt(player1.style.left) >= board.offsetWidth - player1.offsetWidth) {
      clearIntervalsOne();
      return;
    }


    player1.style.left = parseInt(player1.style.left) + 1 + dashOne + "px";

  }, 3);
}

function moveLeft1() {
  player1.style.transform = "scaleX(-1)";
  clearIntervalsOne();

  intervalLeftOne = setInterval(function () {
    Checks();
    if (parseInt(player1.style.left) <= 0) {
      clearIntervalsOne();
      return;
    }


    player1.style.left = parseInt(player1.style.left) - 1 - dashOne + "px";
  }, 3);
}

function moveUp1() {
  player1.style.transform = "rotate(-90deg)";
  clearIntervalsOne();

  intervalUpOne = setInterval(function () {
    Checks();
    if (parseInt(player1.style.top) <= 0) {
      clearIntervalsOne();
      return;
    }
    player1.style.top = parseInt(player1.style.top) - 1 - dashOne + "px";

  }, 3);
}

function moveDown1() {
  player1.style.transform = "rotate(90deg)";
  clearIntervalsOne();

  intervalDownOne = setInterval(function () {
    Checks();
    if (parseInt(player1.style.top) >= board.offsetHeight - player1.offsetHeight) {
      clearIntervalsOne();
      return;
    }

    player1.style.top = parseInt(player1.style.top) + 1 + dashOne + "px";

  }, 3);
}

function moveRight2() {
  player2.style.transform = "rotate(0)";
  clearIntervalsTwo();
  intervalRightTwo = setInterval(function () {
    Checks();
    if (parseInt(player2.style.left) >= board.offsetWidth - player2.offsetWidth) {
      clearIntervalsTwo();
      return;
    }


    player2.style.left = parseInt(player2.style.left) + 1 + dashTwo + "px";

  }, 3);
}

function moveLeft2() {
  player2.style.transform = "scaleX(-1)";
  clearIntervalsTwo();

  intervalLeftTwo = setInterval(function () {
    Checks();
    if (parseInt(player2.style.left) <= 0) {
      clearIntervalsTwo();
      return;
    }


    player2.style.left = parseInt(player2.style.left) - 1 - dashTwo + "px";
  }, 3);
}

function moveUp2() {
  player2.style.transform = "rotate(-90deg)";
  clearIntervalsTwo();

  intervalUpTwo = setInterval(function () {
    Checks();
    if (parseInt(player2.style.top) <= 0) {
      clearIntervalsTwo();
      return;
    }
    player2.style.top = parseInt(player2.style.top) - 1 - dashTwo + "px";

  }, 3);
}

function moveDown2() {
  player2.style.transform = "rotate(90deg)";
  clearIntervalsTwo();

  intervalDownTwo = setInterval(function () {
    Checks();
    if (parseInt(player2.style.top) >= board.offsetHeight - player2.offsetHeight) {
      clearIntervalsTwo();
      return;
    }

    player2.style.top = parseInt(player2.style.top) + 1 + dashTwo + "px";

  }, 3);
}


// setInterval(function () {
//   if (greenApples.length >= 1) {
//     return;
//   }
//   var godModeFood = document.createElement("div");
//   godModeFood.style.width = "40px";
//   godModeFood.style.height = "40px";
//   godModeFood.style.backgroundImage = "url(greenapple.gif)";
//   godModeFood.style.backgroundSize = "100%";
//   godModeFood.style.backgroundRepeat = "no-repeat";
//   godModeFood.style.position = "absolute";
//   godModeFood.style.top = (Math.random() * (board.offsetHeight - 40)) + "px";
//   godModeFood.style.left = (Math.random() * (board.offsetWidth - 40)) + "px";
//   greenApples.push(godModeFood);
//   board.appendChild(godModeFood);
// }, 300);

function Initial() {
  player1.style.left = "1px";
  player1.style.top = "1px";
  player2.style.left = "1px";
  player2.style.top = "1px";
  score1.innerHTML = name1 + ": " + counter1;
  score2.innerHTML = name2 + ": " + counter2;

  document.addEventListener("keypress", function (event) {

    switch (event.key) {
      case "w":
        moveUp1();
        break;
      case "a":
        moveLeft1();
        break;
      case "s":
        moveDown1();
        break;
      case "d":
        moveRight1();
        break;
      case "i":
        moveUp2();
        break;
      case "j":
        moveLeft2();
        break;
      case "k":
        moveDown2();
        break;
      case "l":
        moveRight2();
        break;
      case "u":
        dashPlayer2();
        break;
      case "q":
        dashPlayer1();
        break

      default:

    }
  });
  setInterval(function () {
    if (apples.length > 10) {
      return;
    }
    var food = document.createElement("div");
    food.style.width = "40px";
    food.style.height = "40px";
    food.style.backgroundImage = "url(apple.gif)";
    food.style.backgroundSize = "100%";
    food.style.backgroundRepeat = "no-repeat";
    food.style.position = "absolute";
    food.style.top = (Math.random() * (board.offsetHeight - 40)) + "px";
    food.style.left = (Math.random() * (board.offsetWidth - 40)) + "px";
    apples.push(food);
    board.appendChild(food);
  }, 300);
}

function clearIntervalsOne() {
  clearInterval(intervalLeftOne);
  clearInterval(intervalRightOne);
  clearInterval(intervalUpOne);
  clearInterval(intervalDownOne);
}

function clearIntervalsTwo() {
  clearInterval(intervalLeftTwo);
  clearInterval(intervalRightTwo);
  clearInterval(intervalUpTwo);
  clearInterval(intervalDownTwo);
}

function Checks() {
  var player1Top = parseInt(player1.style.top);
  var player1Left = parseInt(player1.style.left);
  var player1Bot = parseInt(player1.style.top) + player1.offsetHeight;
  var player1Right = parseInt(player1.style.left) + player1.offsetWidth;
  var player2Top = parseInt(player2.style.top);
  var player2Left = parseInt(player2.style.left);
  var player2Bot = parseInt(player2.style.top) + player2.offsetHeight;
  var player2Right = parseInt(player2.style.left) + player2.offsetWidth;
  // var greenAppleTop = parseInt(greenApples[0].style.top);
  // var greenAppleLeft = parseInt(greenApples[0].style.left);
  // var greenAppleBot = parseInt(greenApples[0].style.top) + 40;
  // var greenAppleRight = parseInt(greenApples[0].style.left) + 40;
  if (player1Top <= player2Bot && player1Bot >= player2Top) {
    if (player1Left <= player2Right && player1Right >= player2Left) {
      if (player1.offsetHeight > player2.offsetHeight && player1.offsetHeight > 0) {
        document.getElementById("board").style.backgroundColor = "black";
        document.getElementById("winner").innerHTML = name1 + " Wins!";
        clearIntervalsOne();
        clearIntervalsTwo();
      }
    }
  }
  if (player2Top <= player1Bot && player2Bot >= player1Top) {
    if (player2Left <= player1Right && player2Right >= player1Left) {
      if (player2.offsetHeight > player1.offsetHeight && player2.offsetHeight > 0) {
        document.getElementById("board").style.backgroundColor = "black";
        document.getElementById("winner").innerHTML = name2 + " Wins!";
        clearIntervalsOne();
        clearIntervalsTwo();
      }
    }
  }
  for (let i = 0; i < apples.length; i++) {
    var appleTop = parseInt(apples[i].style.top);
    var appleLeft = parseInt(apples[i].style.left);
    var appleBot = parseInt(apples[i].style.top) + 40;
    var appleRight = parseInt(apples[i].style.left) + 40;
    if (player1Top <= appleBot && player1Bot >= appleTop) {
      if (player1Left <= appleRight && player1Right >= appleLeft) {
        board.removeChild(apples[i]);
        apples.splice(i, 1);
        player1.style.width = player1.offsetWidth + 5 + "px";
        player1.style.height = player1.offsetHeight + 5 + "px";
        counter1++;
        score1.innerHTML = name1 + ": " + counter1;
        score2.innerHTML = name2 + ": " + counter2;
      }
    }
    if (player2Top <= appleBot && player2Bot >= appleTop) {
      if (player2Left <= appleRight && player2Right >= appleLeft) {
        board.removeChild(apples[i]);
        apples.splice(i, 1);
        player2.style.width = player2.offsetWidth + 5 + "px";
        player2.style.height = player2.offsetHeight + 5 + "px";
        counter2++;
        score1.innerHTML = name1 + ": " + counter1;
        score2.innerHTML = name2 + ": " + counter2;
      }
    }
  }


  // if (player1Top <= greenAppleBot && player1Bot >= greenAppleTop) {
  //   if (player1Left <= greenAppleRight && player1Right >= greenAppleLeft && godMode1 == false) {
  //     godMode2 = false;
  //     board.removeChild(greenApples[0]);
  //     greenApples.splice(0, 1);
  //     player1.style.filter = "opacity(50%)";
  //     godMode1 = true;
  //   }
  // }
  // if (player2Top <= greenAppleBot && player2Bot >= greenAppleTop) {
  //   if (player2Left <= greenAppleRight && player2Right >= greenAppleLeft && godMode2 == false) {
  //     godMode1 = false;
  //     board.removeChild(greenApples[0]);
  //     greenApples.splice(0, 1);
  //     player2.style.filter = "opacity(50%)";
  //     godMode2 = true;
  //   }
  // }
}

function dashPlayer2() {
  if (canDash2) {
    canDash2 = false;
    dashTwo = 1;
    setTimeout(function () {
      dashTwo = 0;
    }, 800);
    setTimeout(function () {
      canDash2 = true;
    }, 4000);
  }
}

function dashPlayer1() {
  if (canDash1) {
    canDash1 = false;
    dashOne = 1;
    setTimeout(function () {
      dashOne = 0;
    }, 800);
    setTimeout(function () {
      canDash1 = true;
    }, 4000);
  }

}