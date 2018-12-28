const app = getApp()
Page({
	data: {
	},
	submit: function (e) {
		var content = e.detail.value.content;
		var name = e.detail.value.title;
		var sqlid=this.data.sqlid;
		app.showLoading(1000);
		wx.request({
			url: app.globalData.api + 'updateNote',
			data:{
				id: app.globalData.userInfo.nickName,
				name: e.detail.value.title,
				content:e.detail.value.content,
				sqlid: this.data.sqlid
			},
			success:function(res){
				if (res.data.changedRows){
					wx.showModal({
						title: '提示',
						content: '修改成功！是否查看列表？',
						success: function (res) {
							wx.redirectTo({
								url: '../list/list'
							})
						}
					})
				} else {
					app.showModal('修改失败！')
				}
			}
		})
	},
	onLoad:function(options){
		this.setData({
			sqlid: options.sqlid,//第二个是数据库id
		})
		app.showLoading(1000);
		wx.request({
			url: app.globalData.api + 'getNote',
			data:{
				id: app.globalData.userInfo.nickName,//两个id 第一个是昵称 以太坊使用 
				name:options.name
			},
			success:(res)=>{
				this.setData({
					name:options.name,
					content:res.data.content
				})
			}
		})
	}

})