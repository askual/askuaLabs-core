var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var game = new Phaser.Game(winWidth, winHeight, Phaser.AUTO,'simulationField');
var position = {
    "menuTextX"     : 100,
    "menuTextY"     : 100,
    "chall1X"       : 100,
    "chall1Y"       : 200,
    "chall2X"       : 200,
    "chall2Y"       : 200
}
var assets= {
    'Tongue': {
        'DDM' : 'tongueDDM',
        'DrM' : 'tongueDrM',
        'rrM' : 'tonguerrM',
        'DDF' : 'tongueDDF',
        'DrF' : 'tongueDrF',
        'rrF' : 'tonguerrF'
    },
    'Ear' : {
        'DF' : 'ear'
    }
};

var type= "Tongue";

//=> Basic functions
var simulation = { };
simulation.show;
simulation.type;
simulation.truth = false;

simulation.choice1;
simulation.choice2;

simulation.preload      = function(){
    game.stage.backgroundColor = "#7fcaea";
    controller.preload();
    brand.preload();
    game.load.image('avatar','../../assets/img/biology/heredity/avatar.png');
    game.load.image('c1','../../assets/img/biology/heredity/earR.png');
    game.load.image('c2','../../assets/img/biology/heredity/tongue.png');
    game.load.image('TongueDDM','../../assets/img/biology/heredity/TongueDDM.png');
    game.load.image('TongueDrM','../../assets/img/biology/heredity/TongueDrM.png');
    game.load.image('TonguerrM','../../assets/img/biology/heredity/TonguerrM.png');
    game.load.image('TongueDDF','../../assets/img/biology/heredity/TongueDDF.png');
    game.load.image('TongueDrF','../../assets/img/biology/heredity/TongueDrF.png');
    game.load.image('TonguerrF','../../assets/img/biology/heredity/TonguerrF.png');
    game.load.image('TongueDM','../../assets/img/biology/heredity/TongueDM.png');
    game.load.image('TongueDF','../../assets/img/biology/heredity/TongueDF.png');
}

simulation.create       = function(){
    brand.setTitle("Heredity And Trait: ("+type+")");
    brand.create();
    brand.Button("challenge"); 





    var button1 = game.add.button(200, game.world.centerY-100, 'avatar', simulation.actionOnClick, this);
    button1.sex = "M";
    button1.onInputOver.add(simulation.over, this);
    button1.onInputOut.add(simulation.out, this);
    button1.onInputUp.add(simulation.up, this);

    var button2 = game.add.button(300, game.world.centerY-100, 'avatar', simulation.actionOnClick, this);
    button2.sex = "F";
    button2.onInputOver.add(simulation.over, this);
    button2.onInputOut.add(simulation.out, this);
    button2.onInputUp.add(simulation.up, this);    





    simulation.show = new controller.checkBox(100,100,"Show");
    simulation.show.option("History");
    simulation.show.option("??");

    simulation.type = new controller.radioButton(800,100,"Trait Type");
    if(type=="Ear")
        simulation.type.option("Ear",true);
    else
        simulation.type.option("Ear");
    if(type=="Tongue")
        simulation.type.option("Tongue",true);
    else
        simulation.type.option("Tongue");
    /////////////////////////////////////////////////
    
    var vvvv = new controller.textArea("title","Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",800,200);
    //vvvv.setText("kkk pppp dddd pppp ooooo rrrr iiiii iiii oooooooo aedewdewd edwe fwewf wefwefweefeg kojijijn  refserf reffop qqwpeorknv");
    //vvvv.setText("kkk pppp dddd pppp ooooo");
    //vvvv.result();
    //var vv = new controller.slider();
    console.log("made it");
    
    
    
}   
simulation.update       = function(){   
    if(simulation.type.result!=type){
        type = simulation.type.result;
        game.state.start('sim');
    }
    /*
    if(simulation.type.result == "Ear"){
        console.log("oo");
        simulation.type.destroy();
    }
    */
    /*
    if(simulation.show.isActive("Neutral/Ion")){
        console.log("oo");
        simulation.show.destroy();
    }
    */
}










simulation.over = function(button,pointer){
    //simulation.truth = true;
    var one     = type+"rr"+button.sex;
    var x1      = button.x+20;
    var y1      = button.y;
    var two     = type+"D"+button.sex;
    var x2      = button.x +button.width-20;
    var y2      = button.y;

    simulation.choice1 =  game.add.button(x1, y1, one, simulation.clickedChoice, this);
    simulation.choice1.anchor.setTo(1,0);    
    simulation.choice1.scale.setTo(1.5,1.5);
    simulation.choice1.onInputOver.add(simulation.over2, this);
    simulation.choice1.onInputOut.add(simulation.out2, this);

    simulation.choice2 =  game.add.button(x2, y2, two, simulation.clickedChoice, this);
    simulation.choice2.anchor.setTo(0,0);
    simulation.choice2.scale.setTo(1.5,1.5);
    simulation.choice2.onInputOver.add(function(){
        console.log("ssss");
        simulation.truth = true;
        simulation.over2();
    }, this);
    simulation.choice2.onInputOut.add(simulation.out2, this);
}
simulation.clickedChoice = function(button,pointer){
    if(button.key== type+"DM" || button.key== type+"DF"){
        
        console.log("=|=|=|=|=|=");
    }else{
        console.log("[-][+][-][+][-]");
    }
}
simulation.out = function(){
    console.log("ccccc");
    /*
    if(!simulation.truth){
        if(simulation.choice1!=undefined){
            simulation.choice1.destroy();
        }
        if(simulation.choice2!=undefined){
            simulation.choice2.destroy();
        }
    }
    */
}
simulation.up = function(){
    
}
simulation.over2 = function(){
    console.log("||||||");
    simulation.truth = true;
}
simulation.out2 = function(){
    simulation.truth = false;
    console.log("keseni");
}

////////////////////////////////////////////////
























game.state.add('sim',simulation);
game.state.start('sim');