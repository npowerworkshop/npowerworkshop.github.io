$(document).ready(function() {
  $('.bg').parallax({
    offsetY: -200,
    speedFactor: 0.3
  }); //jQuery selector中可以放任何你想要 parallax 效果的元素
});
$(document).ready(function() {
	history("20151220");
  about = true;
  $('#logo').attr("src", "images/logo.gif");
	setTimeout(function() {
		$('#logo_frame').animate({'opacity':'1'}, 1000);
	}, 1600);
  $(window).scroll( function(){
      $('.hidden-content').each( function(i){
          var top_of_object = $(this).offset().top + $(this).outerHeight();
          var bottom_of_window = $(window).scrollTop() + $(window).height() + 200;
          var top_of_window = $(window).scrollTop();
          if( bottom_of_window > top_of_object - 300 ){
              $(this).animate({'opacity':'1'}, 500);
          }
      });
  });

  $(window).scroll( function(){
    var top_of_object = $('#aboutUsChart').offset().top + $('#aboutUsChart').outerHeight();
    var bottom_of_window = $(window).scrollTop() + $(window).height() + 200;
    var top_of_window = $(window).scrollTop();
    if( bottom_of_window > top_of_object - 300 && about ){
      aboutUsChart();
      about = false;
    }
  });

  $(window).scroll( function(){
      var bottom_of_object = $('#studentMap').offset().top + $('#studentMap').outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height() + 200;
      var top_of_window = $(window).scrollTop();
      /* If the object is completely visible in the window, fade it it */
      if( bottom_of_window > bottom_of_object ){
          studentmapchart();
      }
  });

});

function aboutUsChart() {
  days = $.now() / (1000 * 60 * 60 * 24) - 16866.2;
  workshops = 18;
  students = 283;
  var options = {
    useEasing : true,
    useGrouping : true
  };
	/*
  var daysCount = new CountUp("days", 0, days, 0, 2.5, options);
  daysCount.start();
  var workshopsCount = new CountUp("workshops", 0, workshops, 0, 2.5, options);
  workshopsCount.start();
  var studentsCount = new CountUp("students", 0, students, 0, 2.5, options);
  studentsCount.start();
	*/

  var daysbar = new ProgressBar.Circle(dayspie, {
    color: '#0066FF',
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#77DDFF', width: 1 },
    to: { color: '#0066FF', width: 4 },
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);
      var value = Math.round(circle.value() * 366);
      circle.setText(value + "天");
    }
  });
  daysbar.text.style.fontSize = '4em';
  daysbar.animate(days / 366);

  var workshopsbar = new ProgressBar.Circle(workshopspie, {
    color: '#00AA55',
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#77FFCC', width: 1 },
    to: { color: '#00AA55', width: 4 },
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);
      var value = Math.round(circle.value() * 25);
      circle.setText(value + "場<br>工作坊");
    }
  });
  workshopsbar.text.style.fontSize = '3em';
  workshopsbar.animate(workshops / 25);

  var studentsbar = new ProgressBar.Circle(studentspie, {
    color: '#FF8800',
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#FFBB66', width: 1 },
    to: { color: '#FF8800', width: 4 },
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);
      var value = Math.round(circle.value() * 360);
      circle.setText(value + "位<br>學員");
    }
  });
  studentsbar.text.style.fontSize = '3em';
  studentsbar.animate(students / 360);
}

// D3
var studentDensity = {
    "臺北市": 8,
    "嘉義市": 0,
    "新竹市": 1,
    "基隆市": 0,
    "新北市": 0,
    "桃園市": 1,
    "臺中市": 2,
    "彰化縣": 2,
    "高雄市": 22,
    "臺南市": 79,
    "金門縣": 0,
    "澎湖縣": 0,
    "雲林縣": 1,
    "連江縣": 0,
    "新竹縣": 0,
    "苗栗縣": 0,
    "屏東縣": 0,
    "嘉義縣": 8,
    "宜蘭縣": 0,
    "南投縣": 0,
    "花蓮縣": 1,
    "臺東縣": 0
};

// 學員分布
d3.json("county.json", function(topodata) {
    var features = topojson.feature(topodata, topodata.objects["county"]).features;
    for(i = features.length - 1; i >= 0; i--) {
        features[i].properties.density = studentDensity[features[i].properties.C_Name];
    }
    var path = d3.geo.path().projection(d3.geo.mercator().center([121,24]).scale(8000));
    var color = d3.scale.linear().domain([0,100]).range(["#78B0B4","#66FF66"]);
    d3.select("svg#student").selectAll("path").data(features).enter().append("path")
        .attr("fill",function(d){
            return color(d.properties.density);
        }).attr("d", path);
});

function studentmapchart(){
    var data=[
        {x:1, w: 8}, //臺北市
        {x:2, w: 0},
        {x:3, w: 1}, //新竹市
        {x:4, w: 0},
        {x:5, w: 0},
        {x:6, w: 1}, //桃園市
        {x:7, w: 2}, //臺中市
        {x:8, w: 2}, //彰化縣
        {x:9, w: 22}, //高雄市
        {x:10, w: 79}, //臺南市
        {x:11, w: 0},
        {x:12, w: 0},
        {x:13, w: 1}, //雲林縣
        {x:14, w: 0},
        {x:15, w: 0},
        {x:16, w: 0},
        {x:17, w: 0},
        {x:18, w: 8}, //嘉義縣
        {x:19, w: 0},
        {x:20, w: 0},
        {x:21, w: 1}, //花蓮縣
        {x:22, w: 0}
    ];

    var s = d3.select('#studentchart')
    .attr({
      'width':300,
      'height':800
    });

    s.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr({
        'fill':'#7BB',
        'width':0,
        'height':20,
        'x':0,
        'y':function(d){
          return (d.x-1) * 25;
        }
        })
        .transition()
        .duration(1500)
        .attr({
        'width':function(d){
          return (d.w + 1) * 2;
        }
        });

    s.selectAll('text')
       .data(data)
       .enter()
       .append('text')
       .text(function(d){
        return 0  ;
       })
       .attr({
        'fill':'#000',
        'x':3,
        'y':function(d){
          return d.x * 25 - 12;
        }
       })
       .transition()
       .duration(1500)
       .attr({
        'x':function(d){
          return (d.w + 1) * 2 + 3;
        }
       })
       .tween('number',function(d){
          var i = d3.interpolateRound(0, d.w);
            return function(t) {
            this.textContent = i(t);
          };
       });
};

$('.item').click(function(e) {
	e.preventDefault();
	$('.item').removeClass('active');
	$(this).addClass('active');
});

var feedback_count = 0;
var feedback_cur = 0;

function history(date) {
	console.log(date);
	data = history_data[date];
	console.log(data);
	$('#workshop_title').html(data["name"]);
	$('#price').html("<i class='dollar icon'></i>" + data["price"] + " / " + data["duration"]);
	$('#date').html("<i class='calendar icon'></i>" + data["date"]);
	$('#attandence').html("<i class='users icon'></i>" + data["attandence"]);
	$('#speakerimg').attr("src", "../images/history/speakers/" + date + ".jpg");
	$('#speaker_name').html(data["speaker"]["name"]);
	$('#department').html(data["speaker"]["department"]);
	$('#workshopinfo').html(data["info"]);
	$('#workshopimg').attr("src", "../images/history/photos/" + date + ".jpg");
	feedback = data["feedback"];
	$('#feedback_title').html("學員回饋");
	$('#feedback_name').html(data["feedback"][0]["name"]);
	$('#feedback').html(data["feedback"][0]["content"]);
	feedback_count = data["feedback"].length;
	feedback_cur = 0;
}

function shift_right() {
	feedback_cur = (feedback_cur + 1) % feedback_count;
	$('#feedback_name').html(data["feedback"][feedback_cur]["name"]);
	$('#feedback').html(data["feedback"][feedback_cur]["content"]);
}

function shift_left() {
	feedback_cur = (feedback_cur - 1 + feedback_count) % feedback_count;
	$('#feedback_name').html(data["feedback"][feedback_cur]["name"]);
	$('#feedback').html(data["feedback"][feedback_cur]["content"]);
}

var history_data = {
	"20151219": {
		"name": "排版力",
		"price": "300 元",
		"duration": "3.5 hr",
		"date": "2015-12-19",
		"attandence": "18 / 20",
		"speaker": {
			"name": "林協霆",
			"department": "成功大學醫學系",
		},
		"info": "想了解印刷，但卻負擔高額的軟體課程？<br>三小時的出版工作坊，從排版觀念、軟體操作、印刷知識，針對想親手完成一本刊物的學員設計。<br>小班教學，以確保每位學員在實際操作單元有最好的教學品質。",
		"feedback": [
			{
				"name": "",
				"content": ""
			}
		]
	},
	"20151220": {
		"name": "簡報力",
		"price": "300 元",
		"duration": "4 hr",
		"date": "2015-12-20",
		"attandence": "24 / 21",
		"speaker": {
			"name": "侯智薰",
			"department": "成功大學化工系",
		},
		"info": "這是「簡報力」並不是「投影片設計」。<br>工作坊專注於「如何架構內容，使其訊息能正確地傳遞，加強說服力與影響力。」<br>來到Ｎ次坊「簡報力」，讓你開始會說話、會溝通，與積極的人連結，建立社群。",
		"feedback": [
			{
				"name": "成功大學/經濟系大一",
				"content": "我們聽到的都是關於簡報能力最重要的精華（simple but important)，我會好好珍惜這次課程所學，未來需要使用到的時候好好發揮應用。"
			},
			{
				"name": "楊政穎",
				"content": "參加簡報力之前，我只是把word拆成語句的操作員<br>參加簡報力過程中，覺得自己更加渺小了，但很幸運有這麼一群同伴一起努力<br>  參加簡報力之後，對於簡報有新的看法，希望從此成為自己的一身絕活<br>  分享讓我們的世界更進步，從古（股份有限公司的起源），至今（知識經濟的推廣），始終如此。"
			},
			{
				"name": "洪翊庭",
				"content": "希望當工作坊人氣越來越高的時候還能繼續保持這種小班制的教學，這樣讓參與感會比較高，氣氛也比較輕鬆！"
			}
		]
	},
	"20160306": {
		"name": "Ai 力",
		"price": "400 元",
		"duration": "5 hr",
		"date": "2016-03-06",
		"attandence": "23 / 25",
		"speaker": {
			"name": "林協霆",
			"department": "成功大學醫學系",
		},
		"info": "常常聽人講：「用以拉拉一拉。」到底以拉（Adobe illustrator）是什麼？<br> 來這裡！用四小時的課程帶你快速了解 illustrator 的原理與實務應用！",
		"feedback": [
			{
				"name": "成功大學/外文系大一",
				"content": "對於新手真的能學到很多基本技巧而且讓人玩上癮:)"
			},
			{
				"name": "成功大學/生科系大二",
				"content": "很棒~很有耐心 一直重複講講到我聽懂"
			},
			{
				"name": "長榮大學/翻譯系大三",
				"content": "真的收穫滿滿!沒想到ai這麼有趣及好用,我想回家操作之後會欲罷不能吧 講得很仔細清楚,雖然沒辦法一次消化,但因為資源多,自己也會多練功的XD  很喜歡N次坊開的課程,每次報名都像搶年終大拍賣緊張,謝謝提供這麼好的資源"
			},
			{
				"name": "成功大學/醫技系大三",
				"content": "很喜歡這堂課，覺得收穫很多，回家一定會想繼續練習"
			}
		]
	},
	"20160312": {
		"name": "簡報力",
		"price": "499 元",
		"duration": "5 hr",
		"date": "2016-03-12",
		"attandence": "31 / 25",
		"speaker": {
			"name": "侯智薰",
			"department": "成功大學化工系",
		},
		"info": "「簡報力」，並不光是投影片設計。<br>這場工作坊，將專注於「組織訊息、架構你的說服力，並且有效傳遞」。<br>常常資訊一堆，卻不知道該如何說出口？",
		"feedback": [
			{
				"name": "長榮大學/翻譯系大三",
				"content": "覺得自己的弱點在於無法跳脫既有模式與框架,但是經過今天的課程,發現自己真的太狹隘XD課程脈絡清楚,很容易吸收!最後大家分享與實作,找出自己的不足,真的很好。"
			},
			{
				"name": "台南女中",
				"content": "首先，很感謝講者提供給我們的學員包，內容很豐富!!而且真的有被你的簡報震撼到！很簡潔有力、給人很舒適的感覺。"
			},
			{
				"name": "成功大學/生科系大一",
				"content": "認知到做好一份簡報絕不只PPT做得好看就夠了！許多架構的模式以及開頭結尾的方式相當實用~~希望自己之後也能夠成為簡報高手XD"
			},
			{
				"name": "成功大學/物治系大三",
				"content": "雷蒙德非常有耐心，講課部分也非常穩健札實。針對實作部分，我建議用小組方式進行，不僅能激發討論，更能讓有不同專長的人互相合作(擅長文字內容、有簡報製作基礎)，最重要的是能確保有作品產出:P"
			},
			{
				"name": "成功大學/外文系大一",
				"content": "我覺得今天的課程讓我改變以前對簡報的看法 不只要考慮到簡報的板面配置 還要時常回到簡報主題加強重點"
			}
		]
	},
	"20160320": {
		"name": "PS 力",
		"price": "400 元",
		"duration": "4 hr",
		"date": "2016-03-20",
		"attandence": "24 / 24",
		"speaker": {
			"name": "林協霆",
			"department": "成功大學醫學系",
		},
		"info": "Photoshop不僅是攝影師的專業軟體。<br>在生活中，會遇到許多要處理照片。<br>該如何以正確的使用Photoshop，並與實務結合，如修圖、海報、去背、合成。",
		"feedback": [
			{
				"name": "成功大學/企管系大二",
				"content": "內容非常豐富，收穫良多，有此基礎往後就能具備繼續進修的能力"
			},
			{
				"name": "上班族",
				"content": "課程內容集中在去背及一些常用功能介紹，依講者認為重要性比例適當做時間分配我覺得很不錯。"
			}
		]
	},
	"20160328": {
		"name": "影像力",
		"price": "500 元",
		"duration": "3 hr",
		"date": "2016-03-28",
		"attandence": "17 / 17",
		"speaker": {
			"name": "曾偉斌",
			"department": "成功大學學士學程暨數學系輔修建築系",
		},
		"info": "不用花大錢，業餘人士也可以打造精緻的照片或影片！ <br>介紹高質感影像製作必備技巧，讓你宣傳行銷更加有效。",
		"feedback": [
			{
				"name": "",
				"content": ""
			}
		]
	},
	"20160410": {
		"name": "自助旅行力",
		"price": "375 元",
		"duration": "4 hr",
		"date": "2016-04-10",
		"attandence": "15 / 20",
		"speaker": {
			"name": "黃詩涵",
			"department": "成功大學醫學系",
		},
		"info": "對於旅行，多數的我們，困於經費問題、不知道行程如何安排、擔心文化衝突，或者是現在學生最大的問題「父母不放心」⋯。在這工作坊，我們將一步一步解決這些難關！跟著我們一起旅行吧！",
		"feedback": [
			{
				"name": "成功大學/光電系大二",
				"content": "內容很實用也很有趣，辛苦了！ 很喜歡今天的演講！"
			},
			{
				"name": "臺南應用科技大學/室內設計系大四",
				"content": "給很多方法還有程式，可以慢慢的摸索自助旅行的感覺"
			},
			{
				"name": "成功大學/會計系大四",
				"content": "有趣~聽到很多實用的網站和app 講者可愛活潑"
			},
			{
				"name": "台南女中",
				"content": "學到很多實用的小工具！像是訂機票的部分，原本只知道Skyscanner，訂住宿只知道booking.com，而講者推薦了更多可以搜尋到更廉價、降低旅遊成本的app。另外，也聽到講者的自助經驗，像是用統一肉臊麵換到法國廚師親自下廚的一餐、讓青年旅館跳電lol！"
			}
		]
	},
	"20160424": {
		"name": "英語發音力",
		"price": "300 元",
		"duration": "4 hr",
		"date": "2016-04-24",
		"attandence": "7 / 15",
		"speaker": {
			"name": "林子莛",
			"department": "臺北教育大學兒童英語教育學系",
		},
		"info": "口音並非關鍵，卻能使人與人在溝通上達到很大的效果。那為什麼要練習發音？「在講一口道地的英文之前，你得先聽習慣自己不自然的聲音」除了讓自己更有自信講英文，對於「溝通上的理解」和「語感的培養」也是有極大的幫助！",
		"feedback": [
			{
				"name": "精誠高三",
				"content": "謝謝Minnie的授課！ 妳講了好多發音上的小細節，讓我受益良多，期待在返家練習之後，有亮眼的驗收成果"
			},
			{
				"name": "高醫醫學七",
				"content": "So passionate."
			},
			{
				"name": "長榮大學企管碩三",
				"content": "講者分享的過程很活潑也很生動，整場下來相當開心~希望能繼續保持!!!"
			}
		]
	},
	"20160430": {
		"name": "三創力",
		"price": "499 元",
		"duration": "4 hr",
		"date": "2016-04-30",
		"attandence": "16 / 20",
		"speaker": {
			"name": "洪健耀",
			"department": "成大創意產業研究所",
		},
		"info": "「講道理不如講故事」，面對瞬息萬變的創業環境，需要面對市場的嚴苛挑戰，透過真實案例的分享及實務個案實作，藉由一套源自史丹佛從創新到創業完整的三創模式，帶你了解過程中須考量的商業策略及產業分析。",
		"feedback": [
			{
				"name": "高醫醫學五",
				"content": "內容充滿許多範例加強思考上的連結，讚！"
			},
			{
				"name": "南臺科技大學",
				"content": "非常謝謝講師的分享，學到了不少思維，最後講師有講到，吸引力法則，聽到我眼睛都亮了，因為心有所感，還在尋找內心的那一個小拼圖，所以才來參加三創力，激發自己成長，很開心能夠認識這麼厲害的講師。<br>對於創業，我曾經賣過自製手鍊，不過出發點是單純喜歡手作，但是只維持了兩個月就不做了，沒有對的核心價值，最後變成為了賣而賣，投報率也不高，這是我目前唯一一次的小創業，很有趣。其實來參加三創力，是來尋找自己的，我想成長，卻感覺少了什麼，看到講師這麼有方向的前進，覺得羨慕，回到思維，這就是價值吧，讓自己成為一個有價值的人比一個月薪水有多少錢重要。"
			}
		]
	},
	"20160515": {
		"name": "魅力",
		"price": "499 元",
		"duration": "4 hr",
		"date": "2016-05-15",
		"attandence": "11 / 18",
		"speaker": {
			"name": "楊先立",
			"department": "成功大學電機工程研究所",
		},
		"info": "課程核心是建立正確的心法，並在無數嘗試中找到個人風格，從外貌（穿著、體態）到內在（充足心態、自信、幽默），讓你有改造自我的動機和能力；並學習關係進程、肢體接觸、情感表達的訣竅。從實際操練知道會遇到那些問題與瓶頸，以及學習如何解決。",
		"feedback": [
			{
				"name": "長榮中學",
				"content": "藉由這堂課，我發現原來和人交流的時候，每個細節都很重要，人與人之間的交際技巧，就像說話時不能扭扭捏捏等，所以也因為這堂課，讓我知道肢體語言佔了大多數的比重，要如何和人交流，真的很重要！最深刻的部份莫過於，有時間讓我們互動、交流，而不是上上課就回去了，喜歡這樣的上課方式。"
			},
			{
				"name": "精誠高中",
				"content": "上課的過程可以知道講者很用心，對於實做等等規劃覺得很完善，很愉快的是今天的交流過程還有認識了朋友，對於其他方向，也蠻想認識音樂人的，有歡樂的氣氛等，在這次活動中也認識到和自己興趣蠻相仿的朋友，他是一位工程師，但是，沒有想到並不是出社會的那種距離感，人很親切，在這次的活動中感到很愉快。"
			},
			{
				"name": "成大醫工所",
				"content": "很好很有幫助，喜歡從心理與觀念方面建立起正確正向的關念進而進入技術面，經過有系統的整理對我有很大的啟發。"
			}
		]
	},
	"20160528": {
		"name": "<p style='font-size: 38px'>簡報力馬拉松</p>",
		"price": "1000 元",
		"duration": "8 hr",
		"date": "2016-05-28",
		"attandence": "53 / 48",
		"speaker": {
			"name": "侯智薰",
			"department": "成功大學化工系",
		},
		"info": "八小時的「簡報力」，並不光是投影片設計。將解析整個「簡報製作流程」，並搭配個人實際演練與團體協作，讓我們專務在「內容」，以及「呈現」。不要再當個說話說一堆，卻沒人聽得懂的人了！快呼朋引伴，運用這八小時，重新投資自己！學會真正做「簡報」。",
		"feedback": [
			{
				"name": "成大經濟二",
				"content": "我覺得整體來說非常好,比較不偏重設計面,畢竟如何增加美感,很多網路上都有教學,反而是一些心法阿.如何檢視自己的簡報,是在外面比較看不到的!!!"
			},
			{
				"name": "精誠高中",
				"content": "我覺得今天課堂上分享的簡報技巧只是Raymond哥哥自己摸索出來的心得中的一小部分而已，講真的只有一堂課並不足以把所有知識傾囊相授，所以更重要的還是學習您自主學習的能力和精神吧，感謝您創造這個機會讓我看見很多超出我的經驗範圍的事，進而刺激自己更努力的學習，我覺得您在自學能力方面真的是一個很好的典範，讓我想要效法與學習，期待N次坊的分享擴散與茁壯，為台灣社會帶來更多正面的效益，您真的好厲害呀，真心的佩服您。"
			}
		]
	},
	"20160529": {
		"name": "PS 力",
		"price": "400 元",
		"duration": "3.5 hr",
		"date": "2016-05-29",
		"attandence": "10 / 10",
		"speaker": {
			"name": "林協霆",
			"department": "成功大學醫學系",
		},
		"info": "Photoshop不僅是攝影師的專業軟體，在生活中，會遇到許多要處理照片。該如何以正確的使用Photoshop，並與實務結合，如修圖、海報、去背、合成。來【Ｎ次坊－Ps力】，相信你一定能有所收穫。",
		"feedback": [
			{
				"name": "",
				"content": ""
			}
		]
	},
	"20160612": {
		"name": "海報力",
		"price": "400 元",
		"duration": "4 hr",
		"date": "2016-06-12",
		"attandence": "7 / 10",
		"speaker": {
			"name": "林庭瑄",
			"department": "成功大學工業設計學系",
		},
		"info": "你還在煩惱如何設計活動海報嗎？ 海報力將實際帶領大家產出活動文宣品， 一窺完整的設計流程！讓你學會透過設計來傳達出價值、並抓住目標客群的目光。",
		"feedback": [
			{
				"name": "嘉義大學數位系大三",
				"content": "雖然自己有在做一些美宣品，但從未仔細研究過排版,很喜歡排版的教學，如果在教學排版時有海報的案例可以輔佐教學會更好<br>很喜歡講者分享字型的運用，這真的是做設計一大難題<br>也很喜歡講者一對一的教學，比起講者講述，直接before&AFTER學習的更多!!"
			},
			{
				"name": "高醫醫學一",
				"content": "謝謝你告訴我們照片調色的小訣竅啊~覺得今天收穫很多，謝謝!!!!"
			},
			{
				"name": "圖文工作者",
				"content": "感覺準備充分但因為機器問題有被稍微影響到節奏與心情。<br>覺得個案討論並給專屬的建議是很棒的發想，也很考驗講者的功力與臨場反應！如果之後能讓一對一個案指導或小講評，進化成參與者都能從案例中學習技巧或調整的思考關鍵，感覺模式會更豐富更有交流性。加油！"
			}
		]
	},
	"20160807": {
		"name": "文案力",
		"price": "350 元",
		"duration": "4 hr",
		"date": "2016-08-07",
		"attandence": "22 / 25",
		"speaker": {
			"name": "劉育名",
			"department": "淡江大學教育科技系",
		},
		"info": "文案不是死板板的文字而已，好的文案能讓讀者腦中浮現畫面，像電視廣告文案「青菜抵加啦～」、「XX電子最甘心」；電影台詞「你留下，或者我跟你走」；競選文案「白色力量」、「 台灣加油」。把握這四個小時，學會把文案寫好，讓文字幫你賺錢、把妹、考好成績、獲得老闆認同，讓魯蛇變成溫拿！",
		"feedback": [
			{
				"name": "成功大學/心理系一年級",
				"content": "我沒有想到參與者這麼多元、好酷"
			},
			{
				"name": "小寶優居 / 行銷部門",
				"content": "講者有教導我們許多好的觀念，在有了好的觀念和架構之後，提供實際練習、分組討論的機會，讓我們可以體會到自己動腦和集思廣益的效益，真的能夠幫助思考很多。"
			},
			{
				"name": "小寶優居 / 行銷部門",
				"content": "覺得講者會掌握大家的氣氛，控場能力蠻不錯的XD 講解的速度我覺得適中，也很清楚聽得懂。 簡報做得很好，淺顯易懂（動畫很棒XD！） 很謝謝你與大家分享了很好的文案觀念和厲害的舉例！"
			},
			{
				"name": "新進工業/倉管",
				"content": "覺得上文案力這次的課程收穫很多，幫助我在文案寫作的技巧提升以及謝謝講者用心提供的範例以及用心的準備"
			},
			{
				"name": "長榮大學/企業管理學系碩三專班",
				"content": "這次的工作坊雖然只聽了兩個小時(後面因要事離開) 但也盡我所能的在短短的兩小時之內，吸收知識，並將以前的所學與運用至模擬練習上，效果委實不錯"
			},
			{
				"name": "亞洲大學/資訊傳播系二年級",
				"content": "講師給了結構化的文法和分析方法，很實用也很容易理解"
			}
		]
	},
	"20160819": {
		"name": "小編力",
		"price": "350 元",
		"duration": "4 hr",
		"date": "2016-08-19",
		"attandence": "15 / 17",
		"speaker": {
			"name": "張贏尹",
			"department": "輔仁大學資訊管理系",
		},
		"info": "介紹社群經營及行銷的心法，分享自己一年半以來的實作經驗，包括文案撰寫、公關處理、數據分析、行銷包裝等等。最後總結身為小編的責任、必備技能及未來努力的方向。",
		"feedback": [
			{
				"name": "社團法人台南市雙福全人關懷協會/幹事",
				"content": "學生講師很好，感覺沒有和學生脫離太遠，而且有很多摸索、經驗的分享。"
			},
			{
				"name": "清華大學/科技管理研究所碩二畢",
				"content": "我覺得課程設計的實作部分很好，講師本身也有足夠的專業度。原本以為只是單純分享，但多了實作的設計對於講師和學員都更有幫助"
			},
			{
				"name": "長榮大學/大眾傳播系2年級",
				"content": "學到如何製圖，如何提高點閱率，整堂課下來收穫超多的~"
			},
			{
				"name": "臺灣大學 / 心理學研究所",
				"content": "講者很厲害，很多概念都講得很清楚。"
			},
			{
				"name": "台灣師範大學/人類發展與家庭學系四年級",
				"content": "蠻有幫助的，更加了解小編，也知道一些技巧和資源可以嘗試去改善粉專經營沒有成效的問題"
			}
		]
	},
	"20160828": {
		"name": "<p style='font-size: 30px'>懶人包簡報動畫力</p>",
		"price": "1600 元",
		"duration": "10 hr",
		"date": "2016-08-28",
		"attandence": "25 / 35",
		"speaker": {
			"name": "金彥良、侯智薰",
			"department": "政治大學休學生、成功大學化工系",
		},
		"info": "一場一整天的簡報松，大家帶著自己想要呈現的內容與素材，先透過 Wade 的懶人包教學與指導，做出一份有效傳達的懶人包後，在運用動畫的效果，讓原本靜止的懶人包，畫龍點睛。使讀者更佳清楚地瞭解關鍵之處、階層關係，並有圖像印象與記憶。",
		"feedback": [
			{
				"name": "台灣大學化學系碩二",
				"content": "首先，這堂課讓我提升了懶人包與動畫的技巧，再來最重要的是跟我看很多同年齡的人，不管是講者或學員，雖然大家都是差不多程度開始，但是有學員可以在當天作出驚人的成品，這個發現也讓我蠻驚訝的！<br>我還蠻推薦已經畢業後工作的朋友們上這堂課，他們更需要懂得PPT製作的技巧，這堂課也超越我以往對簡報的認知，像是以前大家對於動畫設計，像是轉場、內建動畫的使用都會很排斥，就會有一種使用動畫給人很醜的印象，可是藉由範例的觀摩結合之後，發現你有用心去做時，就可以設計出很漂亮或是有影片剪輯出來的效果，最大的感動是可以把自己喜歡的東西做得很漂亮，分享給其他人，也會用簡短的方式讓朋友對自己喜歡的議題有興趣！"
			}
		]
	},
	"20160924": {
		"name": "探索力",
		"price": "500 元",
		"duration": "4 hr",
		"date": "2016-09-24",
		"attandence": "11 / 11",
		"speaker": {
			"name": "呂方雯",
			"department": "台灣大學心理系",
		},
		"info": "從小到大總是被告知說「只要好好讀書就好」的我們，究竟有多少不同的可能性？這場工作坊將由心理學出發，解析成長歷程中遇上的種種困難、教會你怎麼面對，並將這段旅程的足跡寫成屬於你自己的獨特故事。",
		"feedback": [
			{
				"name": "台灣大學/心理系三年級",
				"content": "透過回顧自己的經驗、察覺自己目前的狀態，以及現場大家互相分享，讓我感受到許多力量，也比較能釐清和分析一些遇過的問題。"
			},
			{
				"name": "成功大學/電機系二年級",
				"content": "帶給我新的想法，課程內容與講者講述也令我重新審視自己的盲點<br>覺得講者有想要傳達的理念，課程內容裡提到的概念也很有道理，當中我也能夠重新審視自己的障礙與盲點。<br>回饋方面，由於本次課程內容廣泛，亦涉及主觀解釋，較難統一，不過我認為某些部分有點破碎，而舉例方面有時不太好理解，或許以現實中的例子代換會比較能代入？"
			}
		]
	},
	"20160925": {
		"name": "UX 力",
		"price": "500 元",
		"duration": "4 hr",
		"date": "2016-09-25",
		"attandence": "16 / 16",
		"speaker": {
			"name": "簡瓅",
			"department": "台灣大學",
		},
		"info": "User Experience，使用者經驗，代表著使用者的感受。<br>「從使用者個角度出發，重新定義真正的好產品」<br>UX力工作坊，帶你在實做中有更多方式「換位思考」，<br>用對的心態搭配對的工具，動手規劃「貼心」、「順暢」的活動流程！",
		"feedback": [
			{
				"name": "高雄大學應用經濟學系",
				"content": "雖然UX力總歸一句是要靠長期的經驗累積，但這次課程學到了各式各樣的工具可以幫助我更加釐清他人的需求跟自己沒注意到的細節。"
			},
			{
				"name": "高雄大學/應用經濟系",
				"content": "這次UX 力帶我從新的關點、新的想法去看待辦活動時候怎樣可以更順暢"
			}
		]
	},
	"20161016": {
		"name": "PS 力",
		"price": "500 元",
		"duration": "4.5 hr",
		"date": "2016-10-16",
		"attandence": "7 / 7",
		"speaker": {
			"name": "林芊慧",
			"department": "國立成功大學/系統系",
		},
		"info": "不知道頭髮染成什麼顏色適合自己？鼻子上長了一顆青春痘嗎？想知道怎麼調出日系粉嫩的空氣感嗎？別擔心，Photoshop 可以解決你的煩惱！這堂課將大量運用實例，手把手的帶領你從基礎的工具帶到調色和簡單的 P 圖手法，一旦活用這些技巧，Photoshop 將能幫助你解決許多問題！",
		"feedback": [
			{
				"name": "嘉南藥理大學/藥學系/學生",
				"content": "想要學習新的技能<br>攝影之後想要學習修圖 修成自己想要的感覺"
			}
		]
	},
}