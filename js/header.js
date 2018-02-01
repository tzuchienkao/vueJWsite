(function(window){
	var data= {
		active : 0, 
		mainMenu : [
			{cht:'首頁', en:'TOP', link:''}, 
			{cht:'特別企劃', en:'Theme', link:''}, 
			{cht:'旅遊情報', en:'Travel News', link:''}, 
			{cht:'遊記分享', en:'Travel Notes', link:''}, 
			{cht:'雜誌書籍', en:'Magazine.Book', link:''}, 
			{cht:'全區索引', en:'MAP', link:''}
		]
	}



	var navComponent =  {
		props: ['active', 'list'], 
		template : `
            <ul class="nav float_l">
		        <li v-for="(item, index) in list" :class="{select : active == index}">
		            <a :href="item.link"><p>{{ item.cht }}</p>{{ item.en }}</a>
		        </li>
		    </ul>
		`
	};
	var vm = new Vue({
		el : '.navbar', 
		data : data, 
	    components : {
	      navComponent : navComponent
	  	}
	});

})(window)