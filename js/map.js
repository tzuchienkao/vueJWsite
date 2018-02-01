(function(window){

	var data = {
		active : '', 
		mapMain : [], 
		mapSub: [], 
		mapList : [], 
		opt : '地區選擇', 
		opt2 : '地區選擇' //下拉預設值
	}
	var vm = new Vue({
		el : '.dropdown', 
		data : data, 
		// computed : {
	 //        subOpt : function(){
  //       		return this.mapSub = this.mapList[this.active].subArea;
	 //        }
		// }, 
	  	methods : {
			selectLi: function(item, index) { //第一層選單被點擊
				this.active = index; //第一層是誰被點了
				this.opt2 = '地區選擇'; //第二層選單預設值
				this.mapSub = this.mapList[this.active].subArea;  //第二層選單
				return this.opt = item; //第一層被點擊的文字
	        },
	        subSelect : function(item) { //第二層選單被點擊
	        	if(!item){ //如果沒傳值第二層選單就回到預設
	        		this.opt2 = '地區選擇';
	        	}
				return this.opt2 = item; //第二層被點擊的文字
			}
	  	}, 
	  	created : function(){ //網頁載完的時候要執行
	  		$.ajax({
	  			url : './data/mapData.json', 
	  			dataType : 'json', 
	  			data: data, 
	  			success : (res) => {
	  				this.mapList = res.mapList;
	  				this.mapList.forEach((key) => {
	  					data.mapMain.push(key.mainArea);
	  				});
	  			}, 
	  			error : (err) => {
	  				console.log('ERROR');
	  			}
	  		});
	  	}
	});
})(window)