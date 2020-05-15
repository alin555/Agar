const express = require("express");

const app = express();

var port = 3000;
const boardHeight = 900;
const boardWidth = 1200;
var players = [];
var apples = [];
var counter = 0;
var safeArea = 200;


app.use("/", express.static(__dirname + "/"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/login", function (req, res) {
    var newPlayer = new Player(counter, 1, 1, 70, 0, "none");
    players.push(newPlayer);
    res.send(counter.toString());
    counter++;

});

app.get("/move", function (req, res) {

    const id = req.query.id;
    const direction = req.query.direction;
    players[id].direction = direction;
    var data = {};

    data.players = players;
    data.apples = apples;
    res.send(data);

});

setInterval(() => {
    players.forEach(player => {
        maxSize = [];
        /////////// Eating apples
        apples.forEach((apple, index) => {


            if (player.positionY <= (apple.positionY + apple.size) && (player.positionY + player.size) >= apple.positionY) {
                if (player.positionX <= (apple.positionX + apple.size) && (player.positionX + player.size) >= apple.positionX) {

                    apples.splice(index, 1);
                    player.size += 5;
                    player.score++;
                }
            }
        });

        ////////////// Eating players
        players.forEach(enemy => {
            if (enemy.id == player.id) {
                return;
            }

            if (player.positionY <= (enemy.positionY + enemy.size) && (player.positionY + player.size) >= enemy.positionY) {

                if (player.positionX <= (enemy.positionX + enemy.size) && (player.positionX + player.size) >= enemy.positionX) {

                    if (player.positionX > safeArea || player.positionY > safeArea) {

                        if (player.size > enemy.size) {

                            if(player.size < boardHeight/2) {
                                player.size += 15;
                            } 

                            enemy.size = 70;
                            enemy.positionX = 1;
                            enemy.positionY = 1;
                            player.score += 2;

                            players.forEach(max => {
                                maxSize.push(max.size);
                            });

                            safeArea = Math.max(...maxSize) + 100;
                            

                        } else if (player.size < enemy.size) {

                            if(enemy.size < boardHeight/2) {
                                enemy.size += 15;
                            } 
                            player.size = 70;
                            player.positionX = 1;
                            player.positionY = 1;
                            enemy.score += 2;

                            players.forEach(max => {
                                maxSize.push(max.size);
                            });  

                            safeArea = Math.max(...maxSize) + 100;
                            
                        }
                    }

                }
            }

        });

        // change move direction

        if (player.positionX >= (boardWidth - player.size)) {
            player.direction = "none";
            player.positionX = (boardWidth - player.size) - 1;
        } else if (player.positionX <= 0) {
            player.direction = "none";
            player.positionX = 1;
        } else if (player.positionY >= (boardHeight - player.size)) {
            player.direction = "none";
            player.positionY = (boardHeight - player.size) - 1;
        } else if (player.positionY <= 0) {
            player.direction = "none";
            player.positionY = 1;
        }

        switch (player.direction) {
            case "up":
                player.positionY--;

                break;
            case "down":
                player.positionY++;

                break;
            case "left":
                player.positionX--;

                break;
            case "right":

                player.positionX++;
                break;

            default:
                break;
        }

    });

}, 3);

////////// Create random apples

setInterval(() => {
    if (apples.length < 10) {

        const y = Math.floor((Math.random() * (boardHeight - 40)));
        const x = Math.floor((Math.random() * (boardWidth - 40)));

        const newApple = new Apple(y, x, 40);
        apples.push(newApple);
    }
}, 2000);

function Player(id, positionX, positionY, size, score, direction) {
    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
    this.size = size;
    this.score = score;
    this.direction = direction;
};

function Apple(positionY, positionX, size) {
    this.positionY = positionY;
    this.positionX = positionX;
    this.size = size;
};

app.listen(port, function (req, res) {
    console.log("server is on port " + port);
});