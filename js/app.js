// Enemies our player must avoid
'use strict'
let Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.sprite = 'images/enemy-bug.png';
    this.interval = setInterval(updateGameArea, 50);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt
     if (this.x > 505) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//enemy update
function updateGameArea() {
    allEnemies.forEach(function(enemy) {
        enemy.update(Math.random() * 8)
    });  
}
  
// Now write your own player class
let Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = 200;
    this.y = 390;
    this.sprite = 'images/char-boy.png';
   //this.interval = setInterval(playerUpdate, 1000);
};

// This class requires an update(), render() and
// a handleInput() method.
//Reset the player position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 390;
}

//update section of player and enemies when they collide
Player.prototype.update = function() {
    const position = this;
    allEnemies.forEach(function(enemy) {
        let xMeet = Math.abs(position.x - Math.floor(enemy.x));
        let yMeet = Math.abs(position.y - enemy.y);
        if (xMeet < 75 && yMeet < 75) {
            position.reset();
        }
    });
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//key movement for the player
Player.prototype.handleInput = function(ev){ 

    //Move left
    if(ev === 'left' && this.x > 0) {
        this.x = this.x -100;
    }

    //Move up
    if(ev === 'up' && this.y > 0) {
        this.y = this.y - 78;
    }

    //Move right
    if(ev === 'right' && this.x < 400) {
        this.x = this.x + 100;
    }

    //Move down
    if(ev === 'down' && this.y < 380) {
        this.y = this.y + 78; 
    }

    //if the player reached the water
    if (this.y === 0) {
        this.reset();
        alert("you win");
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
     const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Place all enemy objects in an array called allEnemies
let allEnemies = [
    new Enemy(0, 60),
    new Enemy(0, 145),
    new Enemy(0, 225),
    new Enemy(0, 60),
    new Enemy(200, 145),
    new Enemy(200, 225)
];
// Place the player object in a variable called player
let player = new Player();
