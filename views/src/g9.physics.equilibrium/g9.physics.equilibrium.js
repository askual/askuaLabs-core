var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

var game = new Phaser.Game(winWidth, winHeight-55, Phaser.AUTO,'simulationField');

var electron;

var rightSum=0;
var leftSum=0;
var stuffs,tesafari;
var bb=[];

var platform;
var barrelOn = true;
var barrelButton;
var barrelButton2;
var grass;
var ledge,ledge2;
var boy;
var barrel1,barrel2;
var p1,p2,p3,p4,p5,p6,p7,p8,p0;
var bool_center = [false,false,false,false,false,false,false,false,false];
var bool_center2 = [false,false,false,false,false,false,false,false,false];
var stop_center = [p0,p1,p2,p3,p4,p5,p6,p7,p8,p0];
var circle;
var simState =  {
    preload:function() {
        game.load.image('buttonUnchecked', 'images/my/buttonUnchecked.png');
        game.load.image('buttonChecked', 'images/my/buttonChecked.png');

        game.load.image('checkUnchecked', 'images/my/CheckBoxUnchecked.png');
        game.load.image('checkChecked', 'images/my/CheckBoxChecked.png');

        game.load.image('electron', 'assets/diamond.png');
        game.load.image('proton', 'assets/diamond.png');
        game.load.image('neutron', 'assets/diamond.png');
        game.load.image('barrel', 'images/my/barrel.png');
        game.load.image('grass', 'images/my/grass.png');
        game.load.image('boy', 'images/my/boy.png');
        game.load.image('buttonBarrel', 'images/menu/sim.png');

        game.load.image('redBall', 'images/my/redBall.png');
        game.load.image('sphere', 'images/my/sphere.png');
        game.load.image('brick', 'images/my/brick.png');
        game.load.image('ledge', 'images/my/ledge.png');
        game.load.image('pointer', 'images/my/pointer.png');
        game.load.image('pointerNew', 'images/my/pointerNew.png');

    },
    create2: function(){
        game.state.start('simulation');
    },
	create:function(){
		game.stage.backgroundColor = '#a99994';
        game.physics.startSystem(Phaser.Physics.ARCADE);


        platform = game.add.group();
        platform.enableBody = true;

        grass = platform.create(0, winHeight -200, 'grass');
        grass.scale.setTo(3, 4);
        grass.body.immovable = true;
        
        ledge = game.add.group();
        ledge.enableBody = true;

        ledge2 = ledge.create(game.world.centerX, winHeight - 300, 'ledge');
        ledge2.anchor.setTo(0.5,0);
        ledge2.body.immovable = true;


        //ledge = game.add.sprite(game.world.centerX - 200, winHeight -300, 'grass');
        //ledge.scale.setTo(1,0.25);
        //ledge = new Phaser.Rectangle(game.world.centerX - 200, winHeight - 300, game.world.centerX + 200, winHeight - 250);

        //p1 = new Phaser.Rectangle(game.world.centerX - 180, winHeight - 300, 10, 10);
        p1 = game.add.sprite(game.world.centerX - 180, winHeight - 300, 'pointer');
        p1.name = "p1";

        p2 =  game.add.sprite(game.world.centerX - 130, winHeight - 300, 'pointer');
        p2.name = "p2";

        p3 = game.add.sprite(game.world.centerX - 80, winHeight - 300, 'pointer');
        p3.name = "p3";
        p4 = game.add.sprite(game.world.centerX - 30, winHeight - 300, 'pointer');
        p4.name = "p4";

        p0 = game.add.sprite(game.world.centerX-5 , winHeight - 300, 'pointerNew');
        p0.name = "p0";


        p5 = game.add.sprite(game.world.centerX + 20, winHeight - 300, 'pointer');
        p5.name = "p5";
        p6 = game.add.sprite(game.world.centerX + 70, winHeight - 300, 'pointer');
        p6.name = "p6";
        p7 = game.add.sprite(game.world.centerX + 120, winHeight - 300, 'pointer');
        p7.name = "p7";
        p8 = game.add.sprite(game.world.centerX + 170, winHeight - 300, 'pointer');
        p8.name = "p8";
//        ledge = new Phaser.Rectangle(game.world.centerX - 225, winHeight - 300, 450, 10);


        barrel1 = game.add.sprite(game.world.centerX - 225, winHeight -280, 'barrel');
        barrel1.anchor.setTo(0.5,0);
        barrel2 = game.add.sprite(game.world.centerX + 225, winHeight -280, 'barrel');
        barrel2.anchor.setTo(0.5,0);

        barrelButton = game.add.button(game.world.width-100,40,'buttonBarrel',this.barrelShuffle);
        barrelButton.scale.setTo(0.10,0.10);
        barrelButton2 = game.add.button(game.world.width-100,80,'buttonBarrel',this.create2);
        barrelButton2.scale.setTo(0.10,0.10);
        /*
            The mnamn mnamn
        */
        stuffs = game.add.group();
        stuffs.enableBody = true;
        var ball = stuffs.create(game.world.width-250, game.world.centerY, 'redBall');
        ball.worth = 20;
        ball.inputEnabled = true;
        ball.input.enableDrag(true);

        var sphere = stuffs.create(game.world.width-50, game.world.centerY, 'sphere');
        sphere.worth = 10;
        sphere.inputEnabled = true;
        sphere.input.enableDrag(true);
        //console.log(ball);

        var brick = stuffs.create(game.world.width-100, game.world.centerY, 'brick');
        brick.worth = 40;
        brick.inputEnabled = true;
        brick.input.enableDrag(true);
        //console.log(ball);

        // Proton Electron and neutrons
            electron= game.add.sprite(game.world.width-100, game.world.centerY+50, 'electron');
            electron.inputEnabled= true;
            electron.anchor.setTo(0.5,0.5);
            electron.input.enableDrag(true);
            this.updateStop(true);

        /*
        console.log("s: "+ sphere.key);
        console.log(stuffs);
        console.log(stuffs.children[0]);
        */
        this.blah();

        /*
        console.log("Hello!!!!");
        console.log(ledge2);
        */

        tesafari = game.add.group();


        /*
        console.log(Phaser.Easing.Linear.None);
        console.log("HH");
        console.log(Phaser.Easing.Linear);
        console.log("HH");
        console.log(Phaser.Easing);
        

        var cc = this.oRadioButton();
        console.log(cc);

        */
        
        var xxx = new this.radioButton(100,100);
        console.log("xxx=",xxx);
        xxx.addRadio("One");
        xxx.addRadio("two");
        xxx.addRadio("three");
        xxx.setDefault("Four");
        console.log("yy=",xxx);
        /*
        var xxx = new checkBox(100,100);
        xxx.addBox("One");
        xxx.addBox("two");
        xxx.addBox("three");
        xxx.setDefault("Four");
        */
	},

    radioButton:function(w,h){
        this.width= w;
        this.height= h;
        this.default;
        this.sumOfRadio=0;
        this.clickedButton;

        this.lastRadio;

        this.clicked = function(b){
            console.log("b?????",b,this);
            if(this.parent.clickedButton){
                this.parent.clickedButton.visible = false;
                this.parent.clickedButton= game.add.button(b.x,b.y, 'buttonChecked',this.clicked);
            }else{
                this.parent.clickedButton= game.add.button(b.x,b.y, 'buttonChecked',this.clicked);
            }
        }

        this.setDefault = function(text){
            this.lastRadio = game.add.button(this.width,this.height+ this.sumOfRadio*20, 'buttonUnchecked',this.clicked);
            var s= this;
            var q=2;
            if(q!=3){
                console.log("hoho",s);
                this.clickedButton= game.add.button(this.width,this.height+ this.sumOfRadio*20, 'buttonChecked',s.clicked);
            }
            //console.log(this);
            /*
            this.addRadio(b);
            console.log("hh",this.lastRadio);
            this.clicked(this.lastRadio);
            */
        }
        this.addRadio= function(text){
            this.lastRadio = game.add.button(this.width,this.height+ this.sumOfRadio*20, 'buttonUnchecked',this.clicked);
            this.lastRadio.index = this.sumOfRadio;

            var radioText = game.add.text(this.width+15,this.height+ this.sumOfRadio*20, text, {  fill: '#000' });
            radioText.fontSize = 16;
            console.log("text",radioText);
            this.sumOfRadio++;

            console.log("HEHE",this);
        }
    },


    /*
    radioButton:function(w,h){
        var x=w;
        console.log("hell");
        console.log(this);
        this.add= function(xx){
            x+=xx;
            return x;
        }
        
    },
    */
	update:function(){
        /*
        game.physics.arcade.collide(ledge, stuffs);
        game.physics.arcade.collide(ledge, platform);
        game.physics.arcade.collide(stuffs, platform);
        game.physics.arcade.collide(stuffs, ledge);
        game.physics.arcade.collide(ledge, tesafari);
        this.updateStop();
        //When Electrons Move
        var ey= electron.y;
        var ex= electron.x;
        //console.log("ex "+ex);
        if(ex >= ledge2.x - + ledge2.width/2 && ex <= ledge2.x+ ledge2.width/2 ){
                electron.events.onDragStop.add(this.sit, ex-ledge2.x-25,this.electron);
                this.overl(ex-ledge2.x-25,electron);
        }

        var ss = stuffs.children.length;
        for(var x =0;x<ss;x++){
            var thisStuff =stuffs.children[x];
            var eyyy= thisStuff.y;
            var exxx= thisStuff.x;
            //console.log("ex "+ex);
            if(exxx >= ledge2.x && exxx <= ledge2.x+ledge2.width ){
                    thisStuff.events.onDragStop.add(this.sit, exxx-ledge2.x,thisStuff);
            }
        }
        */
	},
    sit: function(thing,distance){
        //thing.body.gravity.y = 10;
        
        var tt = (thing.width+distance.x)/50;
        var t = (Math.floor(tt)-8);
        console.log("t = "+t);
        //console.log(bool_center2);
        //console.log(t+" : "+bool_center2[t]);
        if(!bool_center2[t]){
            if(tt>9 && tt<17){
                var e = tesafari.create(game.world.centerX - 225+ t*50, winHeight - 300, thing.key);
                e.inputEnabled= true;
                e.anchor.setTo(0.5,1);
                thing.kill();
            }
            var ss = stuffs.children.length;
            var b=0;
            for(var q=0;q<ss;q++){
                if(stuffs.children[q].key== thing.key){
                    b = q;
                    console.log(stuffs.children[q].key);
                    break;
                }
            }
            var replacement = stuffs.create(bb[b].x, bb[b].y, thing.key);
            replacement.worth = thing.worth;
            replacement.inputEnabled = true;
            replacement.input.enableDrag(true);
            bool_center2[t]= true;
            if(t<5){
                leftSum+= (5-t)*thing.worth;
            }else{
                rightSum+= (t-4)*thing.worth;
            }
        }
    },
    /*
    sit: function(thing,distance){
        var tt = (thing.width+distance.x)/50;
        var t = (Math.floor(tt)-8);
        console.log("t = "+t);
        //console.log(bool_center2);
        //console.log(t+" : "+bool_center2[t]);
        if(!bool_center2[t]){
            if(tt>9 && tt<17){
                var e = tesafari.create(game.world.centerX - 225+ t*50, winHeight - 300, thing.key);
                e.inputEnabled= true;
                e.anchor.setTo(0.5,1);
                thing.kill();
            }
            var ss = stuffs.children.length;
            var b=0;
            for(var q=0;q<ss;q++){
                if(stuffs.children[q].key== thing.key){
                    b = q;
                    console.log(stuffs.children[q].key);
                    break;
                }
            }
            var replacement = stuffs.create(bb[b].x, bb[b].y, thing.key);
            replacement.worth = thing.worth;
            replacement.inputEnabled = true;
            replacement.input.enableDrag(true);
            bool_center2[t]= true;
            if(t<5){
                leftSum+= (5-t)*thing.worth;
            }else{
                rightSum+= (t-4)*thing.worth;
            }
        }
    },
    */
    blah: function(){
        var ss = stuffs.children.length;
        for(var x =0;x<ss;x++){
            var thisStuff =stuffs.children[x];
            var s= {
                x:thisStuff.x,
                y:thisStuff.y
            };
            bb[x]= s;
        }
    },
    barrelShuffle: function(){
        p0.key = "barrel";
        console.log("hihi");
        console.log(p0);
        if(barrelOn){
            barrel1.kill();
            barrel2.kill();
            if(leftSum>rightSum){
                console.log("left");
            }else if(rightSum>leftSum){
                console.log("right");
            }else{
                console.log("yeah");
            }
            game.add.tween(ledge2).to( { angle: -25 }, 2000, Phaser.Easing.Exponential.None, true);
            //ledge2.angle += 1;
            var ss = tesafari.children.length;
            for(var x =0;x<ss;x++){
                //game.add.tween(tesafari.children[x]).to( { angle: 90 }, 2000, Phaser.Easing.Linear.None, true);
                //game.add.tween(ledge2).to( { angle: 90 }, 2000, Phaser.Easing.Linear.None, true);
                player.body.velocity.x = 0;
            }
        }else{
            barrel1 = game.add.sprite(game.world.centerX - 225, winHeight -280, 'barrel');
            barrel1.anchor.setTo(0.5,0);
            barrel2 = game.add.sprite(game.world.centerX + 225, winHeight -280, 'barrel');
            barrel2.anchor.setTo(0.5,0);
        }
        barrelOn = !barrelOn;
    },
    sitt: function(x,y){
        var tt = (x.width+y.x)/50;
        var t = (Math.floor(tt)-8);
        console.log(bool_center[t]+" "+t);
        if(!bool_center[t]){
            if(tt>9 && tt<17){
                var e= game.add.sprite(game.world.centerX - 225+ t*50, winHeight - 300, 'electron');
                //console.log(t);
                //game.world.centerX - 225, winHeight - 300, 450, 10);
                e.inputEnabled= true;
                e.anchor.setTo(0.5,0.5);
                x.kill();
            }
            console.log(tt);
            bool_center[t]= true;
        }
    },

    overl: function(x,y){
        //console.log(x);
        var tt = (x+y.width)/50;
        var t = Math.floor(tt);
        var x = stop_center[t].name;
        //console.log("This is t: "+x);
        if(t!=0){
            bool_center[t-1]=false;
            stop_center[t-1].height = 10;
        }
        if(t!=8 && t!=9){
            bool_center[t+1]=false;
            stop_center[t+1].height = 10;
        }
        bool_center[t]=true;
        stop_center[t].height = 45;
        this.updateStop(false);
    },
    render:function() {
        game.debug.geom(p2);
        game.debug.geom(p3);
        game.debug.geom(p4);
        game.debug.geom(p5);
        game.debug.geom(p6);
        game.debug.geom(p7);
        game.debug.geom(p8);
        game.debug.geom(p0);
    },
    updateStop:function(b){
        if(b)
            stop_center = [p0,p1,p2,p3,p4,p5,p6,p7,p8,p0];
        else{
            p0 = stop_center[0];
            p1 = stop_center[1];
            p2 = stop_center[2];
            p3 = stop_center[3];
            p4 = stop_center[4];
            p5 = stop_center[5];
            p6 = stop_center[6];
            p7 = stop_center[7];
            p8 = stop_center[8];
            p0 = stop_center[9];
        }
    }
};


game.state.add('simulation',simState);
game.state.start('simulation');
