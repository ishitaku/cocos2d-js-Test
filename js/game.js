
var score;
var life;
var gameLayer;
var scrollSpeed = 1;


var gameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        life = 3;
        score = 0;
        gameLayer = new game();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});

var game = cc.Layer.extend({
    init:function () {
        this._super();
        size = cc.director.getWinSize();
        
        //スクロールする背景スプライトをインスタンス　スクロール速度:scrollSpeed
        background = new ScrollingBG();
        this.addChild(background);

        
        //scheduleUpdate関数は、描画の都度、update関数を呼び出す
        this.scheduleUpdate();
        
        //ボタン
                //ボタンの背景
        var bgButton = new cc.Scale9Sprite(res.button_png);
        var bgHighlightedButton = new cc.Scale9Sprite(res.buttonback_png);
 
        //ボタンのラベル
        var title = new cc.LabelTTF("Button", "Marker Felt", 30);
        title.color = cc.color(159, 168, 176);
 
        //ボタン
        var button = new cc.ControlButton(title, bgButton);
        button.setBackgroundSpriteForState(bgHighlightedButton, cc.CONTROL_STATE_HIGHLIGHTED);
        button.setTitleColorForState(cc.color.WHITE, cc.CONTROL_STATE_HIGHLIGHTED);
        button.setPosition(size.width / 2, size.height / 2);
        button.zoomOnTouchDown = false;
 
        //イベント
        button.addTargetWithActionForControlEvents(this, this.touchDownAction, cc.CONTROL_EVENT_TOUCH_DOWN);
        button.addTargetWithActionForControlEvents(this, this.touchDragInsideAction, cc.CONTROL_EVENT_TOUCH_DRAG_INSIDE);
        button.addTargetWithActionForControlEvents(this, this.touchDragOutsideAction, cc.CONTROL_EVENT_TOUCH_DRAG_OUTSIDE);
        button.addTargetWithActionForControlEvents(this, this.touchDragEnterAction, cc.CONTROL_EVENT_TOUCH_DRAG_ENTER);
        button.addTargetWithActionForControlEvents(this, this.touchDragExitAction, cc.CONTROL_EVENT_TOUCH_DRAG_EXIT);
        button.addTargetWithActionForControlEvents(this, this.touchUpInsideAction, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);
        button.addTargetWithActionForControlEvents(this, this.touchUpOutsideAction, cc.CONTROL_EVENT_TOUCH_UP_OUTSIDE);
        button.addTargetWithActionForControlEvents(this, this.touchCancelAction, cc.CONTROL_EVENT_TOUCH_CANCEL);
 
        this.addChild(button);
 
        return true;
    },
 
    touchDownAction:function (sender, controlEvent) {
        cc.log("touchDownAction");
        
    },
    touchDragInsideAction:function (sender, controlEvent) {
        cc.log("touchDragInsideAction");
    },
    touchDragOutsideAction:function (sender, controlEvent) {
        cc.log("touchDragOutsideAction");
    },
    touchDragEnterAction:function (sender, controlEvent) {
        cc.log("touchDragEnterAction");
    },
    touchDragExitAction:function (sender, controlEvent) {
        cc.log("touchDragExitAction");
    },
    touchUpInsideAction:function (sender, controlEvent) {
        cc.log("touchUpInsideAction");
        location.href = "http://www.pori2.net/js/location/1.html";
    },
    touchUpOutsideAction:function (sender, controlEvent) {
        cc.log("touchUpOutsideAction");
    },
    touchCancelAction:function (sender, controlEvent) {
        cc.log("touchCancelAction");
    },
    
    update:function(dt){
      //background・その他のscrollメソッドを呼び出す
        background.scroll();
    },
});

//スクロール移動する背景クラス
var ScrollingBG = cc.Sprite.extend({
    //ctorはコンストラクタ　クラスがインスタンスされたときに必ず実行される
    ctor:function() {
        this._super();
        this.initWithFile(res.background_png);
    },
    //onEnterメソッドはスプライト描画の際に必ず呼ばれる
    onEnter:function() {
      //背景画像の描画開始位置 横960の画像の中心が、画面の端に設置される
      this.setPosition(size.width,size.height /2 );
      //  this.setPosition(480,160);
    },
    scroll:function(){
      //座標を更新する
        this.setPosition(this.getPosition().x-scrollSpeed,this.getPosition().y);
        //画面の端に到達したら反対側の座標にする
        if(this.getPosition().x<0){
            this.setPosition(this.getPosition().x+320,this.getPosition().y);
        }
    }
});

