/*Run this code when the template is rendered */
Template.gamepage.onRendered(function(){
var game = new Phaser.Game(800, 500, Phaser.AUTO, 'game-area');
  
 //Important global variables
var mainChar = null;

var GameState = {
  	preload: function() {
  		this.load.image('background',"assets/gamebackground.jpg");
  		this.load.spritesheet('mainCharacter', "assets/dude.png",32, 48, 9);
  		this.load.image('ship', "assets/testShip.png");

  	},

  	create: function() {
  		//Start physics system
  		game.physics.startSystem(Phaser.Physics.Arcade);

  		//Add background
  		this.add.sprite(0, 0,'background');

  		mainChar = this.add.sprite(100, 100, 'ship');//this.add.sprite(288,48,'mainCharacter');
  		mainChar.anchor.setTo(0.5, 0.5); //Places anchors in the middle of the sprite
  		mainChar.angle += 90; //Adjust sprite angle
  		// mainChar.animations.add('walk');
  		// mainChar.animations.play('walk', 10, true);

  		//Setting player physics
  		game.physics.arcade.enable(mainChar);
  		mainChar.body.maxVelocity = 200; //Player maximum velocity
  		mainChar.body.gravity.y = 50;

  		//Set World Gravity
  		game.physics.arcade.gravity.y = 0;
  		//Game Input
  		cursors = game.input.keyboard.createCursorKeys();
  		game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR ]);

  	},

  	update: function() {
  		//Game Logic such as player input

  		mainChar.body.velocity.x = 0;
  		//playerMovement
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

 game.state.add('GameState', GameState);
 game.state.start('GameState');
});