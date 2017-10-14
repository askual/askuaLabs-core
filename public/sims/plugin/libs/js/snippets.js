// Array Remove - By John Resig
Array.prototype.remove = function(from,to){
    var rest = this.slice(parseInt(to||from)+1||this.length);
    this.length = from  < 0 ? this.length + from : from;
    return this.push.apply(this,rest); 
}

// Sharp Sprite - By kD
var sharpSprite= function(thing,width,height){
	var xx = width/thing.width;
	var yy = height/thing.height;
	thing.scale.setTo(xx, yy);
}
//Insert Char to index - By yD
var insertChar = function(txt,position,chr){
    return txt.slice(0,position)+chr+txt.slice(position,txt.length);
}