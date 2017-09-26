var DrunkenTales = DrunkenTales || {};

DrunkenTales.StartState = {
    init: function () {
        //setting layout properties
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignVertically = true;
        this.scale.pageAlignHorizontally = true;

        //start Phaser's game physics engine
        //this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //this.game.physics.arcade.gravity.y = 1000;

        //setting the listeners to the keyboard cursors
        this.cursors = this.game.input.keyboard.createCursorKeys();

        //setting view limits
        //this.game.world.setBounds(0,0,8000,750);

    },

    preload: function () {
        //loading game static images
        this.load.image('bg','assets/images/StartBackground.png');
        this.load.image('logo','assets/images/StartLogo.png');
        this.load.image('button','assets/images/StartButton.png');

    },

    create: function () {

        this.background = this.game.add.sprite(0,0,'bg');

        this.logo = this.game.add.sprite(this.game.world.centerX,150,'logo');
        this.logo.anchor.setTo(0.5);

        this.btn = this.game.add.sprite(this.game.world.centerX, 360, 'button');
        this.btn.anchor.setTo(0.5);

        this.btn.inputEnabled = true;
        this.btn.input.pixelPerfectClick = true;
        this.btn.events.onInputDown.add(this.startGame,this);


    },

    update: function () {

    },

    startGame: function() {
        this.game.state.start('GameState');
    },

}
