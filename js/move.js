function startMove(obj,json,fun){
	clearInterval(obj.timer);
	obj.timer= setInterval(function(){
		var bStop =true;
		for(var attr in json){
			var iCur=null;
			//attr获取值
			if(attr=='opacity'){
				iCur=Math.round(parseFloat(getStyle(obj,attr)*100));
			}else{
				iCur=parseInt(getStyle(obj,attr));
			}
			//计算速度
			var iSpeed= (json[attr] - iCur)/8;
			iSpeed =iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			//未全部完成运动
			if(iCur!= json[attr]){
				bStop= false;
			}
			
			if(attr=='opacity'){
				obj.style.opacity=(iSpeed+iCur)/100;
				obj.style.filter='alpha(opacity:'+(iSpeed+iCur)+')';
			}else{
				obj.style[attr] = iCur + iSpeed +'px';
			}	
		}
		//全部运动完成
		if(bStop){
			clearInterval(obj.timer);
			if(fun){
				fun();
			}	
		}
	},40);
}

//获取属性方法
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}	   