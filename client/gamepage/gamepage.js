Template.gamepage.onRendered(function(){
var game = new Phaser.Game(500, 500, Phaser.AUTO, 'game-area');

//Important global variables
var map;
var layer;
var mainChar = null;
var mainEnemy = null;

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

      //Set Up Layer collisions between specific layer indexes -- Tile ID + 1
      map.setCollision([48, 49, 50, 51, 52, 53, 72, 76, 94, 95, 99, 118, 122, 141, 142, 143, 144, 145, 234, 256, 258, 279, 280, 281]);

  		//Add background
  		//game.add.sprite(0, 0,'background');

      //Setup game character
  		mainChar = game.add.sprite(50, 200, 'ship');
  		mainChar.anchor.setTo(0.5, 0.5); //Places anchors in the middle of the sprite
  		mainChar.angle += 90; //Adjust sprite angle
      mainChar.scale.setTo(0.10,0.10);

      //Setup game enemy

  		//Setting player physics
  		game.physics.arcade.enable(mainChar);
  		mainChar.body.maxVelocity = 200; //Player maximum velocity

  		//Set World Gravity
  		game.physics.arcade.gravity.y = 0;
  		//Game Input
  		cursors = game.input.keyboard.createCursorKeys();
  		game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR ]);


  	},

  	update: function() {
  		//Game Logic such as player input

      //Set collision between player and tile layer
      game.physics.arcade.collide(mainChar, layer);
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