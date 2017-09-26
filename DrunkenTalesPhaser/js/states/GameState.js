var DrunkenTales = DrunkenTales || {};

//crate: 106x106y
//ground: 128x?y
//water: 128x99

DrunkenTales.GameState = {
    init: function () {
        //setting layout properties
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignVertically = true;
        this.scale.pageAlignHorizontally = true;

        //start Phaser's game physics engine
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;

        //setting the listeners to the keyboard cursors
        this.cursors = this.game.input.keyboard.createCursorKeys();

        //setting view limits
        this.game.world.setBounds(0, 0, 8000, 750);

    },

    preload: function () {
        //loading game static images
        this.load.image('bg', 'assets/images/bg.png');
        this.load.image('ground1', 'assets/images/ground1.png');
        this.load.image('ground2', 'assets/images/ground2.png');
        this.load.image('ground3', 'assets/images/ground3.png');
        this.load.image('ground4', 'assets/images/ground4.png');
        this.load.image('ground5', 'assets/images/ground5.png');
        this.load.image('ground6', 'assets/images/ground6.png');
        this.load.image('bush1', 'assets/images/bush1.png');
        this.load.image('bush2', 'assets/images/bush2.png');
        // this.load.image('goal', 'assets/images/goal.png');
        this.load.image('crate', 'assets/images/crate.png');
        this.load.image('water', 'assets/images/water.png');
        this.load.image('ship', 'assets/images/ship.png');

        //loading game spriteSheets
        //parameters: alias, url, width, height, number of frames, margin, space between
        this.load.spritesheet('player', 'assets/images/player.png', 65, 74, 6, 1, 11);
        this.load.spritesheet('pirateZombie', 'assets/images/pirateZombie.png', 24, 45, 3, 0, 6);

        //loading json file with game configuration
        this.load.text('level', 'assets/data/level.json');
    },

    create: function () {
        //getting game configuration from json file loaded on preload
        this.levelData = JSON.parse(this.game.cache.getText('level'));

        //calls the function that renders the game
        this.createGameSet();

        //adding Player to the game
        this.player = new DrunkenTales.Player(this.game, this.levelData, this.cursors);
        this.game.add.existing(this.player);

        //calling crates creation
        this.createCrates(this.levelData);

        //calling the function that returns the enemies
        this.createEnemies();

        //calling the function that returns the ship (goal)
        this.createShip();

    },

    createGameSet: function () {
        //creating the ground from preload sprite

        this.bg = this.add.group();
        for (i = 0; i < 8; i++) {
            this.bg.create(i * 1000, 0, 'bg')
        }

        //Rendering the data from level.json
        var groundData = this.levelData.groundData;


        //rendering water

        this.water = this.add.group();
        this.water.enableBody = true;

        for (var i = 0; i < 80; i++) {
            this.water.create(i * 128, 710, 'water')
        }

        this.water.setAll('body.immovable', true);
        this.water.setAll('body.allowGravity', false);

        //Rendering ground
        var currentGround;
        var previousGround;
        var i = 0;
        this.ground = this.add.group();
        this.ground.enableBody = true;
        groundData.forEach(function (element) {
            i = i + 1;
            var nextGround = groundData[i];
            currentGround = element;
            if (element.y != 690) {
                if ((previousGround === undefined || currentGround.x - 1 != previousGround.x || previousGround.y != currentGround.y)) {
                    this.ground.create(element.x * 128, element.y, 'ground4');
                }
                else if (!nextGround || currentGround.x + 1 != nextGround.x || nextGround.y != currentGround.y) {
                    this.ground.create(element.x * 128, element.y, 'ground6');
                }
                else {
                    this.ground.create(element.x * 128, element.y, 'ground5');
                }
            } else if ((previousGround === undefined || currentGround.x - 1 != previousGround.x) || previousGround.y != currentGround.y) {
                this.ground.create(element.x * 128, element.y, 'ground1');
            }
            else if (!nextGround || currentGround.x + 1 != nextGround.x || nextGround.y != currentGround.y) {
                this.ground.create(element.x * 128, element.y, 'ground3');
            }
            else {
                this.ground.create(element.x * 128, element.y, 'ground2');
            }
            previousGround = element;
        }, this);

        this.ground.setAll('body.immovable', true);
        this.ground.setAll('body.allowGravity', false);
        this.ground.setAll('body.isPixelPerfect', true);

        //adding physics engine to the ground
        this.game.physics.arcade.enable(this.ground);



    },

    createEnemies: function () {
        this.createZombies();

    },

    //Function that adds crates from the json file level.json (parameter passed: this.levelData)
    createCrates: function (data) {
        //creating crates
        this.crates = this.add.group();
        this.crates.scale.setTo(0.5);
        this.crates.enableBody = true;

        var crate;

        data.cratesData.forEach(function (element, index) {
            crate = this.crates.create(element.x * 106, element.y, 'crate');
        }, this);

        this.crates.setAll('body.allowGravity', false);
        this.crates.setAll('anchor.setTo', 0.5);
        this.crates.setAll('body.immovable', true);
    },

    createZombies: function () {
        this.zombies = this.add.group();
        this.zombies.scale.setTo(1,2);
        this.zombies.enableBody = true;

        var zombie;

        this.levelData.zombiePiratesData.forEach(function(element) {
            // zombie = new DrunkenTales.PirateZombie(this.game, element);
            // this.game.add.existing(zombie);
            // console.log(zombie);
            zombie = this.zombies.create(element.x, element.y, 'pirateZombie');
            zombie.animations.add('roaming', [0, 1], 2, true);
            zombie.body.velocity.x = -100;
            zombie.play('roaming');
        },this);

        this.zombies.setAll('body.allowGravity', false);

        console.log(this.zombies);
    },

    killPlayer: function () {
        /**
                      __
                 .___( .)< (MEOW)
                  \____)
         ˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜
         */
        console.log('dead bitch');
        game.state.start('GameState');
    },

    createShip: function () {
        this.ship = this.game.add.sprite(this.levelData.ship.x, this.levelData.ship.y, 'ship');

        this.game.physics.arcade.enable(this.ship);

        this.ship.body.allowGravity = false;

        this.ship.scale.setTo(-0.5, 0.5);
        this.ship.anchor.setTo(0.5);

    },

    win: function (player, ship) {
        if (player.body.touching.down && ship.body.touching.up) {
            console.log('win salabim');
        }
        if (player.body.touching.left || player.body.touching.right) {
            console.log('ddusahudhsua');
        }
    },

    update: function () {
        //setting collision between sprites
        this.game.physics.arcade.collide(this.player, this.ground);
        this.game.physics.arcade.collide(this.zombies, this.ground);
        this.game.physics.arcade.collide(this.player, this.crates);

        //setting death penalties to player when touches fire or barrel

        this.game.physics.arcade.overlap(this.player,this.water,this.killPlayer);


        //setting the reward after the ship is reached
        this.game.physics.arcade.collide(this.player, this.ship, this.win);
    },


}