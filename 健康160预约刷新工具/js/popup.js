var count_num = 0;
var timer_flag = false;
var audio = new Audio("../resource/goget.mp3");
var timer_refresh = null;
var timer_countdown = null;

//加载前执行
//定义一个发送消息给标签内容页的函数
function sendMessageToContentScript(message, callback)
{
	//获得标签
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs)
	{
		// 发送消息  返回的数据放在respanse
		chrome.tabs.sendMessage(tabs[0].id, message, function(response)
		{
			// 如果回调函数有数据  回调response
			if(callback) callback(response);
		});

	});
} 


// 加载后执行
$(function(){

	//绑定函数到按钮上 函数不能分离定义 否则报错内联问题
	$("#refresh").on("click",function(){
		// 判断计时器是否开启的开关  如果打开
		if (timer_flag) {
			// 先关闭
			timer_flag = false;

			// 关闭掉两个定时器
			clearInterval(timer_refresh);
			clearInterval(timer_countdown);

			// 修改页面按钮的文字
			$("#refresh").attr("value","刷新器开启")
			return;
			}

		// 判断计时器是否开启的开关  如果没有打开
		// 先打开
		timer_flag = true;
		// 开启计时器 绑定方法 五秒倒计时后刷新 计时器要先在全局定义 不然会无法关闭
		timer_refresh = setInterval(function refresh(){

			//重新加载页面 为true则表示不从缓存加载
			chrome.tabs.reload({bypassCache:true});

			//发送消息让content-script页面开始搜索
			//参数一 给一个对象 有cmd 和 value 两个指
			sendMessageToContentScript({cmd:'text',value:'可以开始工作了'}, function(response)
			{
				//内容页回复的参数
				//有找到
				if(response)
				{
					//播放音乐
					audio.play();
					//刷班器退出
					timer_flag = false;
					clearInterval(timer_refresh);
					clearInterval(timer_countdown);
					$("#refresh").attr("value","刷新器开启");

					//直接返回
					console.log('有预约');
					return;
				}
				console.log('没有预约');
			});

		},1000*5);

		// 开启计时器 绑定方法 让P标签文字+1 计时器要先在全局定义 不然会无法关闭
		timer_countdown = setInterval(function count(){
			var num_val = $("p.cd_timer").text();
			count_num += 1;
			$("p.cd_timer").text(count_num);
		},1000);

		// 修改页面按钮的文字
		$("#refresh").attr("value","刷新器关闭");
		return;
	});

});
