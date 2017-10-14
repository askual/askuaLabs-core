var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

var game = new Phaser.Game(winWidth, winHeight-55, Phaser.AUTO,'simulationField');
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
        game.state.start('challenges');
    }
}

var now = 'tongue';
var shortNotation = {
    'M': 'Male',
    'F': 'Female',
    'MP': 'Father',
    'FP': 'Mother'
};
var assets= {
    'tongue': {
        'DF' : 'tongue',
        'RF' : 'tongueFR',
        'DM' : 'tongueMD',
        'RM' : 'tongueMR',

        'DB' : 'tongueBD',
        'RB' : 'tongueBR',
        'DG' : 'tongueGD',
        'RG' : 'tongueGR'
    },
    'ear' : {
        'DF' : 'ear',
        'RF' : 'ear2',
        'DM' : 'ear',
        'RM' : 'ear2'
    }
};

var position = {
    // DOMINANT AND RECESSIVE
    'D': {
        'x': winWidth-200,
        'y' : 10
    },
    'R': {
        'x': winWidth-100,
        'y' : 10
    },
    // AVATAR, PARENTS, CHILD
    'avatar':{
        'x': 50,
        'y': 100
    },
    // SETTING
    'SettingEar':{
        'x': winWidth- 200,
        'y': winHeight- 200
    },
    'SettingTongue':{
        'x': winWidth- 100,
        'y': winHeight- 200
    },
    // TEXTS
    'instruction':{
        'x': winWidth- 250,
        'y': 150
    }
};


var person;
var avatar;
var infoText;
var instruction;
var settingButtons;

var shouldChangeSex= false;


var childToParent = false;

var nextStage= false;
var parentsGene=[];
var childrenGene=[];
var sex = 'F';
var stage=0;
var formParent = false;

var parents;
var children;

var simState =  {
    preload:function() {
        game.load.image('tongue', 'images/my/tongue.png');
        game.load.image('tongueFD', 'images/my/tongue.png');
        game.load.image('tongueMD', 'images/my/tongueMD.png');
        game.load.image('tongueFR', 'images/my/tongueFR.png');
        game.load.image('tongueMR', 'images/my/tongueMR.png');

        game.load.image('tongueGD', 'images/my/tongueGR.png');
        game.load.image('tongueBD', 'images/my/tongueBD.png');
        game.load.image('tongueGR', 'images/my/tongueGR.png');
        game.load.image('tongueBR', 'images/my/tongueBR.png');


        game.load.image('buttonD', 'images/my/buttonD.png');
        game.load.image('buttonR', 'images/my/buttonR.png');
        game.load.image('tongue2', 'images/my/tongue2.png');
        game.load.image('ear', 'images/my/earD.png');
        game.load.image('ear2', 'images/my/earR.png');
        game.load.image('avatar', 'images/my/avatar.png');
        game.load.image('SettingEar', 'images/my/ear.png');
        game.load.image('SettingTongue', 'images/my/avatar.png');
    },
	create:function(){
    	game.stage.backgroundColor = '#a99994';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //=============== CREATING GROUPS ===================
        parents = game.add.group();
        parents.enableBody = true;
        children = game.add.group();
        children.enableBody = true;
        person = game.add.group();
        person.enableBody = true;
        avatar = game.add.group();
        avatar.enableBody = true;
        settingButtons = game.add.group();
        settingButtons.enableBody = true;
        //===================================================
        
        infoText = game.add.text(game.world.centerX,16, 'now: Tongue', { fontSize: '32px', fill: '#000' });

        instruction = game.add.text(position.instruction.x, position.instruction.y, 'Choose the mother', { fontSize: '25px', fill: '#000' });

        //PERSON TYPE
        var dominantTrait = person.create(position.D.x,position.D.y, assets[now].DF);
        dominantTrait.scale.setTo(0.25,0.3);
        dominantTrait.inputEnabled = true;
        dominantTrait.input.enableDrag(true);
        dominantTrait.rord= 'D';

        var recessiveTrait = person.create(position.R.x,position.R.y, assets[now].RF);
        recessiveTrait.scale.setTo(0.25,0.3);
        recessiveTrait.inputEnabled = true;
        recessiveTrait.input.enableDrag(true);
        recessiveTrait.rord= 'R';

        // AVATAR
        avatar.create(position.avatar.x,position.avatar.y, 'avatar');
        avatar.create(position.avatar.x+100,position.avatar.y, 'avatar');

        // SETTING CONTROLLER
        var b1= game.add.button(position.SettingEar.x,position.SettingEar.y, 'SettingEar',this.settings);
        settingButtons.add(b1);
        var b2 = game.add.button(position.SettingTongue.x,position.SettingTongue.y, 'SettingTongue', this.settings);
        settingButtons.add(b2);
	},
	update:function(){
        game.physics.arcade.overlap(person, avatar, this.choosePerson, null, this);
        this.changeSex();

        this.stageCalc();
        this.parentsMove();
        this.selectChild();
	},

    choosePerson: function(personA, avatarA){
        avatarA.kill();
        personA.kill();
        
        var replacement = parents.create(avatarA.x,avatarA.y, personA.key);
        replacement.scale.setTo(0.25,0.3);

        if(personA.rord == 'D'){        
            instruction.text = 'Choose the type of dominance';
            var fullDominant = game.add.button(avatarA.x,avatarA.y + avatarA.width/4, 'buttonD',function(){
                                        fullDominant.destroy();
                                        partialDominant.destroy();
                                        parentsGene.push('DD');
                                        //b.changeSex(sex);
                                        shouldChangeSex = true;
                                    });
            fullDominant.scale.setTo(0.25,0.3);

            var partialDominant = game.add.button(avatarA.x,avatarA.y + avatarA.width- avatarA.width/4 , 'buttonR',function(){
                                        partialDominant.destroy();
                                        fullDominant.destroy();
                                        parentsGene.push('Dr');
                                        //b.changeSex(sex);
                                        shouldChangeSex = true;
                                    });
            partialDominant.scale.setTo(0.25,0.3);
        }else{
            parentsGene.push('rr');
            shouldChangeSex = true;
        }      
    },
    changeSex: function(){
        if(shouldChangeSex){
            var a;
            if(sex=='M'){
                    a='F';
            }else{
                a='M';
            }

            var ss = person.children.length;
            for(var x =0;x<ss;x++){
                person.children[x].kill();
            }
            var dv= 'D'+a;
            
            var dominantTrait = person.create(position.D.x,position.D.y, assets[now]['D'+a]);
            dominantTrait.scale.setTo(0.25,0.3);
            dominantTrait.inputEnabled = true;
            dominantTrait.input.enableDrag(true);
            dominantTrait.rord= 'D';

            var recessiveTrait = person.create(position.R.x,position.R.y, assets[now]['R'+a]);
            recessiveTrait.scale.setTo(0.25,0.3);
            recessiveTrait.inputEnabled = true;
            recessiveTrait.input.enableDrag(true);
            recessiveTrait.rord= 'R';
            instruction.text = 'Choose the ' + shortNotation[a+'P'];
            sex = a;

            shouldChangeSex= false;
        }
    },


    stageCalc: function(){
        if(parentsGene.length==2){
            childrenGene= [
                            parentsGene[0][0]+parentsGene[1][0],
                            parentsGene[0][0]+parentsGene[1][1],
                            parentsGene[0][1]+parentsGene[1][0],
                            parentsGene[0][1]+parentsGene[1][1]
                          ];
            for (var i = childrenGene.length - 1; i >= 0; i--) {
                if(childrenGene[i]=="rD"){
                    childrenGene[i]="Dr";
                }
            }
            parentsGene = [];
        
            //========== previous moveup =================
            
            var ss = parents.children.length;
            for(var x =0;x<ss;x++){
                parents.children[x].body.velocity.y = -50;
            }
            nextStage = true;
            //============================================
        }
    },
    parentsMove: function(){
        if(nextStage){
            var ss = parents.children.length;
            var t =true;
            var s;
            for(var x =0;x<ss;x++){
                if(parents.children[x].y+parents.children[x].height-50 >= 0)
                    t = false;
                s=parents.children[x].y;
            }
            var sss = children.children.length;
            for(var x =0;x<sss;x++){
                if(children.children[x].y+children.children[x].height-50 >= 0)
                    t = false;
            }
            if(t==true){
                for(var x =0;x<ss;x++){
                    parents.children[x].body.velocity.y = 0;
                }
                for(var x =0;x<sss;x++){
                    children.children[x].body.velocity.y = 0;
                }
                formParent= true;
            }
            if(t==true && s!=undefined){
                for(var x =0;x<ss;x++){
                    parents.children[x].body.velocity.y = 0;
                }
                // CHILDREN ARE FORMED
                for(var x=0;x<400;x+=100){
                    var ssss= childrenGene[x/100][0];
                    var replacement;
                    if(ssss=='D'){
                        replacement = children.create(position.avatar.x+x,position.avatar.y, assets[now]['DB']);
                        if(ssss="Dr"){
                            var label= children.create(position.avatar.x+x,position.avatar.y+50, 'buttonR');
                            label.scale.setTo(0.25,0.3);                    
                        }else if(ssss="DD"){
                            var label= children.create(position.avatar.x+x,position.avatar.y+50, 'buttonD');   
                            label.scale.setTo(0.25,0.3);                 
                        }
                    }else{
                        replacement = children.create(position.avatar.x+x,position.avatar.y, assets[now]['RG']);
                    }
                    replacement.scale.setTo(0.25,0.3);
                    //childrenGene[3];
                }
                instruction.text = 'Click from the family tree';
                //*/
                t=false;   
                childToParent = true;                             
            }
            //nextStage = false;
        }
    },

    selectChild: function(){
        if(childToParent==true && nextStage==true){
            var ss = children.children.length;

            for(var x =0;x<ss;x++){
                console.log("x = "+x);
                children.children[x].inputEnabled = true;
                console.log(children.children[x].events);
                children.children[x].events.onInputDown.add(this.selectChild2, this);
            }          
            childToParent= false;
            nextStage = false;
        }
    },

    selectChild2: function(a){
        console.log("hhhhhh");
        console.log(a.key);

        var vv = a.key.slice(a.key.length-2,a.key.length);
        console.log(vv);

        var ss = parents.children.length;
        for(var x =0;x<ss;x++){
            parents.children[x].body.velocity.y = -50;
        }
        var sss = children.children.length;
        for(var x =0;x<sss;x++){
            children.children[x].body.velocity.y = -50;
        }
    },
    settings : function(a){
        console.log("wwww");
        var v = a.key;
        var vv = v.slice(7,v.length);
        now = vv.toLowerCase();
        infoText.text = 'now: '+vv;
        //this.create();

        now = now;
        game.state.start('simulation');
    }
    
};

var desState = {
}

game.state.add('menu',menuState)
game.state.add('simulation',simState);
game.state.start('simulation');
