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
	var args = $.getParameter();
	var id =args.id;
	var json = JSON.parse( sessionStorage.getItem("jsons") );
	var today =new Date();//今日の日付、曜日の入手
	var weeks = new Array("日","月","火","水","木","金","土");//曜日の配列の生成
	var TodayWeek =weeks[today.getDay()];
	var key=[]
	for(var i=0; i<localStorage.length; i++){
		key.push(localStorage.key(i)); //配列keyにローカルストレージのkeyを格納		
	}
	// var nextSaturday=new Date();
	// var nextSunday=new Date();
	// var RenextSaturday=new Date();
	// nextSaturday=JSON.parse(localStorage.getItem("nsat"));
	// nextSunday=JSON.parse(localStorage.getItem("nsun"));
	// RenextSaturday=JSON.parse(localStorage.getItem("rensat"));
	// nextSaturday=new Date(nextSaturday);
	// nextSunday=new Date(nextSunday);
	// RenextSaturday=new Date(RenextSaturday);
	//console.log(RenextSaturday);
	console.log(key);
	$("<div>").attr('id','subTitle').appendTo("#contents");
	if(id==0){
		$("<div>").addClass('index').append('今週末のイベント').appendTo("#subTitle").css('font-size', '170%');
	}
	else if(id==1){
		$("<div>").addClass('index').append('来週末のイベント').appendTo("#subTitle").css('font-size', '170%');
	}
	else if(id==2){
		$("<div>").addClass('index').append('再来週以降のイベント').appendTo("#subTitle").css('font-size', '170%');
	}
	else if(id==3){
		$("<div>").addClass('index').append('平日のイベント').appendTo("#subTitle").css('font-size', '170%');
	}
	for (var i = 0; i <= (json.items.length)-1; i++) {
	  	if(json.items[i].dates.length!=0){
	  		var Theday = [];
	  		var date=[];
	  		var ThedayWeek=[];

	  		for(var j=0; j<=(json.items[i].dates.length)-1;j++){	//両日開催イベントの配慮
	  			Theday.push(json.items[i].dates[j].split("-"));
	  			date.push(new Date(Theday[j][0],Theday[j][1]-1,Theday[j][2]));
	  			ThedayWeek.push(weeks[date[j].getDay()]);
	  		}

	  		var count=0;

	  			if(TodayWeek=="土" || TodayWeek=="日"){	//アプリ閲覧日が土日
		  			for(var j=0; j<=(ThedayWeek.length)-1; j++){
		  				var DiffDay=Math.round((date[j]-today)/86400000);
			  			if(((ThedayWeek[j]=="土" || ThedayWeek[j]=="日") && DiffDay>=-1 && DiffDay<=1 && id==0)//今週末
			  			|| ((ThedayWeek[j]=="土" || ThedayWeek[j]=="日") && DiffDay>=6 && DiffDay<=8 && id==1)//来週末		
			  			|| ((ThedayWeek[j]=="土" || ThedayWeek[j]=="日") && DiffDay>=9 && id==2)				 //それ以降
			  			){ 
			  				if(count==0){
						  		$("<a>").attr('href','detail.html?id='+i).append(
						  		$("<div>").addClass('listitems').attr('id','items'+i)).appendTo("#contents");
	  							if(json.items[i].images.length==0){ //画像が無い場合の処理
	  								if(json.items[i].group=="金沢能楽美術館"){
	  									$("<img>").attr('src','nogaku.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
	  								}
	  								else if(json.items[i].group=="金沢湯涌創作の森"){
	  									$("<img>").attr('src','yuwaku.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
	  								}
	  								else if(json.items[i].group=="金沢卯辰山工芸工房"){
	  									$("<img>").attr('src','utatsu.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
	  								}
	  								else if(json.items[i].group=="金沢市民芸術村"){
	  									$("<img>").attr('src','simin.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
	  								}
	  								else if(json.items[i].group=="金沢市アートホール"){
	  									$("<img>").attr('src','art.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
	  								}
	  								else if(json.items[i].group=="金沢市文化ホール"){
	  									$("<img>").attr('src','bunka.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
	  								}
	  								else if(json.items[i].group=="金沢歌劇座"){
	  									$("<img>").attr('src','kageki.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
	  								}
	  								else if(json.items[i].group=="金沢芸術創造財団"){
	  									$("<img>").attr('src','simin.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
	  								}
	  							}
	  							else{
						  			$("<img>").attr('src',json.base_url+json.items[i].images[0]).attr('id',i).addClass('listimages').appendTo("#items"+i);
						  		}
						  		var str=json.items[i].title;
						  		str = str.replace(/　/g, " ");	// 全角スペースを半角スペースに変換
    							str = str.replace(/ +/g, " ");	// ２つ以上のスペースを一つにする
						  		$("<div>").append(str).addClass('titles').appendTo("#items"+i);
						  		$("<div>").appendTo("#items"+i).addClass('favobutton').attr('id', 'fav'+i).click(i,clickFunc);
					  			$("<img>").appendTo('#fav'+i).attr('src', 'favstargray.png').attr('id', 'favstar'+i).addClass('favstar');
						  		for(var k=0; k<key.length; k++){
						  			if(json.items[i].title==key[k]){
						  				$("#favstar"+i).addClass("active").attr('src','favstar.png');//もしお気に入りに登録されていたら背景を黄色に、クラスをactiveにする
						  			}
						  		}
					  		}
					  		if(ThedayWeek[j]=="土"){					  		
					  			$("<div>").appendTo("#items"+i).append(parseInt(Theday[j][1])+"月"+parseInt(Theday[j][2])+"日"+"("+ThedayWeek[j]+")")
					  			.addClass('days').css('background-color', '#3324FF');
					  		}
					  		else if(ThedayWeek[j]=="日"){					  		
					  			$("<div>").appendTo("#items"+i).append(parseInt(Theday[j][1])+"月"+parseInt(Theday[j][2])+"日"+"("+ThedayWeek[j]+")")
					  			.addClass('days').css('background-color', 'red');
					  		}
					  		else{
					  			$("<div>").appendTo("#items"+i).append(parseInt(Theday[j][1])+"月"+parseInt(Theday[j][2])+"日"+"("+ThedayWeek[j]+")")
					  			.addClass('days');
					  		}
					  		count++;
				  		}
			  		}
	  			}
	  			else{    //アプリ閲覧日が平日
	  				for(var j=0; j<=(ThedayWeek.length)-1; j++){
		  				var DiffDay=Math.round((date[j]-today)/86400000);
			  			if(((ThedayWeek[j]=="土" || ThedayWeek[j]=="日") && DiffDay>=0 && DiffDay<=6 && id==0)//今週末
			  			|| ((ThedayWeek[j]=="土" || ThedayWeek[j]=="日") && DiffDay>=7 && DiffDay<=13 && id==1)//来週末
			  			|| ((ThedayWeek[j]=="土" || ThedayWeek[j]=="日") && DiffDay>=14 && id==2)				//それ以降
			  			){
			  				if(count==0){
			  					$("<a>").attr('href','detail.html?id='+i).append(
			  					$("<div>").addClass('listitems').attr('id','items'+i)).appendTo("#contents");
			  					if(json.items[i].images.length==0){ //画像が無い場合の処理
			  						if(json.items[i].group=="金沢能楽美術館"){
	  									$("<img>").attr('src','nogaku.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
	  								}
	  								else if(json.items[i].group=="金沢湯涌創作の森"){
	  									$("<img>").attr('src','yuwaku.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
	  								}
	  								else if(json.items[i].group=="金沢卯辰山工芸工房"){
	  									$("<img>").attr('src','utatsu.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
	  								}
	  								else if(json.items[i].group=="金沢市民芸術村"){
	  									$("<img>").attr('src','simin.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
	  								}
	  								else if(json.items[i].group=="金沢市アートホール"){
	  									$("<img>").attr('src','art.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
	  								}
	  								else if(json.items[i].group=="金沢市文化ホール"){
	  									$("<img>").attr('src','bunka.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
	  								}
	  								else if(json.items[i].group=="金沢歌劇座"){
	  									$("<img>").attr('src','kageki.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
	  								}
	  								else if(json.items[i].group=="金沢芸術創造財団"){
	  									$("<img>").attr('src','simin.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
	  								}
	  							}
	  							else{
						  			$("<img>").attr('src',json.base_url+json.items[i].images[0]).attr('id',i).addClass('listimages').appendTo("#items"+i);
						  		}
						  		var str=json.items[i].title;
						  		str = str.replace(/　/g, " ");	// 全角スペースを半角スペースに変換
    							str = str.replace(/ +/g, " ");	// ２つ以上のスペースを一つにする
						  		$("<div>").append(str).addClass('titles').appendTo("#items"+i);
						  		$("<div>").appendTo("#items"+i).addClass('favobutton').attr('id', 'fav'+i).click(i,clickFunc);
						  		$("<img>").appendTo('#fav'+i).attr('src', 'favstargray.png').attr('id', 'favstar'+i).addClass('favstar');
						  		for(var k=0; k<key.length; k++){
						  			if(json.items[i].title==key[k]){
						  				$("#favstar"+i).addClass("active").attr('src','favstar.png');//もしお気に入りに登録されていたら背景を黄色に、クラスをactiveにする
						  			}
						  		}
					  		}
							if(ThedayWeek[j]=="土"){					  		
					  			$("<div>").appendTo("#items"+i).append(parseInt(Theday[j][1])+"月"+parseInt(Theday[j][2])+"日"+"("+ThedayWeek[j]+")")
					  			.addClass('days').css('background-color', '#3324FF');
					  		}
					  		else if(ThedayWeek[j]=="日"){					  		
					  			$("<div>").appendTo("#items"+i).append(parseInt(Theday[j][1])+"月"+parseInt(Theday[j][2])+"日"+"("+ThedayWeek[j]+")")
					  			.addClass('days').css('background-color', 'red');
					  		}
					  		else{
					  			$("<div>").appendTo("#items"+i).append(parseInt(Theday[j][1])+"月"+parseInt(Theday[j][2])+"日"+"("+ThedayWeek[j]+")")
					  			.addClass('days');
					  		}
					  		count++;
				  		}
			  		}
	  			}

	  		    if(id==3){					//平日、祝日のイベント
	  			for (var j=0; j <=(ThedayWeek.length)-1; j++) {
  					var DiffDay=Math.round((date[j]-today)/86400000);
					if((ThedayWeek[j]=="月" || ThedayWeek[j]=="火" || ThedayWeek[j]=="水" || ThedayWeek[j]=="木" || ThedayWeek[j]=="金") && DiffDay>=0){
						if(count==0){
					  		$("<a>").attr('href','detail.html?id='+i).append(
					  		$("<div>").addClass('listitems').attr('id','items'+i)).appendTo("#contents");
					  		if(json.items[i].images.length==0){ //画像が無い場合の処理
  								if(json.items[i].group=="金沢能楽美術館"){
  									$("<img>").attr('src','nogaku.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
  								}
  								else if(json.items[i].group=="金沢湯涌創作の森"){
  									$("<img>").attr('src','yuwaku.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
  								}
  								else if(json.items[i].group=="金沢卯辰山工芸工房"){
  									$("<img>").attr('src','utatsu.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
  								}
  								else if(json.items[i].group=="金沢市民芸術村"){
  									$("<img>").attr('src','simin.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
  								}
  								else if(json.items[i].group=="金沢市アートホール"){
  									$("<img>").attr('src','art.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
  								}
  								else if(json.items[i].group=="金沢市文化ホール"){
  									$("<img>").attr('src','bunka.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
  								}
  								else if(json.items[i].group=="金沢歌劇座"){
  									$("<img>").attr('src','kageki.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
  								}
  								else if(json.items[i].group=="金沢芸術創造財団"){
  									$("<img>").attr('src','simin.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
  								}
  							}
  							else{
					  			$("<img>").attr('src',json.base_url+json.items[i].images[0]).attr('id',i).addClass('listimages').appendTo("#items"+i);
					  		}
						  	var str=json.items[i].title;
						  	str = str.replace(/　/g, " ");	// 全角スペースを半角スペースに変換
    						str = str.replace(/ +/g, " ");	// ２つ以上のスペースを一つにする
						  	$("<div>").append(str).addClass('titles').appendTo("#items"+i);
					  		$("<div>").appendTo("#items"+i).addClass('favobutton').attr('id', 'fav'+i).click(i,clickFunc);
					  		$("<img>").appendTo('#fav'+i).attr('src', 'favstargray.png').attr('id', 'favstar'+i).addClass('favstar');
						  	for(var k=0; k<key.length; k++){
					  			if(json.items[i].title==key[k]){
					  				$("#favstar"+i).addClass("active").attr('src','favstar.png'); //もしお気に入りに登録されていたら背景を黄色に、クラスをactiveにする
					  			}
					  		}
				  		}
			  			$("<div>").appendTo("#items"+i).append(parseInt(Theday[j][1])+"月"+parseInt(Theday[j][2])+"日"+"("+ThedayWeek[j]+")")
			  			.addClass('days');
				  		count++;
			  		}
		  		}
	  		}
	  	}
	}
});
function clickFunc(i){
	var json = JSON.parse( sessionStorage.getItem("jsons") );
	var switch_flg = $("#fav"+i.data).hasClass("active");		
	if (switch_flg) {
		$("#favstar"+i.data).attr('src','favstargray.png');;
		$(this).removeClass("active");
		if(json.items[i.data].title!=null){
			//データの削除
			localStorage.removeItem(json.items[i.data].title,JSON.stringify(json.items[i.data]));
	 	}
	}else{
		$("#favstar"+i.data).attr('src','favstar.png');
		$(this).addClass("active");
		if(json.items[i.data].title!=null){
			//データの保存
			localStorage.setItem(json.items[i.data].title,JSON.stringify(json.items[i.data]));
	 	}
	}
	return false;
}