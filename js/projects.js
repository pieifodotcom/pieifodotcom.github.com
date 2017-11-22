$(function(){
	var hash = getPath();
	if(hash=="0"){
		$("#all_p").attr("class","active");
	}
	if(hash=="2"){
		$("#ing_p").attr("class","active");
	}
	if(hash=="1"){
		$("#fut_p").attr("class","active");
	}
	if(hash=="3"){
		$("#fis_p").attr("class","active");
	}
	$("#all_p").click(function(){
		location.href = $(".basePath").val()+"/product/list/0";
	})
	$("#ing_p").click(function(){
		location.href = $(".basePath").val()+"/product/list/2";
	})
	$("#fut_p").click(function(){
		location.href = $(".basePath").val()+"/product/list/1";
	})
	$("#fis_p").click(function(){
		location.href = $(".basePath").val()+"/product/list/3";
	})
	
	var paramPageNo = $("#paramPageNo").val();
	productList.loadProductPage(paramPageNo);
	/*setInterval(function(){
		initProductData();
	}, 3000)*/
})

var productList = {
	loadProductList : function(current){
		var path = "/product/list";
		var pageNo = current;
		var pageSize = 6;
		var financingStatus = getPath();
		window.location.href = common.getRootPath()+path+"/"+financingStatus+"?pageNo="+pageNo+"&pageSize="+pageSize;
	},
	loadProductPage : function(current){
		var paramTotal = $("#paramTotal").val();
		var pageSum = productList.getPageSum(6, paramTotal);
		page.pageInfo(current,pageSum,productList.loadProductList,"productListPage");
	},
	getPageSum : function(pageSize, pageTotal){
		var pageSum = parseInt(pageTotal / pageSize);
		pageSum = pageTotal % pageSize == 0 ? pageSum : pageSum + 1;
		return pageSum;
	}
}

function getPath(){
    var url=location.pathname;
    var end=url.lastIndexOf("/");
    var path = url.substr(end+1,url.length);
    return path;
} 

function initProductData(){
	$.ajax({
        url:common.getRootPath()+"/product/initProductData/0",
        type:'get',
        dataType: "json",
        success: function(obj){
        	if(obj.length>0){
        		for(var i=0;i<obj.length;i++){
            		var supporter = obj[i].supporter;
                	var progress = obj[i].progress;
                	var financedAmount = obj[i].financedAmount;
                	var productId = obj[i].productId;
                	
                	$("#supporter"+productId).html(supporter+"人<br /><span>支持者</span>");
                	$("#progressjd"+productId).attr({"style":"width:"+(progress*100).toFixed(4)+"%"});
                	$("#progressst"+productId).html((progress*100).toFixed(2)+"%");
            	}
        	}
        },
        error: function(){
        }
	});
}
