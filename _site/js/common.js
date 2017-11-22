	jQuery.fn.limit=function(){  
	    var self = $("[limit]");  
	    self.each(function(){  
	        var objString = $(this).text();  
	        var objLength = $(this).text().length;  
	        var num = $(this).attr("limit");  
	        if(objLength > num){  
	            $(this).attr("title",objString);  
	            objString = $(this).text(objString.substring(0,num) + "...");  
	        }  
	    })  
	}  

var common = {
	getRootPath : function() {
		return $(".basePath").val();
	},
	
	getPageSum : function(pageSize, pageTotal){
 		var pageSum = parseInt(pageTotal / pageSize);
 		pageSum = pageTotal % pageSize == 0 ? pageSum : pageSum + 1;
 		return pageSum;
 	},
	
	isEmpty : function(obj) {
  		var check = false;
  		// 去除空格
  		// obj = obj.replace(/\s/g, "");
  		// 判断值是否为空
  		if(!obj || obj == "" || obj == "undefined" || obj == "NaN"){
  			return true;
  		}
  		return check;
  	},

	getDateDiff : function(dateStr) {
		var dateTimeStamp = Date.parse(dateStr.replace(/-/gi, "/"));
		var minute = 1000 * 60;
		var hour = minute * 60;
		var day = hour * 24;
		var halfamonth = day * 15;
		var month = day * 30;
		var now = new Date().getTime();
		var diffValue = now - dateTimeStamp;
		if (diffValue < 0) {
			return;
		}
		var monthC = diffValue / month;
		var weekC = diffValue / (7 * day);
		var dayC = diffValue / day;
		var hourC = diffValue / hour;
		var minC = diffValue / minute;
		if (monthC >= 1) {
			result = "" + parseInt(monthC) + "月前";
		} else if (weekC >= 1) {
			result = "" + parseInt(weekC) + "周前";
		} else if (dayC >= 1) {
			result = "" + parseInt(dayC) + "天前";
		} else if (hourC >= 1) {
			result = "" + parseInt(hourC) + "小时前";
		} else if (minC >= 1) {
			result = "" + parseInt(minC) + "分钟前";
		} else
			result = "刚刚";
		return result;
	},
	
	 /**
	  * ----------------------------------------
	  * @模块描述 使用渲染时时间格式化
	  * @作者 shurenwei
	  * @备注 当前方法调用在渲染中使用
	  * ----------------------------------------
	  */
	 timeFormat : function(){
		   $.views.converters("timeFormat", function(val){
			   return common.getDateDiff(val);
		   });
	 },
	 
	 /**
	  * ----------------------------------------
	  * @模块描述 产品类型渲染时使用 产品类型，1：明星项目，2：热门项目，3：普通项目
	  * @作者 shurenwei
	  * @备注 当前方法调用在渲染中使用
	  * ----------------------------------------
	  */
	 productTypeFormat : function(){
		   $.views.converters("productTypeFormat", function(val){
			   if(common.isEmpty(val)){
				   return "";
			   }
			   switch (val) {
				case 1:
					return "明星项目";
				case 2:
					return "热门项目";
				case 3:
					return "普通项目";
				default:
					return "";
				}
		   });
	 },
	 /**
	  * ----------------------------------------
	  * @模块描述 产品状态渲染时使用 筹资状态，1：即将开始，2：筹资中。3：完成，4：流标
	  * @作者 shurenwei
	  * @备注 当前方法调用在渲染中使用
	  * ----------------------------------------
	  */
	 productStatusFormat : function(){
		   $.views.converters("productStatusFormat", function(val){
			   if(common.isEmpty(val)){
				   return "";
			   }
			   switch (val) {
				case 1:
					return "即将开始";
				case 2:
					return "筹资中";
				case 3:
					return "完成";
				case 4:
					return "流标";
				default:
					return "";
				}
		   });
	 },
	 toDecimal : function(val,num){
		 	var f = parseFloat(val); 
	    	if (isNaN(f)) { 
	    		f = 0;
	    	} 
	    	if (isNaN(num)) { 
	    		num = 0;
	    	} 
	    	return Number(f).toFixed(num);
	 },
	 decimalFormat4 : function() { 
		 $.views.converters("decimalFormat4", function(val){
			 return common.toDecimal(val, 4);
		 });
	 },
	 decimalFormat2 : function() { 
		 $.views.converters("decimalFormat2", function(val){
			 return common.toDecimal(val, 2);
		 });
	 },
	 decimalFormat0 : function() { 
		 $.views.converters("decimalFormat0", function(val){
			 return common.toDecimal(val, 0);
		 });
	 },
}
