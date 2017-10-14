var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

var game = new Phaser.Game(winWidth, winHeight, Phaser.AUTO,'simulationField',{ preload: preload, create: create, update: update });

var elements,dashes;
var H,He,Li,Be,B,C,N,O,F,Ne;

var add=0;
var added = ['',''];
var addedSuffix = [1,1];
var metalNeeded = false;



function preload() {
    game.load.image('H',    '../../assets/images/elements/H.png');
    game.load.image('He',   '../../assets/images/elements/He.png');
    game.load.image('Li',   '../../assets/images/elements/Li.png');
    game.load.image('Be',   '../../assets/images/elements/Be.png');
    game.load.image('B',    '../../assets/images/elements/B.png');
    game.load.image('C',    '../../assets/images/elements/C.png');
    game.load.image('N',    '../../assets/images/elements/N.png');
    game.load.image('O',    '../../assets/images/elements/O.png');
    game.load.image('F',    '../../assets/images/elements/F.png');
    game.load.image('Ne',   '../../assets/images/elements/Ne.png');

    game.load.image('dash', '../../assets/images/elements/dash.png'); 
    
    askuaLabs_brand.preload();
}

function create(){
	game.stage.backgroundColor = '#a99994';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    askuaLabs_brand.setTitle("Ionic Bonding");
    askuaLabs_brand.create();
    
    elements = game.add.group();
    elements.enableBody = true;
    dashes = game.add.group();
    dashes.enableBody = true;

    createElement(0, 50, 'H');
    createElement(360, 50, 'He');
    createElement(0, 90, 'Li');
    createElement(40, 90, 'Be');
    createElement(160, 90, 'B');
    createElement(200, 90, 'C');
    createElement(240, 90, 'N');
    createElement(280, 90, 'O');
    createElement(320, 90, 'F');
    createElement(360, 90, 'Ne');
    
    dashes.create(game.world.centerX-120, game.world.centerY, 'dash');
    game.add.sprite(game.world.centerX-60, game.world.centerY, 'dash');
    dashes.create(game.world.centerX, game.world.centerY, 'dash');
    game.add.sprite(game.world.centerX+60, game.world.centerY, 'dash');

    console.log(periodicTable);
    /*
    sprite.events.onDragStart.add(this.startDrag, this);
    sprite.events.onDragStop.add(this.stopDrag, this);
    */
}
function update(){
    game.physics.arcade.overlap(dashes, elements, move, null, this);
    if(add==2){
        answer();
        add =0;
    }
}
function move(d,e){
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

}

function createElement(x,y,E){
    var v= elements.create(x,y, E);
    v.inputEnabled= true;
    v.input.enableDrag(true);
}

function answer(){
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




