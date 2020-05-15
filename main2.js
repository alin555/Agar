var intervalLeftOne;
var intervalRightOne;
var intervalUpOne;
var intervalDownOne;
var board = document.getElementById("board");
var serverUrl = "http://" + window.location.hostname + ":3000";
var currentApples = [];
var myId;
var player1 = document.getElementById("player");


function Initial() {

    player1.style.left = "1px";
    player1.style.top = "1px";

    $.get(serverUrl + "/login", function (data) {
        myId = data;
        move("none");
    });
    document.getElementById("board").style.display = "block";
    document.getElementById("names").style.display = "none";


    document.addEventListener("keypress", function (event) {
        switch (event.key) {
            case "w":
                clearInterval(moveInterval);
                player1.style.transform = "rotate(-90deg)";

                move("up");
                break;
            case "a":
                clearInterval(moveInterval);
                player1.style.transform = "scaleX(-1)";

                move("left");
                break;
            case "s":
                clearInterval(moveInterval);
                player1.style.transform = "rotate(90deg)";


                move("down");
                break;
            case "d":
                clearInterval(moveInterval);
                player1.style.transform = "rotate(0)";

                move("right");
                break;
            default:

        };
    });
};

function move(direction) {
    moveInterval = setInterval(() => {
        $.get(serverUrl + "/move?id=" + myId + "&direction=" + direction, function (data) {
            updateBoard(data);

        });
    }, 25);


};

//////// update players and apples on the board

function updateBoard(data) {
    $(".playerRemove").remove();
    data.players.forEach(player => {
        if (player.id != myId) {
            var divPlayer = document.createElement("div");
            divPlayer.className = "player playerRemove";
            divPlayer.style.width = player.size + "px";
            divPlayer.style.height = player.size + "px";
            divPlayer.style.top = player.positionY + "px";
            divPlayer.style.left = player.positionX + "px";

            switch (player.direction) {
                case "up":
                    divPlayer.style.transform = "rotate(-90deg)";

                    break;
                case "down":
                    divPlayer.style.transform = "rotate(90deg)";
                    break;
                case "left":
                    divPlayer.style.transform = "scaleX(-1)";
                    break;
                case "right":
                    divPlayer.style.transform = "rotate(0)";
                    break;

                default:
                    break;
            }

            board.appendChild(divPlayer);

        } else {
            player1.style.top = player.positionY + "px";
            player1.style.left = player.positionX + "px";
            player1.style.width = player.size + "px";
            player1.style.height = player.size + "px";

        }

    });
    $(".appleRemove").remove();

    data.apples.forEach(apple => {
        var newApple = document.createElement("div");
        newApple.className = "appleRemove";

        newApple.style.width = apple.size + "px";
        newApple.style.height = apple.size + "px";
        newApple.style.backgroundImage = "url(apple.gif)";
        newApple.style.backgroundSize = "100%";
        newApple.style.backgroundRepeat = "no-repeat";
        newApple.style.position = "absolute";
        newApple.style.top = apple.positionY + "px";
        newApple.style.left = apple.positionX + "px";

        board.appendChild(newApple);
    });

};