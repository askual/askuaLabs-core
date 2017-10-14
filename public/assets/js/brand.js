if(!brand){
    var brand = {};
}else if (typeof brand != 'object') {
    throw Error('Error with the namespace')
}

brand.simulationTitle;
brand.setTitle= function(sText){
    brand.simulationTitle = sText;
    //console.log(game.width);
}

brand.position= {
    'height'        : 50,
    'logo_x'        : 0,
    'logo_y'        : 0,
    'title_x'       : 250,
    'title_y'       : 10,
    'close_x'       : game.width - 50,
    'close_y'       : 0,
    'minimize_x'    : game.width - 100,
    'minimize_y'    : 0,
    'goTo_x'        : game.width - 400,
    'goTo_y'        : 0
}

brand.preload = function(){
    game.load.image('logo',     '../../assets/img/brand/logo.png');
    game.load.image('close',    '../../assets/img/brand/close.png');
    game.load.image('minimize', '../../assets/img/brand/minimize.png');
    game.load.image('headerBg', '../../assets/img/brand/headerBg.png');
    game.load.image('goToSim',  '../../assets/img/brand/goToSim.png');
    game.load.image('goToChall',  '../../assets/img/brand/goToChall.png');
}

brand.create = function(){
    var hbg = game.add.sprite(0,0,'headerBg');
    sharpSprite(hbg,game.width,brand.position['height']);

    game.add.button(brand.position['logo_x'],brand.position['logo_y'],'logo',function(){
        window.location.href = "../../index.html";
    });
    game.add.button(brand.position['close_x'],brand.position['close_y'],'close',brand.closeWindow());
    game.add.button(brand.position['minimize_x'],brand.position['minimize_y'],'minimize',brand.minimizeWindow());
    game.add.text(brand.position['title_x'],brand.position['title_y'], brand.simulationTitle, { fontSize: '32px', fill: '#000' });
}



brand.minimizeWindow = function(){    
    console.log("?");
}
brand.closeWindow = function(){
    console.log("?");
}

brand.Button = function(x){
    if(x=="simulation"){
        var b = game.add.button(brand.position['goTo_x'],brand.position['goTo_y'],'goToSim',function(){
           // superThis.state.start('sim');
        });
        b.defaultCursor = "hand";
    }else if(x=="challenge"){
        var b = game.add.button(brand.position['goTo_x'],brand.position['goTo_y'],'goToChall',function(){
           // superThis.state.start('challenge');
        });
        b.defaultCursor = "hand";
    }
}
/*
brand.Button = function(x){
    if(x=="simulation"){
        var b = game.add.button(brand.position['goTo_x'],brand.position['goTo_y'],'goToSim',function(){
            superThis.state.start('simulation');
        });
        b.defaultCursor = "hand";
    }else if(x=="challenge"){
        var b = game.add.button(brand.position['goTo_x'],brand.position['goTo_y'],'goToChall',function(){
            superThis.state.start('challenge');
        });
        b.defaultCursor = "hand";
    }
}
*/









