// ダイアログの設定
var dialog = new Window("dialog","一括リネーム");
dialog.center();
dialog.alignChildren = "fill";

dialog.add ("statictext", undefined, "変更対象");
var radioTarget = dialog.add("group");
var radioArtboard = radioTarget.add("radiobutton", undefined, "アートボード");
var radioLayer = radioTarget.add("radiobutton", undefined, "レイヤー");
radioArtboard.value = true;

dialog.add ("statictext", undefined, "番号タイプ");
var radioType = dialog.add("group");
var radioPadding = radioType.add("radiobutton", undefined, "ゼロ埋め(例:01)");
var radioRaw = radioType.add("radiobutton", undefined, "そのまま(例:1)");
radioPadding.value = true;

dialog.add ("statictext", undefined, "プレフィックス");
var prefix = dialog.add ("edittext", undefined, "");

var button = dialog.add("group");
button.alignment = "left";
var cancel = button.add("button", undefined, "キャンセル");
var rename = button.add("button", undefined, "リネーム");


cancel.onClick = function(){
    dialog.close();
    return;
}

rename.onClick = function(){
    if(radioArtboard.value){
        var artboards = app.activeDocument.artboards;
        if(radioPadding.value){
            var digits = String(artboards.length).length * -1;
            for(var i = 0; i < artboards.length; i++){
                artboards[i].name = prefix.text + ("000" + String(i + 1)).slice(digits);
            }
        }else if(radioRaw.value){
            for(var i = 0; i < artboards.length; i++){
                artboards[i].name = prefix.text + String(i + 1);
            }
        }else{
            alert("選択が不正です");
            return;
        }

    }else if(radioLayer.value){
        var layers = app.activeDocument.layers;
        if(radioPadding.value){
            var digits = String(layers.length).length * -1;
            for(var i = 0; i < layers.length; i++){
                layers[i].name = prefix.text + ("000" + String(layers.length - i)).slice(digits);
            }
        }else if(radioRaw.value){
            var layers = app.activeDocument.layers;
            for(var i = 0; i < layers.length; i++){
                layers[i].name = prefix.text + String(layers.length - i);
            }
        }else{
            alert("選択が不正です");
            return;
        }
    }else{
        alert("選択が不正です");
        return;
    }
    alert("完了");
    dialog.close();
    return;
}

dialog.show();
