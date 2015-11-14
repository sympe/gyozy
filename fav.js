$(function(){
	var json = JSON.parse( sessionStorage.getItem("jsons") );
	var today =new Date();//今日の日付、曜日の入手
	var weeks = new Array("日","月","火","水","木","金","土");//曜日の配列の生成
	var TodayWeek =weeks[today.getDay()];
	$("<div>").attr('id','subTitle').appendTo("#contents");
	$("<div>").addClass('index').append('お気に入り').appendTo("#subTitle").css('font-size', '170%');
	if(localStorage.length<=0){
		$("<div>").addClass('index').append('お気に入り登録なし').appendTo("body").css('font-size', '140%').css('text-align','center');
	}
	for(var i=0; i<localStorage.length; i++){
		var key=localStorage.key(i);
		items=JSON.parse(localStorage.getItem(key)); //ローカルストレージから値を取り出す
		var count=0;
		var flag=false;
		for(j=0; j<json.items.length; j++){         //既に終わったイベントの配慮
			if(items.title==json.items[j].title){
				flag=true;
				break;
			}
			count++;
			if(count==json.items.length){
				localStorage.removeItem(items.title,JSON.stringify(items));
			}
		}
		if(flag){
			var Theday = [];
		  	var date=[];
		  	var ThedayWeek=[];
  			Theday.push(items.dates[(items.dates.length)-1].split("-"));
  			date.push(new Date(Theday[0][0],Theday[0][1]-1,Theday[0][2]));
  			ThedayWeek.push(weeks[date[0].getDay()]);
		  	count=0;
			var DiffDay=Math.round((date[0]-today)/86400000);
  			if(count==0){
		  		$("<a>").attr('href','favdetail.html?id='+i).append(
		  		$("<div>").addClass('listitems').attr('id','items'+i)).appendTo("#contents");
				if(items.images.length==0){ //画像が無い場合の処理
					if(items.group=="金沢能楽美術館"){
						$("<img>").attr('src','nogaku.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
					}
					else if(items.group=="金沢湯涌創作の森"){
						$("<img>").attr('src','yuwaku.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
					}
					else if(items.group=="金沢卯辰山工芸工房"){
						$("<img>").attr('src','utatsu.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
					}
					else if(items.group=="金沢市民芸術村"){
						$("<img>").attr('src','simin.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
					}
					else if(items.group=="金沢市アートホール"){
						$("<img>").attr('src','art.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
					}
					else if(items.group=="金沢市文化ホール"){
						$("<img>").attr('src','bunka.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
					}
					else if(items.group=="金沢歌劇座"){
						$("<img>").attr('src','kageki.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
					}
					else if(items.group=="金沢芸術創造財団"){
						$("<img>").attr('src','simin.jpg').attr('id',i).addClass('listimages').appendTo("#items"+i);
					}
				}
				else{
	  				$("<img>").attr('src',json.base_url+items.images[0]).attr('id',i).addClass('listimages').appendTo("#items"+i);
		  		}
		  		var str=items.title;
		  		str = str.replace(/　/g, " ");	// 全角スペースを半角スペースに変換
				str = str.replace(/ +/g, " ");	// ２つ以上のスペースを一つにする
		  		$("<div>").append(str).addClass('titles').appendTo("#items"+i);
		  		id=0;
				// for (var k = 0; k < json.items.length; k++) {
				// 	if(json.items[k].title==items.title){
				// 		break;
				// 	}
				// 	id++;
				// };
		  		$("<div>").appendTo("#items"+i).addClass('favobutton').attr('id', 'fav'+i);
				$("<img>").appendTo('#fav'+i).attr('src', 'favstar.png').attr('id', 'favstar'+i).addClass('favstar');
		  		$("#favstar"+i).attr('src','favstar.png');//もしお気に入りに登録されていたら背景を黄色に、クラスをactiveにする
		  	}
	  		if(ThedayWeek[0]=="土"){					  		
	  			$("<div>").appendTo("#items"+i).append(parseInt(Theday[0][1])+"月"+parseInt(Theday[0][2])+"日"+"("+ThedayWeek[0]+")")
	  			.addClass('days').css('background-color', '#3324FF');
	  		}
	  		else if(ThedayWeek[0]=="日"){					  		
	  			$("<div>").appendTo("#items"+i).append(parseInt(Theday[0][1])+"月"+parseInt(Theday[0][2])+"日"+"("+ThedayWeek[0]+")")
	  			.addClass('days').css('background-color', 'red');
	  		}
	  		else{
	  			$("<div>").appendTo("#items"+i).append(parseInt(Theday[0][1])+"月"+parseInt(Theday[0][2])+"日"+"("+ThedayWeek[0]+")")
	  			.addClass('days');
	  		}
	  		count++;
	  	}
	}
});
// function clickFunc(i){
// 	var json = JSON.parse( sessionStorage.getItem("jsons") );
// 	var switch_flg = $("#fav"+i.data).hasClass("active");
// 	var key=localStorage.key(i.data);		
// 	if (switch_flg) {
// 		$("#fav"+i.data).css('background-color', 'white');
// 		$(this).removeClass("active");
// 		//if(json.items[i.data].title!=null){
// 			//データの削除
// 			localStorage.removeItem(key);
// 	 	//}
// 	}else{
// 		$("#fav"+i.data).css('background-color', 'yellow');
// 		$(this).addClass("active");
// 		//if(json.items[i.data].title!=null){
// 			//データの保存
// 			localStorage.setItem(key);
// 	 	//}
// 	}
// 	return false;
// }