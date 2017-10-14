var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var game = new Phaser.Game(winWidth, winHeight, Phaser.AUTO,'simulationField');
var superThis = this;
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
    },//simState
    'atom' :{
        'centerX' : winWidth/4,
        'centerY' : winHeight/2
    },
    'particle' :{
        'electronX' :   50,
        'electronY' :   winHeight-100,
        'protonX'   :   150,
        'protonY'   :   winHeight-100,
        'neutronX'  :   250,
        'neutronY'  :   winHeight-100,
    },
    'radius' : 100,
    'text':{
        'ionNeutralX':  winWidth/4,
        'ionNeutralY':  winHeight/2 +125
    }
}

var goToSim = function(){
    game.state.start('sim');
}
var goToChall = function(){
    game.state.start('chall1');
}
var toStage = function(x){
    if(x<3)     return 1;
    var answer = 2;
    x-=3;
    answer+=parseInt(x/8);
return answer;
}

/*
*
*
* CHALLENGE STATE
*
*
*/


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

    game.load.image('NO',       'assets/img/common/challengeNo.png');
    game.load.image('YES',      'assets/img/common/challengeYes.png');
}
chall1State.create = function(){
    brand.setTitle("Build An Atom:(Challenge)");
    brand.create();
    var vvvvv = new controller.button(game.width - 400,0,"Go To Simulation",function(){
        goToSim();
    });
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
        });
        ziz_local.s = new controller.button(400,400,"Show Answer",function(){
            
        });
    }
}
chall1State.submit      = function(){
    if(ziz.truth()){
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
        ziz.tryLeft--;
        ziz.replyScreen(false);
    }
}
chall1State.truth       = function(){
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





/*
*
*
* MENU STATE
*
*
*/

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




/*
*
*
* SIMULATION STATE
*
*
*/



var simulation = { };


simulation.orbits = [2,8,8];
simulation.leftElectrons=2;
simulation.particlePosition ={};



simulation.electron;
simulation.proton;
simulation.neutron;
simulation.particles;
simulation.nucleusPlaceholder;
simulation.stage=1;
simulation.level=1;

simulation.electronSum=0;
simulation.protonSum=0;
simulation.neutronSum=0;

//Text
simulation.atomName;
simulation.ionNeutral;
//Controllers
simulation.show;
simulation.stable=1;
//Circles
simulation.c = [];
//Electrons
simulation.e =[];
 


simulation.vv;

//controller booleans
simulation.showElement= true;
simulation.preload = function() {
    game.stage.backgroundColor = "#7fcaea";
    controller.preload();
    brand.preload();
    game.load.image('electron',     '../../assets/img/chemistry/electron.png');
    game.load.image('proton',       '../../assets/img/chemistry/proton.png');
    game.load.image('neutron',      '../../assets/img/chemistry/neutron.png');
    game.load.image('x',            '../../assets/img/chemistry/x.png');
}
var ee;
simulation.create = function(){
    game.physics.startSystem(Phaser.Physics.ARCADE); 
    
    brand.setTitle("Build An Atom");
    brand.create();
    //brand.Button("challenge");
    var vvvvv = new controller.button(game.width - 400,0,"Go To Challenge",function(){
        goToChall();
    });

    simulation.particles = game.add.group();
    simulation.electron = game.add.group();
    simulation.proton = game.add.group();
    simulation.neutron = game.add.group();

    simulation.createParticle('electron');
    simulation.createParticle('proton');    
    simulation.createParticle('neutron');

    game.add.text(position['particle']['electronX'],position['particle']['electronY']+65, "Electron", {  fill: '#000' }).fontSize=22;
    game.add.text(position['particle']['protonX'],position['particle']['protonY']+65, "Proton", {  fill: '#000' }).fontSize=22;
    game.add.text(position['particle']['neutronX'],position['particle']['neutronY']+65, "Neutron", {  fill: '#000' }).fontSize=22;

    //TEXTS
    simulation.toggleNucleusPlaceholder();
    simulation.atomName = game.add.text(position['atom']['centerX'],position['atom']['centerY']-60,"");
    simulation.atomName.anchor.setTo(0.5,0.5);

    simulation.ionNeutral = game.add.text(position['text']['ionNeutralX'],position['text']['ionNeutralY']-60,"ooo");
    simulation.ionNeutral.anchor.setTo(0.5,0.5);

    
    simulation.createCircle();
    
    //=======================================   CONTROLLERS
    simulation.show = new controller.checkBox(700,100,"Show");
    simulation.show.option("Element",true);
    simulation.show.option("Stable/Unstable");

    //ee = new controller.onOff(700,200);
    //ee.destroy();
}
simulation.update = function(){
    if(simulation.show.isActive("Element")){
        simulation.updateAtomDetail();
    }
    else{
        simulation.atomName.text = "";
    }
    ////////////////
    if(simulation.show.isActive("Stable/Unstable")){
        simulation.stableUnstable(true);
    }else{
        simulation.stableUnstable(false);
    }
    ///////////////
    if(simulation.show.isActive("Neutral/Ion")){
        simulation.neutralIon(true);
    }else{
        simulation.neutralIon(false);
    }
}
simulation.addElectron = function(particle){
    if(simulation.leftElectrons==0){
        simulation.level++;
        simulation.createCircle();
        
        simulation.leftElectrons = simulation.orbits[simulation.level];
        simulation.addElectron(particle); 
    }else if(simulation.leftElectrons!=0){
        var ang = 2*Math.PI/simulation.orbits[simulation.level-1];
        var Y = position['atom']['centerY'] - (50+(50*simulation.level))*Math.sin(simulation.leftElectrons*ang);
        var X = position['atom']['centerX'] + (50+(50*simulation.level))*Math.cos(simulation.leftElectrons*ang);

        var p = simulation.electron.create(simulation.particlePosition.x,simulation.particlePosition.y,'electron');
        p.scale.setTo(0.15,0.15);
        p.anchor.setTo(0.5,0.5);
        p.inputEnabled= true;
        p.input.enableDrag(true);
        p.events.onDragStop.add(simulation.draggedElectron, this);

        game.add.tween(p).to({x: X, y: Y}, 1400, Phaser.Easing.Back.Out, true);
        simulation.leftElectrons--;

        p.queue = simulation.electronSum;
        p.XX = X;
        p.YY = Y;
        simulation.e.push(p);
    }
}

simulation.createCircle = function(){
    var circle = new Phaser.Circle(position['atom']['centerX'],position['atom']['centerY'], 50+(50*simulation.level));
    var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(2, 0x00ff00, 1);
    graphics.drawCircle(circle.x, circle.y, circle.diameter);
    simulation.c.push(graphics);
}

simulation.draggedElectron =function(item, pointer){
    var y= item.y- position['atom']['centerY'];
    var x= item.x- position['atom']['centerX'];
    var xy= x*x + y*y;
    
    if(xy >= position['radius']*position['radius']*simulation.level*simulation.level){
        simulation.electronSum--;
        item.kill();
        //console.log("hello ",item.queue);
        //simulation.e.pop();
        var x = simulation.e[simulation.e.length-1];
        x.queue = item.queue;
        x.XX = item.XX;
        x.YY = item.YY;
        game.add.tween(x).to({x: simulation.e[item.queue-1].XX, y: simulation.e[item.queue-1].YY}, 1400, Phaser.Easing.Back.Out, true);
        simulation.e[item.queue-1]= x;
        simulation.e.pop();
    }else{
        game.add.tween(item).to({x: simulation.e[item.queue-1].XX, y: simulation.e[item.queue-1].YY}, 1400, Phaser.Easing.Back.Out, true);
    }
    //console.log(simulation.e);
    var d= toStage(simulation.electronSum);
    var dd = simulation.level;
    if(d<dd){
        simulation.c[simulation.c.length-1].destroy();
        simulation.c.pop();
        //simulation.level = d;
    }
}

simulation.neutralIon = function(truth){

}
simulation.stableUnstable = function(truth){
    if(simulation.neutronSum>simulation.protonSum){
        for (var i = simulation.proton.children.length - 1; i >= 0; i--) {
            var p = simulation.proton.children[i];
            var X = simulation.proton.children[i].x +simulation.stable*5;
            var Y = simulation.proton.children[i].y;
            game.add.tween(p).to({x: X, y: Y}, 40000, Phaser.Easing.Back.Out, truth);
        }
        for (var i = simulation.neutron.children.length - 1; i >= 0; i--) {
            var p = simulation.neutron.children[i];
            var X = simulation.neutron.children[i].x +simulation.stable*5;
            var Y = simulation.neutron.children[i].y;
            game.add.tween(p).to({x: X, y: Y}, 40000, Phaser.Easing.Back.Out, truth);
        }
        simulation.stable*=-1;
    }
}

simulation.updateAtom = function(particle){
    var v = simulation.neutronSum+simulation.protonSum;
    if(particle.key=="electron"){
        simulation.electronSum++;
        simulation.addElectron(particle);
    }else if(particle.key=="neutron"){
        simulation.neutronSum++;
        simulation.addNeutron(particle);
    }else if(particle.key=="proton"){
        simulation.protonSum++;
        simulation.addProton(particle);
    }
    var vv= simulation.neutronSum+simulation.protonSum;
    if(v==0 && vv==1)
        simulation.toggleNucleusPlaceholder();
    if(vv==0 && v==1)
        simulation.toggleNucleusPlaceholder();
    // Update name
    simulation.updateAtomDetail();
    // Update Circle
    

}
simulation.addProton = function(particle){
    var p = simulation.proton.create(simulation.particlePosition.x,simulation.particlePosition.y,'proton');
    p.scale.setTo(0.1,0.1);
    p.anchor.setTo(0.5,0.5);
    p.inputEnabled= true;
    p.input.enableDrag(true);
    p.events.onDragStop.add(simulation.draggedProtonNeutron, this);

    var X = position['atom']['centerX'];
    var Y = position['atom']['centerY'];
    if(parseInt(Math.random()*1000)%2==0){
        X-=parseInt(Math.random()*1000)%25;
    }else{
        X+=parseInt(Math.random()*1000)%25;
    }
    if(parseInt(Math.random()*1000)%2==0){
        Y+=parseInt(Math.random()*1000)%25;
    }else{
        Y-=parseInt(Math.random()*1000)%25;
    }
    game.add.tween(p).to({x: X, y: Y}, 1400, Phaser.Easing.Back.Out, true);
}
simulation.addNeutron = function(particle){
    var p = simulation.neutron.create(simulation.particlePosition.x,simulation.particlePosition.y,'neutron');
    p.scale.setTo(0.1,0.1);
    p.anchor.setTo(0.5,0.5);
    p.inputEnabled= true;
    p.input.enableDrag(true);
    p.events.onDragStop.add(simulation.draggedProtonNeutron, this);

    var X = position['atom']['centerX'];
    var Y = position['atom']['centerY'];
    if(parseInt(Math.random()*1000)%2==0){
        X-=parseInt(Math.random()*1000)%25;
    }else{
        X+=parseInt(Math.random()*1000)%25;
    }
    if(parseInt(Math.random()*1000)%2==0){
        Y+=parseInt(Math.random()*1000)%25;
    }else{
        Y-=parseInt(Math.random()*1000)%25;
    }
    game.add.tween(p).to({x: X, y: Y}, 1400, Phaser.Easing.Back.Out, true);
}


simulation.toggleNucleusPlaceholder = function(){
    if(simulation.nucleusPlaceholder==undefined){
        simulation.nucleusPlaceholder = game.add.sprite(position['atom']['centerX'],position['atom']['centerY'],'x');
        simulation.nucleusPlaceholder.anchor.setTo(0.5,0.5);
    }else{
        simulation.nucleusPlaceholder.kill();
        simulation.nucleusPlaceholder = undefined;
    }   
}


simulation.createParticle = function(particle){
    var i = simulation.particles.create(position['particle'][particle+'X'],position['particle'][particle+'Y'],particle);
    i.scale.setTo(0.25,0.25);
    i.inputEnabled= true;
    i.input.enableDrag(true);
    i.events.onDragStop.add(simulation.draggedParticle, this);
    i.events.onDragStart.add(simulation.draggingParticle, this);
    i.anchor.setTo(0.5,0.5);
}
simulation.draggedProtonNeutron = function(item, pointer){
    var y= item.y- position['atom']['centerY'];
    var x= item.x- position['atom']['centerX'];
    var xy= x*x + y*y;
    if(xy >= position['radius']*position['radius']){
        for (var i = simulation.particles.children.length - 1; i >= 0; i--) {
            var particle = simulation.particles.children[i];
            if(particle.key == item.key)
                particle.kill();
        }
        item.kill();
        var p = simulation.particles.create(item.x,item.y,item.key);
        p.scale.setTo(0.25,0.25);
        p.inputEnabled= true;
        p.input.enableDrag(true);
        p.events.onDragStop.add(simulation.draggedParticle, this);
        p.events.onDragStart.add(simulation.draggingParticle, this);
        p.anchor.setTo(0.5,0.5);
        simulation.tween(p);

        if(item.key == "neutron"){
            simulation.neutronSum--;
        }else if(item.key == "proton"){
            simulation.protonSum--;
            simulation.updateAtomDetail();
        }
        if(simulation.protonSum+simulation.neutronSum==0){
            simulation.toggleNucleusPlaceholder();
        }

    }
}

simulation.updateAtomDetail = function(){
    if(simulation.showElement){
        var elt = periodicTable.searchByAtomicNumber(simulation.protonSum);
        if(elt!=-1)
            simulation.atomName.text = elt["element"];
        else
            simulation.atomName.text = "";
    }
}
simulation.draggedParticle = function(item, pointer) {
    var y= item.y- position['atom']['centerY'];
    var x= item.x- position['atom']['centerX'];
    var xy= x*x + y*y;
    if(xy <= simulation.level*simulation.level*position['radius']*position['radius']){
        simulation.particlePosition.x = item.x;
        simulation.particlePosition.y = item.y;
        item.kill();
        simulation.updateAtom(item);
        simulation.createParticle(item.key);   
    }else{//console.log("Right!!");
        item.scale.setTo(0.25,0.25);
        var x = item.key+'X';
        var y = item.key+'Y';
        game.add.tween(item).to({x: position['particle'][x], y: position['particle'][y]}, 1400, Phaser.Easing.Back.Out, true);
    }
}
simulation.draggingParticle = function(item, pointer) {
    item.scale.setTo(0.15,0.15);   
}
simulation.tween = function(particle){
    particle.scale.setTo(0.25,0.25);
    game.add.tween(particle).to({x: position['particle'][particle.key+'X'], y: position['particle'][particle.key+'Y']}, 1400, Phaser.Easing.Back.Out, true);
}



















































/*
*
*
* Set Default
*
*
*/

game.state.add('menu',menuState);
game.state.add('chall1',chall1State);
game.state.add('sim',simulation);
game.state.start('chall1');

