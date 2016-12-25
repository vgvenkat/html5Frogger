var gameOver = false;
var $gameStatus = document.querySelector(".gameStatus");
$gameStatus.style.display = 'none';
var statusText = ["Game Over! Refresh to restart game", "You won! Continue Playing😎"];
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;

};
var randomInRange = function(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}
var enemyY = [70,150,220];
var Enemyspawn = function() {
    if (allEnemies.length == 3) {
        allEnemies = [];
    }
    for (var i=0; allEnemies.length<3;i++) {
        var enemy2 = new Enemy();
        enemy2.x = 0;
        enemy2.y = enemyY[randomInRange(0,2)];
        enemy2.speed = Math.floor((Math.random()*500));
        allEnemies.push(enemy2);
    }
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    this.x = this.x + ( this.speed*dt);
    
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
   // console.log('rendering')
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.direction = {
        'up' : -100,
        'down': 100,
        'left': -100,
        'right': 100
    };
}

Player.prototype.update = function() {
    this.checkCollisions();
    if(gameOver){
     this.reset();
     $gameStatus.innerHTML = statusText[0];
     $gameStatus.className = "gameStatus red";
     $gameStatus.style.display = 'block';
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keycode) {
    // var self = this;
    // var x = 0, y = 0;
    // if (keycode == 'left' || keycode == 'right')
    //     x = this.direction[keycode];
    // else 
    //     y = this.direction[keycode];
    // console.log(keycode, x,y)
    // this.update(x,y);
    switch(keycode) {
    case 'up' : if (this.y == 40){
                    _this = this;
                    this.y -= 90;
                    setTimeout(function(){
                      //to cut out the floating head when reached water
                      ctx.clearRect(0, 0, 505, 100);
                         $gameStatus.innerHTML = statusText[1];
                         $gameStatus.className = "gameStatus green";
                         $gameStatus.style.display = 'block';
                        _this.reset();

                      }, 200);
                    }
                else this.y -= 90; break;
    case 'down': if (this.y == 400) break;
                else this.y += 90; break;
    case 'right' : if (this.x == 400) break;
                  else this.x += 100; break;
    case 'left' : if(this.x == 0) break;
                  else this.x -=100; break;
  }
}
Player.prototype.checkCollisions = function() {
     //if both player and bug in same x,y range
  // then reset
  for(var i=0;i<allEnemies.length;i++) {
      if( (Math.abs(player.x - allEnemies[i].x) <=20)
        && (Math.abs(player.y - allEnemies[i].y) <= 30) ){
        gameOver = true;
        console.log('Enemny', allEnemies[i].x, allEnemies[i].y)
        console.log('Player', player.x, player.y)
        }
    }
}

//if player reaches water reset maintain scores
//if player collision reset, scores 0.
Player.prototype.reset = function() {
    console.log('reseting player');
    this.x = 200;
    this.y = 400;

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
//initial Enemy List
Enemyspawn()

setInterval(() => {
    Enemyspawn()
}, 2000)
var player = new Player();
player.x = 200;
player.y = 400;

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
