var defaultLanStr = "cn";
var defaultMenuStr = "menu-all";
var defaultTypeIndex = 0;

var variableLanStr = "cn"
var variableMenuStr = "menu-all"
var variableTypeIndex = 0;

var countdownTime = "0";
var menuAllId = "menu-all";

var scrollTop = "0px";

initProject(defaultLanStr);

function initProject(lan) {
    globalization(lan);
    var width = $(window).width();
    if (width > 450) {
        initDomMenuPc(lan);
    } else {
        initDomMenuMb(lan);
    }
    domContainerOperation(defaultMenuStr, lan, defaultTypeIndex);
    updateCoinInfo(defaultMenuStr, lan, defaultTypeIndex);
}

function globalization(lanCode) {
    var width = $(window).width();
    if (lanCode == "en") {
        $(".ifohref").attr("href", "../pages/enifoservice.html");
        $("#pc-input").attr("placeholder", "Please enter the fork or candy");
        if (width < 450) {
            $(".logo-mb").css("float", "none");
            $(".container").css("marginTop", "113px");
            $(".menu-min").css("marginTop", "42px");
        } else if (width < 768) {
            $(".logo-mb").css("float", "none");
            $(".menu-back").css("marginTop", "113px");
            $(".menu-middle").css("marginTop", "42px");
            $(".middle-search").css("marginTop", "42px");
        }
    } else {
        $(".ifohref").attr("href", "../pages/ifoservice.html");
        $("#pc-input").attr("placeholder", "请输入分叉币或者糖果名称");
        if (width < 450) {
            $(".logo-mb").css("float", "left");
            $(".container").css("marginTop", "71px");
            $(".menu-min").css("marginTop", "0px");
        } else if (width < 768) {
            $(".logo-mb").css("float", "left");
            $(".menu-back").css("marginTop", "71px");
            $(".menu-middle").css("marginTop", "0px");
            $(".middle-search").css("marginTop", "0px");
        }
    }
    jQuery.i18n.properties({
        name: 'strings',
        path: '/i18n/',
        mode: 'map',
        async: true,
        language: lanCode,
        callback: function () {
            $(".summary-mb").html($.i18n.prop('bitpie'));
            $(".summary-pc").html($.i18n.prop('bitpie'));
            $(".ifo-serve").html($.i18n.prop('ifo_service'));

            $(".donate-addr").html($.i18n.prop('donate_addr'));
            $(".powered").html($.i18n.prop('powerred'));
        }
    });
}

$(".lan").bind("click", function () {
    if ($(".lan-according").text() == "比特派比特派") {
        variableLanStr = "en";
        initProject(variableLanStr);
        globalization(variableLanStr);
    } else {
        variableLanStr = "cn";
        initProject(variableLanStr);
        globalization(variableLanStr);
    }
})

$("#pc-input").bind("keypress", function (e) {
    var keyCode = e.keyCode;
    var searchStr = $(this).val();
    if (keyCode == '13') {
        searchResult(searchStr);
        $(this).blur();
        $(this).val("");
        $(".search-btn").hide();
        hiddenPopView();
    }
})

$(".search-btn").bind("click", function () {
    $('.middle-input').val("");
    $(".search-btn").hide();
})

$('.middle-input').bind('input propertychange', function () {
    if ($(this).val().length > 0) {
        $(".search-btn").show();
    } else {
        $(".search-btn").hide();
    }
});

$("#menu-mb").bind("click", function () {
    menuShow();
})

$("#menu-middle").bind("click", function () {
    menuShow();
})

$(window).resize(function () {
    var width = $(window).width();
    if (width > 450) {
        $(".float-back").css("display", "none");
    }
})

function menuShow() {
    var width = $(window).width();
    if (width < 450) {
        if (!$(".menu-middle").hasClass("hidden")) {
            $(".menu-middle").addClass("hidden");
        }

        if (!$(".middle-search").hasClass("hidden")) {
            $(".middle-search").addClass("hidden");
        }

        if ($(".menu-min").hasClass("hidden")) {
            $(".menu-min").removeClass("hidden");
            $(".float-back").css("display", "block");
            scrollTop = document.scrollingElement.scrollTop;
            document.body.style.top = -scrollTop + 'px';
            $("body").addClass("popview-open");
        } else {
            $(".menu-min").addClass("hidden");
            $(".float-back").css("display", "none");
            document.scrollingElement.scrollTop = scrollTop;
            $("body").removeClass("popview-open");
        }
    } else if (width < 768) {
        if (!$(".middle-search").hasClass("hidden")) {
            $(".middle-search").addClass("hidden");
        }

        if ($(".menu-middle").hasClass("hidden")) {
            $(".menu-middle").removeClass("hidden");
        } else {
            $(".menu-middle").addClass("hidden");
        }
    }
}

$("#menu-search-pc").bind("click", function () {
    showSearch();
})

$("#menu-search").bind("click", function () {
    showSearch();
})

function showSearch() {
    if (!$(".menu-middle").hasClass("hidden")) {
        $(".menu-middle").addClass("hidden");
    }
    if (!$(".menu-min").hasClass("hidden")) {
        $(".menu-min").addClass("hidden");
    }
    if ($(".middle-search").hasClass("hidden")) {
        $(".middle-search").removeClass("hidden");
    } else {
        $(".middle-search").addClass("hidden");
    }
}

$(".float-back").bind("click", function () {
    hiddenPopView();
})

function hiddenPopView() {
    document.scrollingElement.scrollTop = scrollTop;
    $("body").removeClass("popview-open");
    if (!$(".menu-middle").hasClass("hidden")) {
        $(".menu-middle").addClass("hidden");
    }
    if (!$(".menu-min").hasClass("hidden")) {
        $(".menu-min").addClass("hidden");
    }
    if (!$(".middle-search").hasClass("hidden")) {
        $(".middle-search").addClass("hidden");
    }
    $(".float-back").css("display", "none");
}

function Coin(obj) {
    this.imgSrc = obj.imgSrc;
    this.coinNameId = obj.coinNameId;
    this.coinName = obj.coinName;
    this.coinSummaryId = obj.coinSummaryId;
    this.coinSummary = obj.coinSummary;
    this.coinForkHId = obj.coinForkHId;
    this.coinForkH = obj.coinForkH;
    this.coinForkHPId = obj.coinForkHPId;
    this.currentHId = obj.currentHId;
    this.countdownId = obj.countdownId;
    this.href = obj.href;
    this.status = obj.status;
    this.sort = obj.sort;
}

function initDomMenuPc(lan) {
    lan = lan || "cn";
    var fileName = lan == "cn" ? "/json/coinMenu-cn.json" : "/json/coinMenu-en.json";
    var forkNameArr = new Array();
    var forkIdArr = new Array();
    $.getJSON(fileName, function (data) {
        $.each(data, function (idx, obj) {
            forkNameArr.push(obj.menuName);
            forkIdArr.push(obj.id);
            if (obj.id == menuAllId) {
                forkTypePc(obj.typeList);
            }
        })
        forkNamePc(forkNameArr, forkIdArr);
    })
}

function initDomMenuMb(lan) {
    lan = lan || "cn";
    var fileName = lan == "cn" ? "/json/coinMenu-cn.json" : "/json/coinMenu-en.json";
    var defaultArr = defaultMinUl();
    $.getJSON(fileName, function (data) {
        $.each(data, function (idx, obj) {
            minLi(defaultArr, obj.menuName, obj.id, obj.typeList)
        })
        $(".menu-min-ul").empty();
        $(".menu-min-ul").append(defaultArr.join(''));

        $(".menu-min-ul>li>ul>li>a").click(function () {
            domContainerOperation(variableMenuStr, variableLanStr, $(this).attr("id").replace(variableMenuStr, ""));
            updateCoinInfo(variableMenuStr, variableLanStr, $(this).attr("id").replace(variableMenuStr, ""));
            hiddenPopView();
        })

        $(".menu-min-ul>li>span").click(function () {
            variableMenuStr = $(this).attr("id");
            $(this).next("ul").toggle().closest("li").siblings("li").children("ul").hide();
        }).next("ul").hide();

        $(".lan").bind("click", function () {
            if ($(".lan-according").text() == "比特派比特派") {
                variableLanStr = "en";
                initProject(variableLanStr);
                globalization(variableLanStr);
                hiddenPopView();
            } else {
                variableLanStr = "cn";
                initProject(variableLanStr);
                globalization(variableLanStr);
                hiddenPopView();
            }
        })

        $("#mb-input").bind("keypress", function (e) {
            var keyCode = e.keyCode;
            var searchStr = $(this).val();
            if (keyCode == '13') {
                searchResult(searchStr);
                $(this).blur();
                $(this).val("");
                hiddenPopView();
            }
        })
    })
}

function defaultMinUl() {
    var innerArr = new Array();
    innerArr.push("<li class=\"menu-min-list\">");
    var inputPH = variableLanStr == "cn" ? "请输入分叉币或者糖果名称" : "Please enter the fork or candy";
    innerArr.push("<form action=\"javascript:void(0)\"><input id=\"mb-input\" type=\"search\" class=\"min-input\" autocorrect=\"off\" placeholder=\"" + inputPH + "\"></form>");
    innerArr.push("</li>");
    var ifoService = variableLanStr == "cn" ? "IFO 服务" : "IFO Service";
    var ifoHref = variableLanStr == "cn" ? "../pages/ifoservice.html" : "../pages/enifoservice.html"
    innerArr.push("<li class=\"menu-min-list\"><a href=" + ifoHref + ">" + ifoService + "</a></li>");
    innerArr.push("<li class=\"menu-min-list\">");
    innerArr.push("<a href=\"javascript:void(0)\" class=\"lan\">中 | EN</a>");
    innerArr.push("</li>");
    return innerArr;
}

function minLi(defaultArr, forkName, menuId, typeList) {
    defaultArr.push("<li class=\"menu-min-list\">");
    defaultArr.push("<span id=\"" + menuId + "\">" + forkName + "</span>");
    defaultArr.push("<ul>");
    $.each(typeList, function (idx, obj) {
        defaultArr.push("<li><a id=\"" + menuId + idx + "\">" + obj + "</a></li>");
    })
    defaultArr.push("</ul>");
    defaultArr.push("</li>");
}

function forkNamePc(forkNameArr, forkIdArr) {
    var innerArr = new Array();
    $.each(forkNameArr, function (idx, obj) {
        innerArr.push("<li><a href=\"javascript:void(0)\" id=\"" + forkIdArr[idx] + "\">" + obj + "</a></li>");
    })

    $(".fork-name ul").empty();
    $(".fork-name ul").append(innerArr.join(''));
    $('#menus').navbarscroll();
    $(".fork-name>ul>li>a").bind("click", function () {
        variableMenuStr = $(this).attr("id")
        updateDomMenuPc(variableLanStr, $(this).attr("id"));
        domContainerOperation($(this).attr("id"), variableLanStr, variableTypeIndex);
        updateCoinInfo($(this).attr("id"), variableLanStr, variableTypeIndex);
    })
}

function updateDomMenuPc(lan, typeStr) {
    lan = lan || "cn";
    var fileName = lan == "cn" ? "/json/coinMenu-cn.json" : "/json/coinMenu-en.json";
    $.getJSON(fileName, function (data) {
        $.each(data, function (idx, obj) {
            if (obj.id == typeStr) {
                forkTypePc(obj.typeList);
            }
        })
    })
}

function forkTypePc(forkTypeArr) {
    var innerArr = new Array();
    $.each(forkTypeArr, function (idx, obj) {
        innerArr.push("<li><a href=\"javascript:void(0)\" id=\"" + variableMenuStr + idx + "\">" + obj + "</a></li>");
    })
    $(".fork-status ul").empty();
    $(".fork-status ul").append(innerArr.join(''));

    $('#status').navbarscroll({"defaultSelect": variableTypeIndex});

    $(".fork-status>ul>li>a").bind("click", function () {
        variableTypeIndex = $(this).attr("id").replace(variableMenuStr, "");
        domContainerOperation(variableMenuStr, variableLanStr, variableTypeIndex);
        updateCoinInfo(variableMenuStr, variableLanStr, variableTypeIndex);
    })
}

function searchResult(searchStr) {
    var fileName = variableLanStr == "cn" ? "/json/coinInfo-cn.json" : "/json/coinInfo-en.json";
    var container = new Array();
    $.getJSON(fileName, function (data) {
        var options = {
            shouldSort: true,
            threshold: 0.3,
            location: 0,
            distance: 40,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
                "coinName",
                "coinSummary",
                "coinForkH",
                "coinNameId"
            ]
        };
        var coinList = new Array();
        $.each(data, function (idx, obj) {
            pushContainerArr(coinList, obj.introduction, 0);
        })
        var fuse = new Fuse(coinList, options);
        var result = fuse.search(searchStr);
        $.each(result, function (idx, obj) {
            var coin = new Coin(obj);
            container.push(coin);
            pushCoinInfoArr("", obj, 0)
        })
        console.log(container);
        appendHtml(container);
    })
}

function domContainerOperation(menuStr, lan, typeStr) {
    menuStr = menuStr || defaultMenuStr;
    typeStr = typeStr || defaultTypeIndex;
    lan = lan || "cn";

    var fileName = lan == "cn" ? "/json/coinInfo-cn.json" : "/json/coinInfo-en.json";
    var container = new Array();
    $.getJSON(fileName, function (data) {
        $.each(data, function (idx, obj) {
            if (menuStr == defaultMenuStr) {
                if (obj.menuName != "candy") {
                    pushContainerArr(container, obj.introduction, typeStr);
                }
            } else {
                if (obj.menuName == menuStr) {
                    pushContainerArr(container, obj.introduction, typeStr);
                }
            }
        })
        var sortArr = sortArray(container);
        appendHtml(sortArr);
    })
}

function pushContainerArr(container, data, typeStr) {
    $.each(data, function (idx, obj) {
        if (typeStr != "0") {
            if (typeStr == obj.status) {
                var coin = new Coin(obj);
                container.push(coin);
            }
        } else {
            var coin = new Coin(obj);
            container.push(coin);
        }
    })
}

function updateCoinInfo(menuStr, lan, typeStr) {
    menuStr = menuStr || defaultMenuStr;
    typeStr = typeStr || defaultTypeIndex;
    lan = lan || "cn";

    var fileName = lan == "cn" ? "/json/coinInfo-cn.json" : "/json/coinInfo-en.json";
    $.getJSON(fileName, function (data) {
        $.each(data, function (idx, obj) {
            if (menuStr == defaultMenuStr) {
                if (obj.menuName != "candy") {
                    pushCoinInfoArr(obj.menuName, obj.introduction, typeStr);
                }
            } else {
                if (obj.menuName == menuStr) {
                    pushCoinInfoArr(obj.menuName, obj.introduction, typeStr);
                }
            }
        })
    })
}

function pushCoinInfoArr(menuName, data, typeStr) {
    menuName = menuName || data.currentHId.replace("Height", "");
    var url;
    var interval
    switch (menuName) {
        case "btc":
            url = "https://bitpie.getcai.com/api/v1/block/height?currentstring=" + new Date().getTime();
            interval = 600;
            break;
        case "bch":
            url = "https://bitpie.getcai.com/api/v1/bcc/block/height?currentstring=" + new Date().getTime();
            interval = 600;
            break;
        case "eth":
            url = "https://bitpie.getcai.com/api/v1/eth/block/height?currentstring=" + new Date().getTime();
            interval = 14.5;
            break;
        case "ltc":
            url = "https://bitpie.getcai.com/api/v1/ltc/block/height?currentstring=" + new Date().getTime();
            interval = 130;
            break;
    }

    $.get(url, {}, function (jsonHeight) {
        var blockhight = jsonHeight.height;
        $("." + menuName + "Height").text(blockhight);
        $.each(data, function (idx, obj) {
            if (typeStr != "0") {
                if (typeStr == obj.status) {
                    var coin = new Coin(obj);
                    calcCountdownTime(coin, interval, blockhight);
                }
            } else {
                var coin = new Coin(obj);
                calcCountdownTime(coin, interval, blockhight);
            }
        })
    })
}

function calcCountdownTime(coin, interval, currentHeight) {
    if (coin.coinForkH == "1514736000") {
        var forkHeight = coin.coinForkH;
        var currentTime = Math.round(new Date().getTime() / 1000);
        var timeDiscrepancy = forkHeight - currentTime;
        calcTimeStamp(timeDiscrepancy, coin.countdownId);
        var promptId = coin.coinForkHPId;
        var prompt = variableLanStr == "cn" ? "分叉时间戳" : "Fork timestamp";
        $("#" + promptId).text(prompt);
    } else {
        var forkHeight = coin.coinForkH;
        var timeDiscrepancy = (forkHeight - currentHeight) * interval * 1000;
        calcTimeStamp(timeDiscrepancy, coin.countdownId);
    }
}

function calcTimeStamp(timeDiscrepancy, countdownId) {
    if (timeDiscrepancy > 0) {
        var days = Math.floor(timeDiscrepancy / (24 * 3600 * 1000))
        var leave1 = timeDiscrepancy % (24 * 3600 * 1000)
        var hours;
        if (days != 0) {
            hours = Math.floor(leave1 / (3600 * 1000));
        } else {
            hours = (leave1 / (3600 * 1000)).toFixed(1);
        }
        if (variableLanStr == "cn") {
            $("#" + countdownId).text(days + "天" + hours + "时");
        } else {
            $("#" + countdownId).text(days + "day" + " " + hours + "hour");
        }
    } else {
        $("#" + countdownId).text("0");
    }
}

function appendHtml(sortArr) {
    var innerArr = new Array();
    $.each(sortArr, function (idx, obj) {
        if (variableLanStr == "cn") {
            blockHP = "分叉高度";
            currentH = "加载中";
            currentHP = "当前块高";
            countdownHP = "倒计时";
            more = "查看详情";
        } else {
            blockHP = "Block height";
            currentH = "Loading";
            currentHP = "Current height";
            countdownHP = "Countdown";
            more = "Learning more";
        }
        innerArr.push("<li class=\"item\">");
        innerArr.push("<div class=\"content\">");
        innerArr.push("<a href=" + obj.href + ">" + "<img class=\"coin-img\" src=\"" + obj.imgSrc + "\"></a>");
        innerArr.push("<div class=\"coin-info\">");
        innerArr.push("<p class=\"coin-title\" id=\"" + obj.coinNameId + "\">" + obj.coinName + "</p>");
        innerArr.push("<p class=\"coin-summary\" id=\"" + obj.coinSummaryId + "\">" + obj.coinSummary + "</p>");
        if (obj.currentHId != "candyHeight") {
            innerArr.push("<div class=\"coin\">");
        } else {
            innerArr.push("<div class=\"coin\" style='display: none'>");
        }
        innerArr.push("<div class=\"coin-height\">");
        innerArr.push("<span class=\"data\" id=\"" + obj.coinForkHId + "\">" + obj.coinForkH + "</span>");
        innerArr.push("<span class=\"prompt\" id=\"" + obj.coinForkHPId + "\">" + blockHP + "</span>");
        innerArr.push("</div>");
        innerArr.push("<div class=\"current-height\">");
        innerArr.push("<span class=\"" + "data " + obj.currentHId + "\">" + currentH + "</span>");
        innerArr.push("<span class=\"prompt\">" + currentHP + "</span>");
        innerArr.push("</div>");
        innerArr.push("<div class=\"countdown\">");
        innerArr.push("<span class=\"data\" id=\"" + obj.countdownId + "\">" + countdownTime + "</span>");
        innerArr.push("<span class=\"prompt\">" + countdownHP + "</span>");
        innerArr.push("</div>");
        innerArr.push("</div>");
        innerArr.push("<a class=\"coin-btn\" href=" + obj.href + ">" + more + "</a>");
        innerArr.push("</div>");
        var styleColor = getStatusColor(obj.status);
        var statusTitle = getStatusTitle(obj.status);
        innerArr.push("<div class=\"coin-status\" style=\"" + styleColor + "\">" + statusTitle + "</div>");
        if (obj.status == 3) {
            innerArr.push("<img class='stamp' src='../resource/stamp.png'>");
        }
        innerArr.push("</div>");
        innerArr.push("</li>");
    })
    $(".container-ul").empty();
    $(".container-ul").append(innerArr.join(''));

    if (variableLanStr == "cn") {
        $("#btplatinum").empty();
        $("#btplatinum").html("<span class=\"coin-title\">比特币铂金（<span style=\"text-decoration: line-through\">BTP</span>重名）</span>");
    } else {
        $("#btplatinum").empty();
        $("#btplatinum").html("<span class=\"coin-title\">Bitcoin Platinum(<span style=\"text-decoration: line-through\">BTP</span>duplication)</span>");
    }
}

function getStatusColor(status) {
    var colorStr;
    switch (status) {
        case 1:
            colorStr = "background-color: #F99F26";
            break;
        case 2:
            colorStr = "background-color: #3AB69C";
            break;
        case 3:
            colorStr = "background-color: #3AACEB";
            break;
        case 4:
            colorStr = "background-color: #C8C8C8";
            break;
        case 5:
            colorStr = "background-color: #F99F26";
            break;
        case 6:
            colorStr = "background-color: #C8C8C8";
            break;
        case 7:
            colorStr = "background-color: #ED6363";
            break;
    }
    return colorStr;
}

function getStatusTitle(status) {
    switch (status) {
        case 1:
            return variableLanStr == "cn" ? "即将分叉" : "Upcoming";
            break;
        case 2:
            return variableLanStr == "cn" ? "分叉中" : "Undergoing";
            break;
        case 3:
            return variableLanStr == "cn" ? "已分叉" : "Completed";
            break;
        case 4:
            return variableLanStr == "cn" ? "已取消" : "Cancelled";
            break;
        case 5:
            return variableLanStr == "cn" ? "进行中" : "Undergoing";
            break;
        case 6:
            return variableLanStr == "cn" ? "已结束" : "Cancelled";
            break;
        case 7:
            return variableLanStr == "cn" ? "High Risk" : "High Risk";
            break;
    }
}

function sortArray(objArr) {
    objArr.sort(function (a, b) {
        return b.sort - a.sort;
    })
    return objArr;
}


