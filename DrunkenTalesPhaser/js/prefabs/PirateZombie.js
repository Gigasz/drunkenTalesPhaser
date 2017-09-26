//Calling DrunkenTales State
var DrunkenTales = DrunkenTales || {};

//Setting PirateZombie's class in MonsterKong's state
DrunkenTales.PirateZombie = function (game, data, player, ground) {
    //this = Zombie!
    console.log(data);

    //Constructor for zombie's class
    //Phaser.Sprite.call parameters: (this, game, x, y, key, frame);
    Phaser.Sprite.call(this, game, data.x, data.y, 'pirateZombie', 3);

    //setting info to the Zombie object
    this.data = data;

    //setting Zombie's anchor
    this.anchor.setTo(0.5);

    //parameters: (key, frames, fps, loop)
    this.animations.add('roaming', [0, 1], 2, true);

    //enabling game physics
    game.physics.arcade.enable(this);


    //setting custom info about Zombie
    this.customParams = {};

    this.scale.setTo(1.2);
}

//Setting PirateZombie's prototype methods the same as in phaser's sprites
DrunkenTales.PirateZombie.prototype = Object.create(Phaser.Sprite.prototype);

//Setting PirateZombie's constructor as the function set above
DrunkenTales.PirateZombie.prototype.constructor = DrunkenTales.PirateZombie;

//Setting PirateZombie's custom shit
DrunkenTales.PirateZombie.prototype.update = function () {
    //setting initial speed

    this.body.velocity.x = -100;

    this.play('roaming');
}