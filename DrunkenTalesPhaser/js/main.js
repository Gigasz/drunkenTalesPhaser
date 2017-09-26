var game = new Phaser.Game(1000,600,Phaser.AUTO);

game.state.add('GameState',DrunkenTales.GameState);
game.state.add('StartState',DrunkenTales.StartState);
game.state.start('StartState');