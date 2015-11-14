$(function() {
	/*最初の画面の背景の取得*/
	var today =new Date();//今日の日付、曜日の入手
	var weeks = new Array("Sun.","Mon.","Tue.","Wed.","Thu.","Fri.","Sat.");//曜日の配列の生成
	var TodayWeek =weeks[today.getDay()];

	// var nextSaturday=new Date();
	// var nextSunday=new Date();
	// var RenextSaturday=new Date();


	$("<div>").addClass('index').append('Gyozy').appendTo("#homesubTitle");
	$("<div>").attr('id', 'today').append((today.getMonth()+1)+'/'+today.getDate()+" "+TodayWeek).appendTo("#homesubTitle");
	if(sessionStorage.length==0)
	{
		$.ajax({
			url: 'http://www.kanazawa-arts.or.jp/event-all.json',	// APIのURL（jsonファイルの場所）
			type: "GET",										// HTTP Requestの種類
			success: function(res) {							// Ajax通信に成功した時に呼ばれるメソッド
			  	var xml = $.parseXML(res.responseText);			// responseTextプロパティにはXML形式のテキストが入っているので、パースする
			  	var $xml = $(xml);								// $(なにか) で、なにかをjQueryオブジェクトに変換する
				console.log(xml);
			  	var $p = $xml.find('body');						// pタグを取得する
			  	var text = $p.text();							// <p>ここにある文章を取得する</p>
			  	//console.log(p);
			  	//console.log(text);
			  	var json = $.parseJSON(text);					// JSON形式のテキストをパースする
			  	console.log(json);

				var jstr = JSON.stringify(json); //　json.itemsを保存->json.itemsを含む、json全体を保存。
				sessionStorage.setItem( "jsons" , jstr ); //JSON文字列をセッションストレージに書き込む
			}
		});
	}

});
$('div.items').imagefit({
		    mode: 'outside',
		    force : 'true',
		    halign : 'center',
		    valign : 'middle'
});
