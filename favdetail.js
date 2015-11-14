(function($) {
	$.extend({
		getParameter: function getParameter() {
			/// <summary>
			/// URLのパラメーターを取得
			/// </summary>
			
			var arg  = new Object;
			var pair = location.search.substring(1).split('&');
			for(i=0; pair[i]; i++) {
				var kv = pair[i].split('=');
				arg[kv[0]] = kv[1];
			}
			return arg;
		}
	});
})(jQuery);

$(function(){
	if(sessionStorage.length==0){
		$.ajax({
			url: 'http://www.kanazawa-arts.or.jp/event-all.json',	// APIのURL（jsonファイルの場所）
			type: "GET",										// HTTP Requestの種類
			success: function(res) {							// Ajax通信に成功した時に呼ばれるメソッド
			  	var xml = $.parseXML(res.responseText);			// responseTextプロパティにはXML形式のテキストが入っているので、パースする
			  	var $xml = $(xml);								// $(なにか) で、なにかをjQueryオブジェクトに変換する
			  	var $p = $xml.find('p');						// pタグを取得する
			  	var text = $p.text();							// <p>ここにある文章を取得する</p>
			  	var json = $.parseJSON(text);					// JSON形式のテキストをパースする	
			  	console.log(json);	
			  	var jstr = JSON.stringify(json); //　json.itemsを保存->json.itemsを含む、json全体を保存。
				sessionStorage.setItem( "jsons" , jstr ); //JSON文字列をセッションストレージに書き込む	
			}
		});
	}
	var args = $.getParameter();
	ViewItem(args.id);
});


function ViewItem(id){
	var json = JSON.parse( sessionStorage.getItem("jsons") );
	var weeks = new Array("日","月","火","水","木","金","土");//曜日の配列の生成
	var Theday=[];
	var date=[];
	var ThedayWeek=[];
	var key=localStorage.key(id);
	items=JSON.parse(localStorage.getItem(key)); //ローカルストレージから値を取り出す
	$("<div>").addClass('items').attr('id','item0').appendTo("#detailcontents");
	if(items.images.length==0){ //画像が無い場合の処理
		if(items.group=="金沢能楽美術館"){
			$("<img>").attr('src','nogaku.jpg').attr('id',i).addClass('images').appendTo("#item0").attr('id', 'detailimage');
		}
		else if(items.group=="金沢湯涌創作の森"){
			$("<img>").attr('src','yuwaku.jpg').attr('id',i).addClass('images').appendTo("#item0").attr('id', 'detailimage');
		}
		else if(items.group=="金沢卯辰山工芸工房"){
			$("<img>").attr('src','utatsu.jpg').attr('id',i).addClass('images').appendTo("#item0").attr('id', 'detailimage');
		}
		else if(items.group=="金沢市民芸術村"){
			$("<img>").attr('src','simin.jpg').attr('id',i).addClass('images').appendTo("#item0").attr('id', 'detailimage');
		}
		else if(items.group=="金沢市アートホール"){
			$("<img>").attr('src','art.jpg').attr('id',i).addClass('images').appendTo("#item0").attr('id', 'detailimage');
		}
		else if(items.group=="金沢市文化ホール"){
			$("<img>").attr('src','bunka.jpg').attr('id',i).addClass('images').appendTo("#item0").attr('id', 'detailimage');
		}
		else if(items.group=="金沢歌劇座"){
			$("<img>").attr('src','kageki.jpg').attr('id',i).addClass('images').appendTo("#item0").attr('id', 'detailimage');
		}
		else if(items.group=="金沢芸術創造財団"){
			$("<img>").attr('src','simin.jpg').attr('id',i).addClass('images').appendTo("#item0").attr('id', 'detailimage');
		}
	}
	else{
		$("<img>").appendTo("#item0").attr('src',json.base_url+items.images[0]).addClass('images').attr('id', 'detailimage').attr
		('data-adaptive-background','1');// item0に追加
	}//$("img#detailimage").on("ab-color-found", function(payload){console.log(payload.palette);});
	$("<article>").appendTo("#detailcontents").attr('id', 'tips');
	var str=items.title;
	str = str.replace(/　/g, " ");	// 全角スペースを半角スペースに変換
    str = str.replace(/ +/g, " ");	// ２つ以上のスペースを一つにする
	$("<div>").appendTo("#tips").append(str).attr('id','detailtitles');//detailtitleをitem0に追加
	$("<div>").appendTo("#tips").append("場所："+items.group).attr('id','detaillocates');  //detaillocatesをitem0に追加
	if(items.dates.length==1){ //開催日が一日
		Theday.push(items.dates[0].split("-"));
		date.push(new Date(Theday[0][0],Theday[0][1]-1,Theday[0][2]));
	   	ThedayWeek.push(weeks[date[0].getDay()]);
		$("<div>").appendTo("#tips").append("日時："+parseInt(Theday[0][1])+"月"+parseInt(Theday[0][2])+"日"+"("+ThedayWeek[0]+")").attr('id','detaildays'); 
	}
	else{ //両日開催
		Theday.push(items.dates[0].split("-"));
		date.push(new Date(Theday[0][0],Theday[0][1]-1,Theday[0][2]));
		ThedayWeek.push(weeks[date[0].getDay()]);
		Theday.push(items.dates[(items.dates.length)-1].split("-"));
		date.push(new Date(Theday[1][0],Theday[1][1]-1,Theday[1][2]));
		ThedayWeek.push(weeks[date[1].getDay()]);
		console.log(Theday);
		$("<div>").appendTo("#tips").append("日時："+parseInt(Theday[0][1])+"月"+parseInt(Theday[0][2])+"日"+"("+ThedayWeek[0]+")"
											   +"〜"+parseInt(Theday[1][1])+"月"+parseInt(Theday[1][2])+"日"+"("+ThedayWeek[1]+")").attr('id','detaildays'); 
	}
	$("<div>").appendTo("#tips").append(items.description).attr('id','detailldescription');  //detaillocatesをitem0に追加
	$("<p>").attr("id",'link').appendTo("#tips"); 				//linkをtipsに追加
	$("<a>").attr('href',items.link).append($("<span>").append("詳しい情報")).appendTo("#link"); //spanをlinkに追加
	$("<div>").attr('id', 'pushbtn').appendTo('#detailcontents').append($('<ul>').append('<li id=tweetbutton>').append('<li id=fav>'));
	$("<a>").attr('href','http://twitter.com/share?text='+str+'&url='+location.href)
	.append($("<img>").attr('src','tw.jpg').attr('id', 'twimg')).appendTo("#tweetbutton");   //ツイッターボタンの生成
	id=0;
	for (var i = 0; i < json.items.length; i++) {
		if(json.items[i].title==items.title){
			break;
		}
		id++;
	};
	//$("#fav").append('fav').click(id,clickFunc).addClass("active").css('background-color', 'yellow');　//お気に入りボタンの生成
	$("<div>").appendTo("#fav").addClass('favobutton').attr('id', 'dfav').click(id,clickFunc);
	$("<img>").appendTo('#dfav').attr('src', 'favstar.png').attr('id', 'dfavstar').addClass('favstar').css('height', '35px');	
	$("#dfavstar").addClass("active").attr('src','favstar.png');//もしお気に入りに登録されていたら背景を黄色に、クラスをactiveにする
		
};
function clickFunc(i){ //クリック時の処理
	var json = JSON.parse( sessionStorage.getItem("jsons") );
	var switch_flg = $("#dfavstar").hasClass("active");		
	if (switch_flg) {
		$("#dfavstar").attr('src','favstargray.png');
		$("#dfavstar").removeClass("active");
		if(json.items[i.data].title!=null){
			//データの削除
			localStorage.removeItem(json.items[i.data].title,JSON.stringify(json.items[i.data]));
	 	}
	}else{
		$("#dfavstar").attr('src','favstar.png');
		$("#dfavstar").addClass("active");
		if(json.items[i.data].title!=null){
			//データの保存
			localStorage.setItem(json.items[i.data].title,JSON.stringify(json.items[i.data]));
	 	}
	}
	return false;
}