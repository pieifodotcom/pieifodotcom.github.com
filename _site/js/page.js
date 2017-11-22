/**
 * layerpage 分页调用的方法
 */
var page = {
	 total  :0,
	 pageInfo : function(current,pageSum,methodName,id){
		 	page.total = pageSum;
			laypage({
			    cont: $('#'+id), //容器。值支持id名、原生dom对象，jquery对象,分页信息展示层的id 详细请见announce.js
			    curr:current,
			    pages: pageSum, //总页数
			    skip: true, //是否开启跳页
			    skin: '#3a7ceb',
			    groups: 3, //连续显示分页数
			    jump:function(res,first){
			    	if(!first){
			    		methodName(res.curr);
			    	}		    	
			    }
			});
		},
		checkVal : function(obj){
			var pageVal = obj.value;
			obj.value = (pageVal.match(/\d+/)||[""])[0];
			if(obj.value > page.total){
				obj.value = page.total;
			}
		}
};

