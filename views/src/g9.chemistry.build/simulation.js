var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

var game = new Phaser.Game(winWidth, winHeight, Phaser.AUTO,'simulationField');

var simulation = { };

var position = {
    'atom' :{
        'centerX' : winWidth/4,
        'centerY' : winHeight/2
    },
    'particle' :{
        'electronX':    50,
        'electronY':    winHeight-100,
        'protonX':      150,
        'protonY':      winHeight-100,
        'neutronX':     250,
        'neutronY':     winHeight-100,
    },
    'radius' : 100,
    'text':{
        'ionNeutralX':  winWidth/4,
        'ionNeutralY':  winHeight/2 +125
    }
}


simulation.orbits = [2,8,8];
simulation.leftElectrons=2;
simulation.particlePosition ={};



simulation.electron;
simulation.proton;
simulation.neutron;
simulation.particles;
simulation.nucleusPlaceholder;
simulation.stage=1;

simulation.electronSum=0;
simulation.protonSum=0;
simulation.neutronSum=0;

//Text
simulation.atomName;
simulation.ionNeutral;
//controllers
simulation.show;
simulation.stable=1;
//Circles
simulation.c = [];
//Electrons
simulation.e =[];
simulation.toStage = function(x){
    if(x<3)     return 1;
    var answer = 2;
    x-=3;
    answer+=parseInt(x/8);
return answer;
}

/*
console.log("+++++", toStage(1));
console.log("+++++", toStage(2));
console.log("+++++", toStage(3));
console.log("+++++", toStage(4));
console.log("+++++", toStage(5));
console.log("+++++", toStage(6));
console.log("+++++", toStage(7));
console.log("+++++", toStage(8));
console.log("+++++", toStage(9));
console.log("+++++", toStage(10));
console.log("+++++", toStage(11));
console.log("+++++", toStage(12));
console.log("+++++", toStage(13));
*/

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
    brand.Button("challenge");


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

    /*
    var circle0 = new Phaser.Circle(position['atom']['centerX'],position['atom']['centerY'], 100);
    var graphics0 = game.add.graphics(0, 0);
    graphics0.lineStyle(2, 0x00ff00, 1);
    graphics0.drawCircle(circle0.x, circle0.y, circle0.diameter);
    c.push(circle0);
    */
    simulation.createCircle();
    
    //=======================================   CONTROLLERS
    simulation.show = new controller.checkBox(700,100,"Show");
    simulation.show.option("Element",true);
    simulation.show.option("Stable/Unstable");
    //simulation.show.option("Neutral/Ion");
    
    /*
    var ddd = new controller.radioButton(700,200,"hell");
    ddd.option("Blah Jojo");
    ddd.option("Blah Jojo Blah Jojo");
    ddd.option("Blah Jojo");
    */
    ee = new controller.onOff(700,200);
    //ee.destroy();
}
simulation.update = function(){
    if(ee.result()==true){
       ee.destroy();
    }
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
        simulation.stage++;
        simulation.createCircle();
        
        simulation.leftElectrons = simulation.orbits[stage];
        simulation.addElectron(particle); 
    }else if(simulation.leftElectrons!=0){
        var ang = 2*Math.PI/orbits[simulation.stage-1];
        var Y = position['atom']['centerY'] - (50+(50*simulation.stage))*Math.sin(leftElectrons*ang);
        var X = position['atom']['centerX'] + (50+(50*simulation.stage))*Math.cos(leftElectrons*ang);

        var p = electron.create(particlePosition.x,particlePosition.y,'electron');
        p.scale.setTo(0.15,0.15);
        p.anchor.setTo(0.5,0.5);
        p.inputEnabled= true;
        p.input.enableDrag(true);
        p.events.onDragStop.add(draggedElectron, this);

        game.add.tween(p).to({x: X, y: Y}, 1400, Phaser.Easing.Back.Out, true);
        leftElectrons--;

        //console.log(X,Y,ang,leftElectrons);
        p.stage = electronSum;
        p.XX = X;
        p.YY = Y;
        e.push(p);
    }
    console.log(e," <===");

}

simulation.createCircle = function(){
    var circle = new Phaser.Circle(position['atom']['centerX'],position['atom']['centerY'], 50+(50*simulation.stage));
    var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(2, 0x00ff00, 1);
    graphics.drawCircle(circle.x, circle.y, circle.diameter);
    simulation.c.push(graphics);
}

simulation.draggedElectron =function(item, pointer){
    var y= item.y- position['atom']['centerY'];
    var x= item.x- position['atom']['centerX'];
    var xy= x*x + y*y;
    
    if(xy >= position['radius']*position['radius']*simulation.stage*simulation.stage){
        console.log(electronSum, "[][]",e);
        simulation.electronSum--;
        item.kill();
        simulation.e.pop();
    }else{
        game.add.tween(item).to({x: e[item.stage-1].XX, y: e[item.stage-1].YY}, 1400, Phaser.Easing.Back.Out, true);
        //game.add.tween(item).to({x: item.XX, y: item.YY}, 1400, Phaser.Easing.Back.Out, true);
    }

    /*
    var y= item.y- position['atom']['centerY'];
    var x= item.x- position['atom']['centerX'];
    var xy= x*x + y*y;
    
    if(xy >= position['radius']*position['radius']*stage*stage){
        for (var i = particles.children.length - 1; i >= 0; i--) {
            var particle = particles.children[i];
            if(particle.key == item.key)
                particle.kill();
        }
        item.kill();
        var p = particles.create(item.x,item.y,item.key);
        p.scale.setTo(0.25,0.25);
        p.inputEnabled= true;
        p.input.enableDrag(true);
        p.events.onDragStop.add(draggedParticle, this);
        p.events.onDragStart.add(draggingParticle, this);
        p.anchor.setTo(0.5,0.5);
        tween(p);
        leftElectrons++;

        //=================================================================    
        game.add.tween(e[electronSum-1]).to({x: e[item.stage-1].X, y: e[item.stage-1].Y}, 1400, Phaser.Easing.Back.Out, true);

        if(orbits[stage-1]!=leftElectrons){
            e.pop();
        }else{
            e.pop();
            c[electronSum-1].destroy();
            c.pop();
        }

        electronSum--;
        //toStage
        stage = toStage(electronSum);
    }
    */
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

}
simulation.addProton = function(particle){
    var p = proton.create(particlePosition.x,particlePosition.y,'proton');
    p.scale.setTo(0.1,0.1);
    p.anchor.setTo(0.5,0.5);
    p.inputEnabled= true;
    p.input.enableDrag(true);
    p.events.onDragStop.add(draggedProtonNeutron, this);

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
    var p = neutron.create(particlePosition.x,particlePosition.y,'neutron');
    p.scale.setTo(0.1,0.1);
    p.anchor.setTo(0.5,0.5);
    p.inputEnabled= true;
    p.input.enableDrag(true);
    p.events.onDragStop.add(draggedProtonNeutron, this);

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
        for (var i = particles.children.length - 1; i >= 0; i--) {
            var particle = particles.children[i];
            if(particle.key == item.key)
                particle.kill();
        }
        item.kill();
        var p = particles.create(item.x,item.y,item.key);
        p.scale.setTo(0.25,0.25);
        p.inputEnabled= true;
        p.input.enableDrag(true);
        p.events.onDragStop.add(draggedParticle, this);
        p.events.onDragStart.add(draggingParticle, this);
        p.anchor.setTo(0.5,0.5);
        tween(p);

        if(item.key == "neutron"){
            neutronSum--;
        }else if(item.key == "proton"){
            protonSum--;
            updateAtomDetail();
        }
        if(protonSum+neutronSum==0){
            toggleNucleusPlaceholder();
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
    if(xy <= simulation.stage*simulation.stage*position['radius']*position['radius']){
        console.log(";;;");
        simulation.particlePosition.x = item.x;
        simulation.particlePosition.y = item.y;
        item.kill();
        simulation.updateAtom(item);
        simulation.createParticle(item.key);   
    }else{
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

    


game.state.add('sim',simulation);
game.state.start('sim');





