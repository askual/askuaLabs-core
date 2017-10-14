if(!controller){
    var controller = {};
}else if (typeof controller != 'object') {
    throw Error('Error with the namespace')
}
controller.preload = function(){
    // RADIOBUTTON
    game.load.image('radioButtonUnchecked', '../../assets/img/controller/buttonUnchecked.png');
    game.load.image('radioButtonChecked', '../../assets/img/controller/buttonChecked.png');

    // CHECKBOX
    game.load.image('checkboxChecked', '../../assets/img/controller/CheckBoxChecked.png');
    game.load.image('checkboxUnchecked', '../../assets/img/controller/CheckBoxUnchecked.png');

    // NUMBER AREA
    game.load.image('buttonUp', '../../assets/img/controller/buttonUp.png');
    game.load.image('buttonDown', '../../assets/img/controller/buttonDown.png');

    //BUTTON
    game.load.image('button', '../../assets/img/controller/button.png');
    
    //SWITCH
    game.load.image('askua_on','../../assets/img/controller/onSwitch.png');
    game.load.image('askua_off','../../assets/img/controller/offSwitch.png');
    //SLIDER
    game.load.image('row','../../assets/img/controller/sliderRow.png');
    game.load.image('col','../../assets/img/controller/sliderCol.png');
}


//================= BUTTON ======================= 
controller.button = function(w,h,t,f){
    var ziz = this;
    var b = game.add.button(w, h, 'button', f);
    var t = game.add.text(w+1,h+1, t, {  fill: '#000' });
    this.destroy = function(){
        t.destroy();
        b.input.stop();
        b.destroy();
    }
}

//================= NUMBER AREA ======================= 

controller.numberArea = function(w,h,ul,ll,i){
    var ziz = this;

    if(ul==undefined)
        ul=99;
    if(ll==undefined)
        ll=-99;
    ziz.upperLimit = ul;
    ziz.lowerLimit = ll;

    ziz.rectangle = game.add.graphics(0, 0);
    ziz.rectangle.lineStyle(2, 0x000000, 1);
    ziz.rectangle.drawRect(w, h, 75, 50);
    if(i==undefined)
        i=0;
    ziz.number = i;
    ziz.numberText = game.add.text(w+10,h+10, ziz.number+"", {  fill: '#000' });
    ziz.numberText.fontSize = 35;
    ziz.result = function(){
        return ziz.number;
    }
    var up = game.add.button(w+50, h, 'buttonUp', function(){
        if(ziz.number<ziz.upperLimit)
            ziz.number+=1;
        ziz.numberText.text= ziz.number;
    });
    var down = game.add.button(w+50, h+28, 'buttonDown', function(){
        if(ziz.number>ziz.lowerLimit)
            ziz.number-=1;
        ziz.numberText.text= ziz.number;
    });
    ziz.destroy = function(){
        ziz.rectangle.destroy();
        up.input.stop();
        up.destroy();
        down.input.stop();
        down.destroy();
        ziz.numberText.destroy();
    }

}
//================= CHECKBOX ======================= 

controller.checkBox = function(w,h,t){
    var ziz = this;
    this.width      = w;
    this.height     = h;
    this.sumOfBoxes = 0;
    this.clickedButton;
    this.lastClickedBox;
    this.result     = [];
    this.checked    = [];
    this.title = t;
    this.container;
    this.maxWidth=0;
    this.options1= [];
    this.options2= [];
    //Set title
    this.titleText=  game.add.text(w-10,h-20, ziz.title, {  fill: '#000' });
    this.titleText.fontSize = 18;

    this.isActive = function(x){
        for(var i=0;i<ziz.checked.length;i++){
            if(ziz.checked[i].name == x)
                return true;
        }
        return false;
    }
    this.setContainer = function(){
        if(ziz.container!=undefined){
            ziz.container.destroy();
        }
        ziz.container = game.add.graphics(0, 0);

        ziz.container.lineStyle(2, 0x000000, 1);
        ziz.container.drawRect(w-20, h-25, 20+17 + 10*ziz.maxWidth, 20+ 22*ziz.sumOfBoxes + 10);

    }
    this.option   = function(text,isDefault){
        if(text.length > ziz.maxWidth)
            ziz.maxWidth = text.length;

        if(isDefault){
            ziz.lastClickedBox = game.add.button(ziz.width,ziz.height+ ziz.sumOfBoxes*22, 'checkboxUnchecked',ziz.clicked);
            ziz.lastClickedBox.name = text;

            var radioText = game.add.text(ziz.width+25,ziz.height+ ziz.sumOfBoxes*22, text, {  fill: '#000' });
            radioText.fontSize = 16;
            ziz.sumOfBoxes++;

            var d= game.add.button(ziz.width,ziz.height+ (ziz.sumOfBoxes-1)*22 , 'checkboxChecked',ziz.clicked);
            d.name = text;
            ziz.checked.push(d);
            ziz.result.push(d.name);

            ziz.options1.push(radioText);
            ziz.options2.push(d);
            ziz.options2.push(ziz.lastClickedBox);
        }else{
            ziz.lastClickedBox = game.add.button(ziz.width,ziz.height+ ziz.sumOfBoxes*22, 'checkboxUnchecked',ziz.clicked);
            ziz.lastClickedBox.name = text;

            var radioText = game.add.text(ziz.width+25,ziz.height+ ziz.sumOfBoxes*22, text, {  fill: '#000' });
            radioText.fontSize = 16;
            ziz.sumOfBoxes++;

            ziz.options1.push(radioText);
            ziz.options2.push(ziz.lastClickedBox);
        }
        ziz.setContainer();   
    }
    this.clicked    = function(b){
        var c = ziz.checked.findIndex(function (elt){
                                return elt.name==b.name;
                            }); 
        if(c==-1){
            var d= game.add.button(b.x,b.y, 'checkboxChecked',ziz.clicked);
            d.name = b.name;
            ziz.checked.push(d);
            ziz.result.push(d.name);
        }else{
            ziz.checked[c].visible = false;
            ziz.checked.remove(c);
            ziz.result.remove(c);
        }
    }
    this.destroy = function(){
        for(var i=0;i<ziz.options1.length;i++){
            ziz.options1[i].destroy();
        }
        for(var i=0;i<ziz.options2.length;i++){
            ziz.options2[i].kill();
        }
        for(var i=0;i<ziz.checked.length;i++){
            ziz.checked[i].kill();
        }
        
        ziz.titleText.destroy();
        ziz.container.destroy();

    }
    /*
    this.result     = function(x){
        return(ziz.isActive(x)); 
    }
    */
}

//================= RADIOBUTTON ======================= 

controller.radioButton = function(w,h,t){
    var ziz = this;
    this.width      = w;
    this.height     = h;
    this.sumOfRadio = 0;
    this.clickedButton;
    this.lastRadio;
    this.maxWidth=0;
    this.result = "=ho-oh=";
    this.options2=[];
    this.options1=[];
    this.setContainer = function(){
        if(ziz.container!=undefined){
            ziz.container.destroy();
        }
        ziz.container = game.add.graphics(0, 0);

        ziz.container.lineStyle(2, 0x000000, 1);
        ziz.container.drawRect(w-20, h-25, 20+17 + 10*ziz.maxWidth, 20+ 22*ziz.sumOfRadio + 10);

    }
    //Title
    if(t!=undefined){
        ziz.titleText= game.add.text(w-10,h-20, t, {  fill: '#000' });
        ziz.titleText.fontSize = 18;
    }else{
        ziz.titleText= game.add.text(w-10,h-20, "", {  fill: '#000' });
    }
    this.option   = function(text,isDefault){
        if(text.length > ziz.maxWidth)
            ziz.maxWidth = text.length;
        if(isDefault){
            ziz.lastRadio = game.add.button(ziz.width,ziz.height+ ziz.sumOfRadio*22, 'radioButtonUnchecked',ziz.clicked);
            ziz.lastRadio.name = text;

            var radioText = game.add.text(ziz.width+25,ziz.height+ ziz.sumOfRadio*22, text, {  fill: '#000' });
            radioText.fontSize = 16;
            ziz.sumOfRadio++;

            ziz.clickedButton= game.add.button(ziz.width,ziz.height+ (ziz.sumOfRadio-1)*22 , 'radioButtonChecked' ,ziz.clicked);
            ziz.result = text;

            ziz.options1.push(ziz.lastRadio);
            ziz.options1.push(ziz.clickedButton);
            ziz.options2.push(radioText);
        }else{
            ziz.lastRadio = game.add.button(ziz.width,ziz.height+ ziz.sumOfRadio*22, 'radioButtonUnchecked',ziz.clicked);
            ziz.lastRadio.name = text;

            var radioText = game.add.text(ziz.width+25,ziz.height+ ziz.sumOfRadio*22, text, {  fill: '#000' });
            radioText.fontSize = 16;
            ziz.sumOfRadio++;

            ziz.options1.push(ziz.lastRadio);
            ziz.options2.push(radioText);
        }
        ziz.setContainer();     
    }
    this.clicked    = function(b){
        if(ziz.clickedButton){
            ziz.clickedButton.visible = false;
            ziz.clickedButton= game.add.button(b.x,b.y, 'radioButtonChecked',this.clicked);
        }else{
            ziz.clickedButton= game.add.button(b.x,b.y, 'radioButtonChecked',this.clicked);
        }
        ziz.result = b.name; 
        ziz.options1.push(ziz.clickedButton);
    }
    this.destroy = function(){
        ziz.titleText.destroy();
        ziz.container.destroy();

        for(var i=0;i<ziz.options1.length;i++){
            ziz.options1[i].kill();
        }
        for(var i=0;i<ziz.options2.length;i++){
            ziz.options2[i].destroy();
        }
    }
}




//================= TEXTAREA ======================= 
controller.textArea = function(title,text,px,py){
    var ziz = this;
    ziz.x = px;
    ziz.y = py;
    ziz.body    = text;
    ziz.title   = title;
    ziz.maxWidth    = 0;
    ziz.lineCount   = 1;
    ziz.letterCount = 0;
    ziz.bodyText;
    ziz.titleText;
    ziz.newLineIndexes = [];
    ziz.setTitleAndText = function(){
        if(ziz.titleText==undefined)
            ziz.titleText= game.add.text(px-10,py-20, ziz.title, {font:"18px Arial",fill:"#000"});
        else
            ziz.titleText.text = ziz.title;
        
        if(ziz.bodyText==undefined)
            ziz.bodyText= game.add.text(px,py, ziz.body, {font:"14px Arial",fill:"#000"});
        else
            ziz.bodyText.text = ziz.body;
        
    }
    ziz.beutifyText = function(){
        var wholeText="";
        for(var i=0;i<ziz.lineCount;i++){
            var line = ziz.body.slice(ziz.newLineIndexes[i],ziz.newLineIndexes[i+1])+" ";
            var leng = line.length;
            var rest = ziz.maxWidth - leng;
            
            var arr = [];
            var last= 0;
            for(var v=1;v<leng;v++){
                if(line[v]==" "){
                    var r = line.slice(last,v);
                   arr.push(r);
                    last = v;
                }
            }
            
            //var x = parseInt();
            console.log(line);
            console.log(arr);
            
            var va = parseInt(rest/arr.length);
            var ar = parseInt(rest%arr.length);
            var space ="";
            for(var v=0;v<va;v++){
                space+=" ";
            }
            
            for(var qq=2;qq<arr.length;qq++){
                arr[qq]= space + arr[qq];
            }
            for(var qq=2;qq<ar;qq++){
                arr[qq]= " " + arr[qq];
            }
            
            for(var v =0;v<arr.length;v++){
                wholeText+=arr[v]; 
            }
            
        }
        ziz.body = wholeText;
    }
    ziz.modifyText =  function(){
        ziz.newLineIndexes.push(0);
        
        ziz.lineCount   = 1;
        ziz.letterCount = 0;
        var inc=0;
        var sizeInLine =0;
        for (var i = 0; i < ziz.body.length; i++) {
            sizeInLine++;
            if (inc >= 50) {
                if(ziz.body.charAt(i) === " " || ziz.body.charAt(i) === "."){
                    ziz.newLineIndexes.push(i);
                    ziz.body = insertChar(this.body,i,"\n");
                    ziz.lineCount++;
                    if(ziz.maxWidth<inc){
                        ziz.maxWidth = inc;
                        sizeInLine = 0;    
                    }
                }else{
                    while(ziz.body.charAt(i)!== " " || ziz.body.charAt(i) === "."){
                          i--;
                          sizeInLine--;
                    }
                    ziz.newLineIndexes.push(i);
                    ziz.body = insertChar(this.body,i,"\n");
                    ziz.lineCount++;
                    if(ziz.maxWidth<inc){
                        ziz.maxWidth = inc;
                        sizeInLine = 0;    
                    }
                }
                inc=0;
             }
             inc++;
        }
    }
    ziz.setText = function(txt){
        ziz.body = txt;
        ziz.modifyText();
        ziz.setContainer(); 
        ziz.setTitleAndText();
    }
    ziz.setContainer = function(){
        if(ziz.container!=undefined){
            ziz.container.destroy();
        }
        ziz.container = game.add.graphics(0, 0);
        ziz.container.lineStyle(2, 0x000000, 1);
        ziz.container.drawRect(px-20, py-25, 40+ 6*ziz.maxWidth, 50+ 15*ziz.lineCount);
    }
    
    ziz.modifyText();
    ziz.beutifyText();
    ziz.setContainer(); 
    ziz.setTitleAndText();
    
}


//================= ON OFF ======================= 

controller.onOff = function(x,y,d){
    var self = this;
    self.wid = x;
    self.len = y;

    self.on;
    self.off;
    self.state;
    
    self.isDefault = function(opt){
        if(opt === true){
            this.on.visible = true;
            this.on.visible = true;
            this.off.visible =false;
            this.state = true;

        }else{
            this.on.visible = false;
            this.off.visible = true;
            this.state = false;

        }
    }
    self.create = function(opt){
        this.on = game.add.button(this.wid,this.len,'askua_on',this.switch);
        this.off = game.add.button(this.wid,this.len,'askua_off',this.switch);
        
        if(opt != undefined){
            this.isDefault(opt);
        }else{
            this.isDefault(false);
        }
    }
    self.switch = function(){
        if (self.off.visible) {
            self.on.visible = true;
            self.off.visible =false;
            self.state = true;
        }else{
            self.off.visible =true;
            self.on.visible = false;
            self.state = false;
        }
    }
   
    self.result = function(){
        return self.state;
    }
    self.destroy = function(){
        self.on.destroy();
        self.off.destroy();
    }
    self.create(d);
}

//================= SLIDER ======================= 

controller.slider = function(x,y,dval){
    var self = this;
    self.x = x;
    self.y = y;
    self.cx = x;
    self.defaultVal = dval;
    
    self.df = function(){
        this.cx = Math.floor(((this.defaultVal*125)/100)+this.x);
    }
    self.create = function(){
        self.row = game.add.sprite(this.x,this.y,'row');

        var colX = this.x+this.row.width/2;
        var colY = this.y-this.row.height/2
        self.df();

        self.col = game.add.sprite(this.cx,colY,'col');
        game.physics.enable(this.col, Phaser.Physics.ARCADE);
        self.col.body.velocity.y = 0;
        self.col.inputEnabled = true;
        self.col.input.enableDrag();

        self.bounds = new Phaser.Rectangle(this.x, colY, self.row.width,this.col.height);
        self.col.input.boundsSprite = this.bounds;
        self.text = game.add.text(this.x,this.y-30,"",{font:"24px Arial"});
    }
    self.result = function(){
        return  Math.floor(((this.col.x - this.x)/125) * 100);
    }
    self.destroy = function(){
        self.col.kill();
        self.row.kill();
    }
    self.create();
}







