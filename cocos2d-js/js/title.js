

var gamestart = cc.Layer.extend({
	ctor: function() {
		this._super();
		var size = cc.director.getWinSize();
		var backgroundLayer = cc.Sprite.create(res.background_png);
		backgroundLayer.setPosition(size.width,size.height /2 );
        	this.addChild(backgroundLayer);
	}
	
});

