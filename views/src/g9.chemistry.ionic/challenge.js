var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

var game = new Phaser.Game(winWidth, winHeight, Phaser.AUTO,'simulationField');


var menuState = {
    preload: function(){
        game.load.image('chall', 'images/menu/challenges.png');
        game.load.image('desc', 'images/menu/des.png');
        game.load.image('sim', 'images/menu/sim.png');
        game.stage.backgroundColor = "#7fcaea";

    },
    create: function(){
        this.simMenu = game.add.button(game.world.centerX,200,'sim',this.gotoSim);
        this.simMenu.anchor.set(.5);
        this.simMenu.scale.setTo(0.5,0.5);
        //
        this.desMenu = game.add.button(game.world.centerX,100,'desc',this.gotoDes);
        this.desMenu.anchor.set(.5);
        this.desMenu.scale.setTo(0.5,0.5);
        //
        this.challMenu = game.add.button(game.world.centerX,300,'chall',this.gotoChall);
        this.challMenu.anchor.set(.5);
        this.challMenu.scale.setTo(0.5,0.5);
        //

    },
    update:function(){

    },
    gotoSim: function(){
        game.state.start('simulation');
    },
    gotoDes: function(){
        game.state.start('description');
    },
    gotoChall: function(){
        game.state.start('challenge');
    }
}


var elements,dashes;
var H,He,Li,Be,B,C,N,O,F,Ne;

var add=0;
var added = ['',''];
var addedSuffix = [1,1];
var metalNeeded = false;
var simState =  {
    preload:function() {
        game.load.image('H', 'images/elements/H.png');
        game.load.image('He', 'images/elements/He.png');
        game.load.image('Li', 'images/elements/Li.png');
        game.load.image('Be', 'images/elements/Be.png');
        game.load.image('B', 'images/elements/B.png');
        game.load.image('C', 'images/elements/C.png');
        game.load.image('N', 'images/elements/N.png');
        game.load.image('O', 'images/elements/O.png');
        game.load.image('F', 'images/elements/F.png');
        game.load.image('Ne', 'images/elements/Ne.png');

        game.load.image('dash', 'images/elements/dash.png');     
    },
	create:function(){
		game.stage.backgroundColor = '#a99994';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        elements = game.add.group();
        elements.enableBody = true;
        dashes = game.add.group();
        dashes.enableBody = true;

        this.createElement(0, 50, 'H');
        this.createElement(360, 50, 'He');
        this.createElement(0, 90, 'Li');
        this.createElement(40, 90, 'Be');
        this.createElement(160, 90, 'B');
        this.createElement(200, 90, 'C');
        this.createElement(240, 90, 'N');
        this.createElement(280, 90, 'O');
        this.createElement(320, 90, 'F');
        this.createElement(360, 90, 'Ne');
        
        dashes.create(game.world.centerX-120, game.world.centerY, 'dash');
        game.add.sprite(game.world.centerX-60, game.world.centerY, 'dash');
        dashes.create(game.world.centerX, game.world.centerY, 'dash');
        game.add.sprite(game.world.centerX+60, game.world.centerY, 'dash');

        console.log(periodicTable);
        /*
        sprite.events.onDragStart.add(this.startDrag, this);
        sprite.events.onDragStop.add(this.stopDrag, this);
        */
	},
	update:function(){
        game.physics.arcade.overlap(dashes, elements, this.move, null, this);
        if(add==2){
            this.answer();
            add =0;
        }
    },
    move:function(d,e){
        if(periodicTable[e.key].charge!=0){
            if(add==0){
                if(periodicTable[e.key].charge <0)
                    metalNeeded = true;
                e.input.enableDrag(false);
                e.inputEnabled= false;

                elements.create(d.body.x, d.body.y, e.key);
                added[add]= e.key;
                addedSuffix[add]= periodicTable[e.key].charge;

                d.kill();
                e.kill();
                add++;
            }else{
                if(metalNeeded){
                    if(periodicTable[e.key].charge >0){
                        //NICE
                        e.input.enableDrag(false);
                        e.inputEnabled= false;

                        elements.create(d.body.x, d.body.y, e.key);
                        added[add]= e.key;
                        addedSuffix[add]= periodicTable[e.key].charge;

                        d.kill();
                        e.kill();
                        add++;
                    }else{
                        //BAD
                        var v= elements.create((periodicTable[e.key].group+1)*40, 50+(periodicTable[e.key].period-1)*40, e.key);
                        v.inputEnabled= true;
                        v.input.enableDrag(true);
                        e.kill();
                    }
                }else{
                    if(periodicTable[e.key].charge <0){
                        //NICE
                        e.input.enableDrag(false);
                        e.inputEnabled= false;

                        dashes.create(d.body.x, d.body.y, e.key);
                        added[add]= e.key;
                        addedSuffix[add]= periodicTable[e.key].charge;

                        d.kill();
                        e.kill();
                        add++;
                        metalNeeded = false;
                    }else{
                        //BAD
                        var v= elements.create((periodicTable[e.key].group+1)*40, 50+(periodicTable[e.key].period-1)*40, e.key);
                        v.inputEnabled= true;
                        v.input.enableDrag(true);
                        e.kill();
                    }
                }
            }
        }else{
            // NOBLE GASES TO BE ADDED
            var ng= elements.create((periodicTable[e.key].group+1)*40, 50+(periodicTable[e.key].period-1)*40, e.key);
            ng.inputEnabled= true;
            ng.input.enableDrag(true);
            e.kill();
        }

    },

    createElement:function(x,y,E){
        var v= elements.create(x,y, E);
        v.inputEnabled= true;
        v.input.enableDrag(true);
    },
    answer:function(){
        game.add.sprite(game.world.centerX+120, game.world.centerY, 'dash');

        var A=added[0],An=addedSuffix[0],B=added[1],Bn=addedSuffix[1];
        if(addedSuffix[0] < 0){
            A=added[1];
            An=addedSuffix[1];
            B=added[0];
            Bn=addedSuffix[0];
        }
        Bn*=-1;
        while(An %2 ==0 && Bn%2 ==0){
            An/=2;
            Bn/=2; 
        }
        while(An %3 ==0 && Bn%3 ==0){
            An/=3;
            Bn/=3; 
        }
        if(An==1)
            An= '';
        if(Bn==1)
            Bn= '';
        console.log('He y! '+A+Bn+B+An);        
    }

};

var scoreText;
var desState = {
    preload: function(){
        game.load.image('chall', 'images/menu/challenges.png');
        game.load.image('desc', 'images/menu/des.png');
        game.load.image('sim', 'images/menu/sim.png');
        game.stage.backgroundColor = "#7fcaea";
    },
    create: function(){
        game.stage.backgroundColor = '#0072bc';
        var style = { font: 'bold 16pt Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 750 };
        var text = game.add.text(game.world.centerX, game.world.centerY-200, "2. Transition Elements: d-block elements These elements are found in the periodic table between the s-block and p-block elements. In these elements, the valence electrons are being added to the d-orbital of the outermost shell. They are also known as d-block elements. They are designated as 'B' group, and they consist of groups IB – VIIIB. The transition elements are found in periods 4, 5, 6, and 7. They include common elements such as iron, gold, and copper. d-block elements are also called transition metals.", style);
        var text2 = game.add.text(game.world.centerX, game.world.centerY+100, "2. Transition Elements: d-block elements These elements are found in the periodic table between the s-block and p-block elements. In these elements, the valence electrons are being added to the d-orbital of the outermost shell. They are also known as d-block elements. They are designated as 'B' group, and they consist of groups IB – VIIIB. The transition elements are found in periods 4, 5, 6, and 7. They include common elements such as iron, gold, and copper. d-block elements are also called transition metals.", style);

        text.anchor.set(0.5);
        text2.anchor.set(0.5);
    },
    update:function(){

    }
}



game.state.add('menu',menuState)
game.state.add('simulation',simState);
game.state.add('description',desState);
game.state.start('simulation');

