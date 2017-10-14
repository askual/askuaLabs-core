var xxx = new this.radioButton(100,100);
        console.log("xxx=",xxx);
        xxx.addRadio("One");
        xxx.addRadio("two");
        xxx.addRadio("three");




var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

var game = new Phaser.Game(winWidth, winHeight-55, Phaser.AUTO,'simulationField');


var shortNotation = {
    'M': 'Male',
    'F': 'Female',
    'MP': 'Father',
    'FP': 'Mother'
};
var settingWidth= 3*winWidth/4;
var extendedHeight=10000;
console.log("W",settingWidth,"H",winHeight-55);
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
        'RM' : 'ear2',

        'DB' : 'tongueBD',
        'RB' : 'tongueBR',
        'DG' : 'tongueGD',
        'RG' : 'tongueGR'
    }
};
var position = {
    // DOMINANT AND RECESSIVE
    'D': {
        'x': 3*winWidth/4 + winWidth/16,
        'y' : winHeight/4 -35
    },
    'R': {
        'x': winWidth - winWidth/16,
        'y' : winHeight/4 -35
    },
    // AVATAR, PARENTS, CHILD
    'avatar':{
        'x': 150,
        'y': 100
    },
    'parent':{
        'x': 150,
        'y': 100
    },
    'children':{
        'x': 50,
        'y': 100
    },
    // SETTING
    'SettingEar':{
        'x': 3*winWidth/4 + winWidth/16,
        'y': 3*winHeight/4 -55
    },
    'SettingTongue':{
        'x': winWidth - winWidth/16,
        'y': 3*winHeight/4 -55
    },
    // TEXTS
    'instruction':{
        'x': winWidth- 250,
        'y': 150
    }
};


var now = 'tongue';
var person;
var avatar;
var infoText;
var instruction;
var settingButtons;

// Phase One
var phaseOne = true;
var shouldChangeSex= false;
var childToParent = false;
var nextStage= false;
var formParent = false;

var parentsGene=[];
var childrenGene=[];
var sex = 'F';


// Phase Two
var moveUp = false;
var formation = false;
var dontMove = false;
var xx; //a.label
var formChildren = false;
var stage=0;

var parents;
var children;

var simState =  {
    preload:function() {
        game.stage.backgroundColor = '#a99994';
        game.load.image('tongue', 'images/my/tongue.png');
        game.load.image('tongueFD', 'images/my/tongue.png');
        game.load.image('tongueMD', 'images/my/tongueMD.png');
        game.load.image('tongueFR', 'images/my/tongueFR.png');
        game.load.image('tongueMR', 'images/my/tongueMR.png');

        game.load.image('tongueGD', 'images/my/tongueGR.png');
        game.load.image('tongueBD', 'images/my/tongueBD.png');
        game.load.image('tongueGR', 'images/my/tongueGR.png');
        game.load.image('tongueBR', 'images/my/tongueBR.png');


        game.load.image('settingBg', 'images/my/settingBackground.png');
        game.load.image('settingBg2', 'images/my/settingBackground2.png');
        game.load.image('divider', 'images/my/divider.png');

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
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, -extendedHeight, 0, extendedHeight);

        //=============== CREATING BGS ===================
        var bg0 = game.add.sprite(0,0,'settingBg');
        bg0.fixedToCamera = true;
        bg0.cameraOffset.setTo(settingWidth, 0);
        window.sharpSprite(bg0,game.world.width/4,winHeight);

        var bg1= game.add.sprite(0,0,'settingBg2');
        bg1.fixedToCamera = true;
        bg1.cameraOffset.setTo(settingWidth+2, 2);
        window.sharpSprite(bg1,game.world.width/4 - 4,(winHeight-55)/2 - 4);

        var bg2= game.add.sprite(0,0,'divider');
        bg2.fixedToCamera = true;
        bg2.cameraOffset.setTo(settingWidth,(winHeight-55)/2);
        window.sharpSprite(bg2,game.world.width/4,bg2.height);
        //console.log(game.world);
        //===================================================
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
        
        //TEXTS
        infoText = game.add.text(0,0, 'now: Tongue', { fontSize: '32px', fill: '#000' });
        infoText.fixedToCamera = true;
        infoText.cameraOffset.setTo(winHeight/2,26);

        instruction = game.add.text(0,0, 'Choose the mother', { fontSize: '25px', fill: '#000' });
        instruction.fixedToCamera = true;
        instruction.anchor.setTo(0.5,0.5);
        instruction.cameraOffset.setTo(winWidth-winWidth/8, winHeight/2-55);

        //PERSON TYPE
        var dominantTrait = person.create(0,0, assets[now].DF);
        dominantTrait.fixedToCamera = true;
        dominantTrait.cameraOffset.setTo(position.D.x,position.D.y);
        dominantTrait.anchor.setTo(0.5,0.5);

        dominantTrait.scale.setTo(0.25,0.3);
        dominantTrait.inputEnabled = true;
        dominantTrait.input.enableDrag(true);
        dominantTrait.rord= 'D';

        var recessiveTrait = person.create(0,0, assets[now].RF);
        recessiveTrait.fixedToCamera = true;
        recessiveTrait.cameraOffset.setTo(position.R.x,position.R.y);
        recessiveTrait.scale.setTo(0.25,0.3);
        recessiveTrait.anchor.setTo(0.5,0.5);

        recessiveTrait.inputEnabled = true;
        recessiveTrait.input.enableDrag(true);
        recessiveTrait.rord= 'R';

        // AVATAR
        this.createAvatar(2,0,true);

        // SETTING CONTROLLER
        var b1= game.add.button(0,0, 'SettingEar',this.settings);
        b1.fixedToCamera = true;
        b1.cameraOffset.setTo(position.SettingEar.x,position.SettingEar.y);
        b1.anchor.setTo(0.5,0.5);
        settingButtons.add(b1);

        var b2 = game.add.button(0,0, 'SettingTongue', this.settings);
        b2.fixedToCamera = true;
        b2.cameraOffset.setTo(position.SettingTongue.x,position.SettingTongue.y);
        b2.anchor.setTo(0.5,0.5);
        settingButtons.add(b2);
    },
    update:function(){
        
        if(phaseOne){
            //game.physics.arcade.overlap(person, avatar, this.choosePerson, null, this);
            this.changeSex();
            this.stageCalc();
            this.parentsMove();
            //this.selectChild();
        }else{
            game.physics.arcade.overlap(person, avatar, this.collisionAvatar, null, this);
            this.movement();
            this.centralController();
            this.realFormation();
            this.form4Children();
        }
    },

    createAvatar: function(total, initial, truthValue){
        for(var i=0;i<total;i++){
            var v= avatar.create(0,0, 'avatar');
            v.fixedToCamera = truthValue;
            v.cameraOffset.setTo(position.avatar.x+ 100*(i+initial) ,position.avatar.y);
        }
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
    // PHASE ONE
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
                            replacement.label = 'Dr';                    
                        }else if(ssss="DD"){
                            var label= children.create(position.avatar.x+x,position.avatar.y+50, 'buttonD');   
                            label.scale.setTo(0.25,0.3);
                            replacement.label = 'DD';                  
                        }
                    }else{
                        replacement = children.create(position.avatar.x+x,position.avatar.y, assets[now]['RG']);
                        replacement.label = 'rr';
                    }
                    replacement.scale.setTo(0.25,0.3);
                    //childrenGene[3];
                }
                phaseOne = false;
                instruction.text = 'Click from the family tree';
                //*/
                t=false;   
                childToParent = true;   

            }
            //nextStage = false;
        }
    },






    // PHASE TWO
    movement: function(){
        var t =true;
        var ss = parents.children.length;
        for(var x =0;x<ss;x++){
            if(parents.children[x].y+parents.children[x].height-50 >= 0)
                t = false;
        }
        var sss = children.children.length;
        for(var x =0;x<sss;x++){
            if(children.children[x].y+children.children[x].height-50 >= 0)
                t = false;
        }
        if(t && !dontMove){
            this.moveBy(0);
            formation = true;
            dontMove = true;
        }else{
            dontMove = false;

        }
    },
    moveBy: function(myV){
        console.log("two");
        var ss = children.children.length;
        for(var x =0;x<ss;x++){
            children.children[x].body.velocity.y = myV;
        }
        var sss = parents.children.length;
        for(var x =0;x<sss;x++){
            parents.children[x].body.velocity.y = myV;
        } 
    },



    collisionAvatar: function(personA, avatarA){
        avatarA.kill();
        personA.kill();

        /*
        if(personA.rord == 'R'){
            var replacement = person.create(position[personA.rord].x,position[personA.rord].y,'');
            replacement.
        }else{

        }
        */

        
        var newParent = parents.create(avatarA.x,avatarA.y, personA.key);
        newParent.scale.setTo(0.25,0.3);

        if(personA.rord == 'D'){        
            instruction.text = 'Choose the type of dominance';
            var fullDominant = game.add.button(avatarA.x,avatarA.y + avatarA.width/4, 'buttonD',function(){
                                        fullDominant.destroy();
                                        partialDominant.destroy();
                                        parentsGene.push('DD');
                                        formChildren = true;

                                    });
            fullDominant.scale.setTo(0.25,0.3);
            
            var partialDominant = game.add.button(avatarA.x,avatarA.y + avatarA.width- avatarA.width/4 , 'buttonR',function(){
                                        partialDominant.destroy();
                                        fullDominant.destroy();
                                        parentsGene.push('Dr');
                                        formChildren = true;
                                    });
            partialDominant.scale.setTo(0.25,0.3);
        }else{
            parentsGene.push('rr');
        }   
        this.moveBy(-50);
        formChildren = true;
        stage=10;   
    },
    form4Children: function(){
        if(formChildren && dontMove){
            console.log(parentsGene);
            var sssssss = parentsGene;
            childrenGene= [
                            sssssss[0][0]+sssssss[1][0],
                            sssssss[0][0]+sssssss[1][1],
                            sssssss[0][1]+sssssss[1][0],
                            sssssss[0][1]+sssssss[1][1]
                          ];
            for (var i = childrenGene.length - 1; i >= 0; i--) {
                if(childrenGene[i]=="rD"){
                    childrenGene[i]="Dr";
                }
            }
            /*
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
            */
            parentsGene = [];
            console.log("now!!!");

            // CREATING
            for(var x=0;x<400;x+=100){
                    var ssss= childrenGene[x/100][0];
                    var replacement;
                    if(ssss=='D'){
                        replacement = children.create(position.avatar.x+x,position.avatar.y, assets[now]['DB']);
                        if(ssss="Dr"){
                            var label= children.create(position.avatar.x+x,position.avatar.y+50, 'buttonR');
                            label.scale.setTo(0.25,0.3);
                            replacement.label = 'Dr';                    
                        }else if(ssss="DD"){
                            var label= children.create(position.avatar.x+x,position.avatar.y+50, 'buttonD');   
                            label.scale.setTo(0.25,0.3);
                            replacement.label = 'DD';                  
                        }
                    }else{
                        replacement = children.create(position.avatar.x+x,position.avatar.y, assets[now]['RG']);
                        replacement.label = 'rr';
                    }
                    replacement.scale.setTo(0.25,0.3);
                    //childrenGene[3];
                }


                
            formChildren = false;
            formation = false;
            stage= 0;
        }
    },







    centralController: function(){
        var ss = children.children.length;
        for(var x =0;x<ss;x++){
            children.children[x].inputEnabled = true;
            children.children[x].events.onInputDown.add(this.selectChild, this);
        }  
    },
    realFormation(){
        if(formation && stage==0){
            if(xx[0]=='DD'){
                var av= children.create(position.avatar.x,position.avatar.y, assets[now].DF);
                av.scale.setTo(0.25,0.3);
                av.enableBody = true;

                var label= children.create(position.avatar.x,position.avatar.y+50, 'buttonD');   
                label.scale.setTo(0.25,0.3);
            }else if(xx[0]=='Dr'){
                var av= children.create(position.avatar.x,position.avatar.y, assets[now].DF);
                av.scale.setTo(0.25,0.3);
                av.enableBody = true;

                var label= children.create(position.avatar.x,position.avatar.y+50, 'buttonR');   
                label.scale.setTo(0.25,0.3);
            }else{
                var av = children.create(position.avatar.x,position.avatar.y, assets[now].RF);
                av.scale.setTo(0.25,0.3);
            }

            var av = avatar.create(position.avatar.x+100,position.avatar.y, 'avatar');

            formation = false;
        }
    },

    selectChild: function(a){
        this.moveBy(-50);
        console.log(a);
        parentsGene[0]= a.label;
        xx = a.label;
    },





    // SPECIAL METHODS
    settings : function(a){
        console.log("wwww");
        var v = a.key;
        var vv = v.slice(7,v.length);
        now = vv.toLowerCase();
        infoText.text = 'now: '+vv;
        //this.create();

        now = now;
        var ss= 'Heredity '+ vv;
        console.log(document.getElementByID('topic'));
        var sss= document.getElementByID('topic');
        sss.innerHtml = ss;
        game.state.start('simulation');
    }
    
};

var desState = {
}

game.state.add('simulation',simState);
game.state.start('simulation');
