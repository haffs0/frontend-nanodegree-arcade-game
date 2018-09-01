// Enemies our player must avoid
var Enemy = function(x, y) {
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

Enemy.prototype.stop = function() {
    clearInterval(this.interval);
}
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
    enemy1.update(1);    
    enemy2.update(1.5);
    enemy3.update(1.8);
    enemy4.update(1.2);    
    enemy5.update(1.5);
    enemy6.update(0.5);      
}
  
// Now write your own player class
var Player = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
   //this.interval = setInterval(playerUpdate, 1000);
};

// This class requires an update(), render() and
// a handleInput() method.
//update section of player and enemies when they collide
Player.prototype.update = function() {
    var position = this;
    allEnemies.forEach(function(enemy) {
        var xMeet = Math.abs(position.x - enemy.x);
        var yMeet = Math.abs(position.y - enemy.y);
        console.log(xMeet);
        console.log(yMeet);
        if (xMeet < 60 && yMeet < 60) {
            position.x = 200;
            position.y = 390; 
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
        this.x = 200;
        this.y = 390;
        alert("you win");
    }

};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
     var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Now instantiate your objects.
let enemy1 = new Enemy(0, 60);
let enemy2 = new Enemy(0, 145);
let enemy3 = new Enemy(0, 225);
let enemy4 = new Enemy(0, 60);
let enemy5 = new Enemy(200, 145);
let enemy6 = new Enemy(200, 225);
// Place all enemy objects in an array called allEnemies
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
// Place the player object in a variable called player
let player = new Player(200, 390);