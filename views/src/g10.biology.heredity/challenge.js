var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var game = new Phaser.Game(winWidth, winHeight, Phaser.AUTO,'simulationField');
var position = {
    "menuTextX"     : 100,
    "menuTextY"     : 100,
    "chall1X"       : 100,
    "chall1Y"       : 200,
    "chall2X"       : 200,
    "chall2Y"       : 200,
    "chall1"        : {
        "oneX"      : 500,
        "oneY"      : 100,
        "twoX"      : 650,
        "twoY"      : 100,
        "threeX"    : 600,
        "threeY"    : 200,
        "fourX"     : 500,
        "fourY"     : 250,
        "fiveX"     : 600,
        "fiveY"     : 300
    },
}
var chall1State = { };
var ziz = chall1State;
chall1State.x           ;
chall1State.protonText  ;
chall1State.neutronText ;
chall1State.electronText;
chall1State.e           ;
chall1State.container   ;

chall1State.one         ;
chall1State.two         ;
chall1State.three       ;
chall1State.four        ;
chall1State.five        ;
chall1State.b1          ;



chall1State.quizLeft=5;
chall1State.tryLeft=2;
chall1State.questionNumber;
chall1State.answer;
chall1State.preload = function(){
    game.stage.backgroundColor = "#7fcaea";
    controller.preload();
    brand.preload();

    game.load.image('NO',       '../../assets/img/common/challengeNo.png');
    game.load.image('YES',      '../../assets/img/common/challengeYes.png');
}
chall1State.create = function(){
    brand.setTitle("Build An Atom:(Challenge)");
    brand.create();
    brand.Button("simulation");

    ziz.newQuestion();
    
}
chall1State.clearField = function(){
    if(ziz.protonText!=undefined)   ziz.protonText.destroy();
    if(ziz.electronText!=undefined) ziz.electronText.destroy();
    if(ziz.neutronText!=undefined)  ziz.neutronText.destroy();
    if(ziz.one!=undefined)          ziz.three.destroy();
    if(ziz.five!=undefined)         ziz.five.destroy();
    if(ziz.b1!=undefined)           ziz.b1.destroy();
    if(ziz.container!=undefined)    ziz.container.destroy();
    if(ziz.one!=undefined)          ziz.one.destroy();
    if(ziz.two!=undefined)          ziz.two.destroy();
    if(ziz.four!=undefined)         ziz.four.destroy();
}
chall1State.newQuestion = function(){
    ziz.clearField();
    ziz.tryLeft=2;
    //
    ziz.e = periodicTable.randomElement();
    ziz.protonText = game.add.text(100,100,"Protons: "+ziz.e["atomicNumber"], {  fill: '#000' });
    ziz.neutronText = game.add.text(100,200,"Neutrons: "+ziz.e['neutrons'], {  fill: '#000' });
    ziz.electronText = game.add.text(100,300,"Electrons: "+ziz.e["atomicNumber"], {  fill: '#000' });
    //
    ziz.container = game.add.graphics(0, 0);
    ziz.container.lineStyle(2, 0x000000, 1);
    ziz.container.drawRect(500, 100, 200, 200);

    ziz.questionNumber = parseInt(Math.random()*100)%2;
    if(ziz.questionNumber==0){
        ziz.one = new controller.numberArea(position["chall1"]["oneX"],position["chall1"]["oneY"]);
        ziz.answer = ziz.e["atomicNumber"] + ziz.e["neutrons"];

        ziz.four = game.add.text(position["chall1"]["fourX"],position["chall1"]["fourY"],ziz.e["atomicNumber"], {  fill: '#000' });
        ziz.four.fontSize = 52;   
    }else if(ziz.questionNumber==1){
        ziz.one = game.add.text(position["chall1"]["oneX"],position["chall1"]["oneY"],ziz.e["neutrons"] + ziz.e["atomicNumber"], {  fill: '#000' });
        ziz.one.fontSize = 52;

        ziz.four = new controller.numberArea(position["chall1"]["fourX"],position["chall1"]["fourY"]);
        ziz.answer = ziz.e["atomicNumber"];
    }

    ziz.two = game.add.text(650,100,"0", {  fill: '#000' });
    ziz.two.fontSize = 52;
    ziz.three = game.add.text(600,200,ziz.e["symbol"], {  fill: '#000' });
    ziz.three.fontSize = 72;
    ziz.three.anchor.setTo(0.5,0.5);
    ziz.five = game.add.text(600,300,ziz.e["element"], {  fill: '#000' });
    ziz.five.fontSize = 52;
    ziz.five.anchor.setTo(0.5,0); 
    
    ziz.b1 = new controller.button(500,350,"yess",function(){
        ziz.submit();
    });
}
chall1State.gotoMenu    = function(){
    game.state.start('menu');
}
chall1State.gotoChall2  = function(){
    game.state.start('chall2');
}
chall1State.restart     = function(){
    game.state.start('chall1');
}
//chall1State.p
chall1State.update      = function(){   

}
chall1State.answerScreen      = function(){
    
}
chall1State.finishScreen      = function(){
    
}
chall1State.replyScreen      = function(x){
    var ziz_local = this;
    if(x)
        ziz_local.img = game.add.sprite(200,100,'YES');
    else
        ziz_local.img = game.add.sprite(200,100,'NO');
/////////////////
    if(x){
        ziz_local.n = new controller.button(400,400,"Next Question",function(){
            ziz_local.img.kill();
            ziz_local.n.destroy(); 
            ziz.newQuestion();
        });
    }else{
        ziz_local.t = new controller.button(200,400,"Try Again",function(){
           ziz_local.img.kill();
           ziz_local.t.destroy();
           ziz_local.s.destroy(); 
           console.log("??????????",ziz.answer);
        });
        ziz_local.s = new controller.button(400,400,"Show Answer",function(){
            
        });
    }
}
chall1State.submit      = function(){
    if(ziz.truth()){
        console.log("111111111111");
        ziz.tryLeft = 2;
        ziz.quizLeft--;
        //Question Answered => next question
        if(ziz.quizLeft==0){
            //Finish line
            ziz.replyScreen(false);
        }else{
            ziz.replyScreen(true);
        }
    }else{
        console.log("2222222222222");
        ziz.tryLeft--;
        //Too Many Try=> next question
        ziz.replyScreen(false);
        /*
        if(ziz.tryLeft==0){
            ziz.replyScreen(false);
            ziz.clearField();
            ziz.tryLeft=2;
            ziz.newQuestion();
        }
        */
    }
}
chall1State.truth       = function(){
    console.log("=======================");
    console.log(ziz.one," |> ",ziz.four);
    //*/
    if(ziz.questionNumber==0){
        if(ziz.answer !=ziz.one.result()){
            return false;
        }
    }else if(ziz.questionNumber==1){
        if(ziz.answer  !=ziz.four.result()){
            return false;
        }
    }
    return true;
}





















var menuState = {
    preload: function(){
        game.stage.backgroundColor = "#7fcaea";
        controller.preload();
        brand.preload();

        game.load.image('electron',     '../../assets/img/chemistry/electron.png');
        game.load.image('proton',       '../../assets/img/chemistry/proton.png');
        game.load.image('neutron',      '../../assets/img/chemistry/neutron.png');
        game.load.image('x',            '../../assets/img/chemistry/x.png');
        
        game.load.image('chall1',       '../../assets/img/chemistry/build.chall1.png');

    },
    create: function(){
        brand.setTitle("Build An Atom:(Challenge)");
        brand.create();
        brand.Button("simulation");

        game.add.text(position['menuTextX'], position['menuTextY'], 'Choose your Challenge!', { fontSize: '152', fill: '#000000' });

        game.add.button(position['chall1X'],position['chall1Y'],'chall1',this.gotoChall1);
    },
    update:function(){

    },

    gotoChall1: function(){
        game.state.start('chall1');
    }

}








game.state.add('menu',menuState);
game.state.add('chall1',chall1State);
game.state.start('chall1');


