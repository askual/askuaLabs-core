var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

var game = new Phaser.Game(winWidth, winHeight, Phaser.AUTO,'simulationField',{ preload: preload, create: create, update: update });

var xxx;
var sss;
function preload() {
    game.stage.backgroundColor = '#a99994';
    controller.preload();
    brand.preload();
}
function create(){

    game.physics.startSystem(Phaser.Physics.ARCADE); 
    brand.setTitle("Heredity");
    brand.create();
    xxx = new controller.checkBox(100,100);
    xxx.addBox("One");
    xxx.addBox("two",true);
    xxx.addBox("three");
    xxx.addBox("six",true);
    xxx.addBox("seven");
    sss = game.add.text(305,100, "check", {  fill: '#000' });

}
function update(){
    //sss.text = xxx.result;
}

    


