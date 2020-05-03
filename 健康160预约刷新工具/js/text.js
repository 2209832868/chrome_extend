// 监听事件响应
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) 
{
	// 收到请求中cmd为test  打印value
	if(request.cmd == 'text') console.log(request.value);

	// 查找页面 P标签下 包含4name的
	// 定义个json变量
	var run_status = false;
	console.log("我更新了异步v2");

	//查找是否页面有确认按钮
	if($("a.btn.btn_large.btn_primary").length > 0 )
	{
		console.log("找到了弹框A标签");
		console.log($("a.btn.btn_large.btn_primary").length);
		//点击页面按钮
		// $("a.btn.btn_large.btn_primary").trigger("click");
		// a标签的点击方式略有不同
		$("a.btn.btn_large.btn_primary")[0].click();
		console.log("点了A标签");

	}else
	{
		console.log("没有找到弹框A标签");
	}

	

	//循环查询是否有对应元素
	$("a").each(function()
	{
		//查询是否包含对应文字
		// if($(this).text().indexOf("4name") != -1)
		// {
		// 	//有找到  修改变量内的值
		// 	run_status = true;
		// }

		//检查A标签是否有包含class  _login_tips_
		if($(this).hasClass("_login_tips_"))
		{
			//找到预约 直接返回
			run_status = true;
			return;
		}else{

		}
	});	

	console.log(run_status);
	sendResponse(run_status);

	//开启异步
	return true;
});

