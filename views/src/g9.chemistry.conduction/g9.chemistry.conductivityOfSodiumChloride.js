var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

var game = new Phaser.Game(winWidth, winHeight-55, Phaser.AUTO,'simulationField');


var electron;

var simState =  {
    preload:function() {
        game.load.image('electron', 'assets/diamond.png');
        game.load.image('proton', 'assets/diamond.png');
        game.load.image('neutron', 'assets/diamond.png');
        game.load.image('barrel', 'images/my/barrel.png');
        game.load.image('grass', 'images/my/grass.png');
        game.load.image('boy', 'images/my/boy.png');
        game.load.image('buttonBarrel', 'images/menu/sim.png');

        game.load.image('lamp', 'images/my/lamp.png');
        game.load.image('battery', 'images/my/battery.png');
        game.load.image('container', 'images/my/container.png');
        game.load.image('ledge', 'images/my/ledge.png');
        game.load.image('pointer', 'images/my/pointer.png');
        game.load.image('pointerNew', 'images/my/pointerNew.png');

    },
	create:function(){
        game.stage.backgroundColor = '#a99994';
        

        var ledge = game.add.sprite(200, 200, 'ledge');
        ledge.alpha = 0.7;
        ledge.inputEnabled = true;
        ledge.input.enableDrag(false, false, true);
        ledge.input.priorityID = 2;

        var container = game.add.sprite(300, 300, 'container');
        container.alpha = 0.5;
        container.inputEnabled = true;
        container.input.enableDrag(false, false, true);
        container.input.priorityID = 2;

        var battery = game.add.sprite(400, 400, 'battery');
        battery.alpha = 0.7;
        battery.inputEnabled = true;
        battery.input.enableDrag(false, false, true);
        battery.input.priorityID = 2;

        var lamp = game.add.sprite(100, 100, 'lamp');
        lamp.alpha = 0.3;
        lamp.inputEnabled = true;
        lamp.input.enableDrag(false, false, true);
        lamp.input.priorityID = 2;
	},
	update:function(){
        
	}
};


game.state.add('simulation',simState);
game.state.start('simulation');
