var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var game = new Phaser.Game(winWidth, winHeight, Phaser.AUTO,'simulationField');
var challState = { };
var menuState = {
    preload: function(){
        this.loadinTxt = game.add.text(game.world.centerX,game.world.centerY+66,'Loading...',{font:'12px Arial'});
        this.loadinTxt.anchor.setTo(.5);
        this.iconLogo = game.add.sprite(game.world.centerX,game.world.centerY-34,'icon');
        this.iconLogo.anchor.setTo(.5);
        this.preloadBar = this.add.sprite(game.world.centerX, game.world.centerY+100, 'preloaderBar');
        this.preloadBar.anchor.setTo(.5);
        this.load.setPreloadSprite(this.preloadBar);
        // menu assets
        game.load.image('menuHover','assets/img/menu/moveMenu.png')
        game.load.image('chall300','uBfSKJ1w6a1GYcR7/img/chall300x300.png')
        game.load.image('sim300','uBfSKJ1w6a1GYcR7/img/sim300x300.png')
        //simuallation assets
        controller.preload();
        brand.preload();
        //my assets
        game.load.image('boy', 'assets/img/biology_9/respiratory/boy.png');
        game.load.image('lung','assets/img/biology_9/respiratory/lung.png')
        game.load.image('o2', 'assets/img/biology_9/respiratory/o2.png');
        game.load.image('co2', 'assets/img/biology_9/respiratory/co2.png');
        game.load.image('btn', 'assets/img/controller/buttonUnchecked.png');
    },
    create:function(){
        this.preloadBar.cropEnabled = false;
        this.preloadBar.destroy();
        this.iconLogo.destroy();
        this.loadinTxt.destroy();
        //brand.setTitle("Respiratory System");
        brand.create();
        var box = function(options){
                var bmd = game.add.bitmapData(options.length,options.width);
                bmd.ctx.beginPath();
                bmd.ctx.rect(8,8,options.length,options.width);
                bmd.ctx.fillStyle = options.color;
                bmd.ctx.fill();
                return bmd;
        };

        //game.add.sprite(300,300,'challMenu');
        var style = { font: "32px Arial", fill: "#233740" },
            styleDev = { font: "12px Arial", fill: "#fff" };
        this.hvrMenu = game.add.sprite(game.world.centerX-425,145,'menuHover');
        this.simBtn = game.add.button(game.world.centerX-400,170,'sim300',this.gotoSim);
        this.challBtn = game.add.button(game.world.centerX+50,170,'chall300',this.gotoChall);
       
        this.simBtn.onInputOver.add(this.hoverSim,this);
        this.challBtn.onInputOver.add(this.hoverChall,this);
 
        this.txtSim = game.add.text(game.world.centerX-400,110,'Simulation',style);
        this.txtChall = game.add.text(game.world.centerX+50,110,'Challenge',style);

         this.devTab = game.add.sprite(-5,game.world.height-45,box({length:game.world.width+5,width:45,color:"#233740"}))

         this.devText = game.add.text(game.world.width-300,game.world.height-30,'Simulation Developed By - Askualabs',styleDev);
    },
    update:function(){
    },
    gotoSim:function(){
        game.state.start('sim');
    },
    gotoChall:function(){
    },
    hoverChall:function(){
        var cx = game.world.centerX+25;
       game.add.tween(this.hvrMenu).to( { x: cx }, 1400, Phaser.Easing.Bounce.Out,true,0,0,false);
    },
    hoverSim:function(){
       var cx = game.world.centerX-425;
       game.add.tween(this.hvrMenu).to( { x: cx }, 1400, Phaser.Easing.Bounce.Out,true,0,0,false);
    }
}




game.state.add('boot',bootState)
game.state.add('sim',simState);
game.state.add('menu',menuState);
game.state.start('boot');
