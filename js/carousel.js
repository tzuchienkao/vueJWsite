(function(window){

	var timer, interval = 2000;

	var data = {
		active : 0, 
		imgList : []
	}

	var bnComponent =  {
		props: ['active', 'list'], 
		template : `
		<!--
			<transition-group class="kv_img clearfix" tag="ul">
            	<li v-for="(item, index) in list" @click="nextImg" :key="item">
	            	<a :href="item.link">
	                	<img :src="item.src" v-show="active == index" alt="">
	               	</a>
            	</li>
            </transition-group>
        -->
        	<ul class="kv_img clearfix">
            	<li v-for="(item, index) in list" @click="nextImg">
	            	<a :href="item.link">
	                	<img :src="item.src" v-show="active == index" alt="">
	               	</a>
            	</li>
            </ul>
		`, 
		methods : {
			nextImg : function(){
				this.$emit('next');
			}
		}
	};
	var dotsComponent =  {
		props: ['active', 'total'], 
		template : `
            <div class="dots clearfix">
				<a href="javascript:void(0)" :class="{selected:active == index-1}" v-for="index in total" @click="clickEvent(index - 1)"></a>
            </div>
		`, 
		methods : {
			clickEvent : function(index){
				this.$emit('change', index);
			}
		}
	};
	var vm = new Vue({
		el : '.keyVisual', 
		data : data, 
	    components : {
	      keyVisual : bnComponent, 
	      keyActive : dotsComponent
	  	}, 
	  	methods : {
	  		nextImg : function(){
	  			this.active = (this.active + 1) % (this.imgList.length);
	  		}, 
	  		changeImg : function(index){
	  			this.active = index;
	  		}, 
	  		setTimer : function(){
	  			this.clearTimer();
	  			timer = setInterval(this.nextImg, interval);
	  		}, 
	  		clearTimer : function(){
	  			clearInterval(timer);
	  		}
	  	}, 
	  	created : function(){ //網頁載完的時候要執行
	  		this.setTimer();
	  		$.ajax({
	  			url : './data/imgData.json', 
	  			dataType : 'json', 
	  			data: data, 
	  			success : (res) => {
	  				this.imgList = res.imgList.slice(0,3);
	  			}, 
	  			error : (err) => {
	  				console.log('ERROR');
	  			}
	  		});
	  	}
	});
})(window)