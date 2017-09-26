//Calling DrunkenTales State
var DrunkenTales = DrunkenTales || {};

//Setting Player's class in MonsterKong's state
DrunkenTales.Player = function (game, data, cursors) {
    //this = Player!

    //Constructor for Player's class
    //Phaser.Sprite.call parameters: (this, game, x, y, key, frame);
    Phaser.Sprite.call(this, game, data.player.x, data.player.y, 'player', 3);

    //setting info to the Player object
    this.data = data;
    this.cursors = cursors;

    //setting Player's anchor
    this.anchor.setTo(0.5);

    //parameters: (key, frames, fps, loop)
    this.animations.add('walking',[0,1,2,3,4,5,4,3,2,1], 6, true);

    //enabling game physics
    game.physics.arcade.enable(this);

    //setting custom info about Player
    this.customParams = {};

    //setting player to unable to go offscreen
    this.body.collideWorldBounds = true;

    //setting camera to follow player up
    game.camera.follow(this);

    this.scale.setTo(0.75);

};

//Setting Player's prototype methods the same as in phaser's sprites
DrunkenTales.Player.prototype = Object.create(Phaser.Sprite.prototype);

//Setting Player's constructor as the function set above
DrunkenTales.Player.prototype.constructor = DrunkenTales.Player;

//Setting Player's custom shit
DrunkenTales.Player.prototype.update = function () {
    //setting initial speed
    this.body.velocity.x = 0;


    if (this.cursors.left.isDown) {
        //setting speed when left cursor is pressed
        //getting speed from json
        this.body.velocity.x = - this.data.player.RUNNING_SPEED;
        //setting player's sprite direction
        this.scale.setTo(0.75, 0.75);
        //setting walking spritesheet to run
        this.play('walking');
    } else if (this.cursors.right.isDown) {
        //getting speed from json
        this.body.velocity.x = this.data.player.RUNNING_SPEED;
        //setting player's sprite direction
        this.scale.setTo(-0.75, 0.75);
        //setting walking spritesheet to run
        this.play('walking');
    } else {
        //making animation stop when walking key is released
        this.animations.stop();
        this.frame = 5;
    }

    //setting jump command && jump condition
    if ((this.cursors.up.isDown) && this.body.touching.down) {
        //loading player's jump speed from json
        this.body.velocity.y = - this.data.player.JUMPING_SPEED;
    }
}