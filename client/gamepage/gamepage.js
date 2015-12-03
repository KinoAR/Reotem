Template.gamepage.onRendered(function(){

var game = new Phaser.Game(500, 500, Phaser.AUTO, 'game-area');
EasyStar.js();
//console.log(easystar);
//Important global variables
var map;
var layer;
var mainChar = null;
var mainEnemy = null;
var currentEnemyTileX;
var currentEnemyTileY; 
var currentPlayerTileX;
var currentPlayerTileY;
var currentNextPointX; // next movement point in X
var currentNextPointY; // next movement point in Y
var enemyDirection = "STOP";

var BootState = {
  create: function ()
  {
    //Start Physics System
    game.physics.startSystem(Phaser.Physics.Arcade);
    //Start load state
    game.state.start('load');
  }
}
//Preload Game State
var LoadState = {
  //Load all the necessary Images and files
  preload: function() {
    game.load.image('background',"assets/gamebackground.jpg");
    //use CSV or base64 format Loading tilemap from json file
    game.load.tilemap('demo',"assets/tilemaps/demolevel.json", null, Phaser.Tilemap.TILED_JSON); 
    game.load.image('demotiles', "assets/tilemaps/dungeon_tiles.png");
    game.load.spritesheet('mainCharacter', "assets/dude.png",32, 48, 9);
    game.load.image('ship', "assets/testShip.png");
    game.load.image('enemy', "assets/knifeguy.png");

  },

  create: function() {
    //Start Menu State
    game.state.start('menu');
  }
};

//Menu State
var MenuState = {

  create: function() {
    /*Game title and menu text */
    let gameTitle = game.add.text(100, 100, "Reotem", {font:'50px Arial', fill:'#ffffff'});

    //Start main game state
    game.state.start('play');
  }
};

//Main Game State
var PlayState = {

  	create: function() {

      //Add Tilemap
      map = game.add.tilemap('demo');
      map.addTilesetImage('dungeon_tiles','demotiles');
      console.log(map);
      layer = map.createLayer('level1');
      layer.debug = true;
      console.log(map);


      //Set Up Layer collisions between specific layer indexes -- Tile ID + 1
      map.setCollision([48, 49, 50, 51, 52, 53, 72, 76, 94, 95, 99, 118, 122, 141, 142, 143, 144, 145, 234, 256, 258, 279, 280, 281]);

      //Set up Level grid
      var level = [];
      for(let y = 0; y < map.height; y++){
        //Add a new array for the row
        level.push([]);
        for(let x = 0; x < map.width; x++){
          //Check tile against layer collisions
          let value = 0;
          if(map.collideIndexes.some(function(element){
            let trueFalse = false;
            if(map.getTile(x,y).index == element)
              trueFalse = true;
            else
              trueFalse = false;
            return trueFalse;
          }))
            value = 1;
          else
            value = 0;
          level[y].push(value);
        }
      }

  		//Add background
  		//game.add.sprite(0, 0,'background');

      //Setup game character
  		mainChar = game.add.sprite(50, 200, 'ship');
  		mainChar.anchor.setTo(0.5, 0.5); //Places anchors in the middle of the sprite
  		mainChar.angle += 90; //Adjust sprite angle
      mainChar.scale.setTo(0.09,0.09);

      //Setup game enemy
      mainEnemy = game.add.sprite(375, 425, 'enemy'); //position on canvas & sprite name
      mainEnemy.anchor.setTo(0.5,0.5);
      mainEnemy.scale.setTo(0.90, 0.90);

  		//Setting player & enemy physics
  		game.physics.arcade.enable(mainChar);
      game.physics.arcade.enable(mainEnemy);
  		mainChar.body.maxVelocity = 200; //Player maximum velocity
      mainEnemy.body.maxVelocity = 300; //Enemy maximum velocity
  		//Set World Gravity
  		game.physics.arcade.gravity.y = 0;

    
  		//Game Input
  		cursors = game.input.keyboard.createCursorKeys();
  		game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR ]);

      //Set up EasyStar
      EasyStar.setGrid(level);
      EasyStar.setAcceptableTiles([0]);
      setInterval(function(){
        EasyStar.findPath(currentEnemyTileX, currentEnemyTileY, currentPlayerTileX, currentPlayerTileY , function( path ) {
        if (path === null) {
          console.log("Path was not found.");
        } else {
        console.log("Path was found. The first Point is " + path[0].x + " " + path[0].y);
        currentNextPointX = path[1].x;
        currentNextPointY = path[1].y;
        }
        if (currentNextPointX < currentEnemyTileX && currentNextPointY < currentEnemyTileY) {
                // left up 
                console.log("GO LEFT UP"); 
                 enemyDirection = "NW";
              }
        else if (currentNextPointX == currentEnemyTileX && currentNextPointY < currentEnemyTileX) {
                // up
                console.log("GO UP");
                enemyDirection = "N";
              }
        else if (currentNextPointX > currentEnemyTileY && currentNextPointY < currentEnemyTileY) {
                // right up
                console.log("GO RIGHT UP");
                enemyDirection = "NE";
              }
        else if (currentNextPointX < currentEnemyTileX  && currentNextPointY == currentEnemyTileY) {
                // left
                console.log("GO LEFT");
                enemyDirection = "W";
              }
        else if (currentNextPointX > currentEnemyTileX && currentNextPointY == currentEnemyTileY) {
                // right
                console.log("GO RIGHT");
                enemyDirection = "E";
                }
        else if (currentNextPointX > currentEnemyTileX && currentNextPointY > currentEnemyTileY) {
                // right down 
                console.log("GO RIGHT DOWN");
                enemyDirection = "SE"; 
                }
        else if (currentNextPointX == currentEnemyTileX && currentNextPointY > currentEnemyTileY) {
                // down   
                console.log("GO DOWN");
                enemyDirection = "S";
                }
        else if (currentNextPointX < currentEnemyTileX && currentNextPointY > currentEnemyTileY) {
                // left down 
                console.log("GO LEFT DOWN");
                enemyDirection = "SW"; 
                }
                else {
                  
                  enemyDirection = "STOP";
                }
                
      });
      EasyStar.setIterationsPerCalculation(400);
      EasyStar.calculate();
    });
     
  	},

  	update: function() {
  		//Game Logic such as player input

      //Set collision between player and tile layer
      game.physics.arcade.collide(mainChar, layer);
      game.physics.arcade.collide(mainChar, mainEnemy);
      game.physics.arcade.collide(mainEnemy, layer);

      //playerMovement

      //Reset Player Velocity
  		mainChar.body.velocity.x = 0;
      mainChar.body.velocity.y = 0;
  		
  		if(cursors.up.isDown)
  		{
  			mainChar.body.velocity.y = -150;
  		}
  		else if(cursors.right.isDown)
  		{
  			mainChar.body.velocity.x = 150;
  		}
  		else if(cursors.left.isDown)
  		{
  			mainChar.body.velocity.x = - 150;
  		}
  		else if(cursors.down.isDown)
  		{
  			mainChar.body.velocity.y = 150;
  		}

      // Move the ENEMY
          var enemySpeed = 90;
         
          if (enemyDirection == "N") {
            mainEnemy.body.velocity.x = -enemySpeed;
            mainEnemy.body.velocity.y = -enemySpeed;
          }
          else if (enemyDirection == "S")
          {
            mainEnemy.body.velocity.x = enemySpeed;
            mainEnemy.body.velocity.y = enemySpeed;
          }
          else if (enemyDirection == "E") {
            mainEnemy.body.velocity.x = enemySpeed;
            mainEnemy.body.velocity.y = -enemySpeed;
          }
          else if (enemyDirection == "W")
          {
            mainEnemy.body.velocity.x = -enemySpeed;
            mainEnemy.body.velocity.y = enemySpeed;
          }
          else if (enemyDirection == "SE")
          {
            mainEnemy.body.velocity.x = enemySpeed;
            mainEnemy.body.velocity.y = 0;
          }
          else if (enemyDirection == "NW")
          {
            mainEnemy.body.velocity.x = -enemySpeed;
            mainEnemy.body.velocity.y = 0;     
          }
          else if (enemyDirection == "SW")
          {
            mainEnemy.body.velocity.x = 0;
            mainEnemy.body.velocity.y = enemySpeed;      
          }
         
          else if (enemyDirection == "NE")
          {
            mainEnemy.body.velocity.x = 0;
            mainEnemy.body.velocity.y = -enemySpeed;
          }
          else if (enemyDirection == "STOP")
          {
            mainEnemy.body.velocity.x = 0;
            mainEnemy.body.velocity.y = 0;
          }
          else // JUST IN CASE IF enemyDirection wouldnt exist we stop the mainEnemy movement
          {
            mainEnemy.body.velocity.x = 0;
            mainEnemy.body.velocity.y = 0;
          }
      //Update Path Position
      currentEnemyTileX = Math.floor(mainEnemy.body.x / map.tileWidth);
      currentEnemyTileY = Math.floor(mainEnemy.body.y / map.tileHeight);
      currentPlayerTileX = Math.floor(mainChar.body.x /map.tileWidth);
      currentPlayerTileY = Math.floor(mainChar.body.y / map.tileHeight);
  	}
      
 };

 //Win State
 var WinState = {

 };
/* Start Game Progressing
  --------------------------------------------------------------------------
*/

//Add Game States
game.state.add('boot', BootState);
game.state.add('load', LoadState);
game.state.add('menu', MenuState);
game.state.add('play', PlayState);
game.state.add('win', WinState);

//Start the game
game.state.start('boot');
});