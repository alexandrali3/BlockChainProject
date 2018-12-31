const app = getApp()
Page({
	data: {
	},
	submit: function (e) {
		var content = e.detail.value.content;
		var name = e.detail.value.title;
	    var id=this.data.id;
		app.showLoading(1000);
		wx.request({
			url: app.globalData.api + 'updateNote',
			data:{
				id: app.globalData.userInfo.nickName,
				name: e.detail.value.title,
				content:e.detail.value.content,
				id: this.data.id
			},
			success:function(res){
				if (res.data){
					wx.showModal({
						title: '提示',
						content: '修改成功！',
					})
				} else {
					app.showModal('修改失败！')
				}
			}
		})
	},
	onLoad:function(options){
		this.setData({
			id: options.id,
		})
		app.showLoading(1000);
		wx.request({
			url: app.globalData.api + 'getNote',
			data:{
				id: app.globalData.userInfo.nickName,
				name:options.name
			},
			success:(res)=>{
				this.setData({
					name:options.name,
					content:res.data.content
				})
			}
		})
	},

    deleteNoteBtnClick: function (e) {
        var name = this.data.name;
        var id = this.data.id;
        app.showLoading(1000);
        wx.request({
            url: app.globalData.api + 'updateNote',
            data: {
                name: this.data.name,
                content: null,
                id: this.data.id
            },
            success: function (res) {
                if (res.data) {
                    wx.showModal({
                        title: '提示',
                        content: '删除成功！',
                        success: function (res) {
                            wx.redirectTo({
                                url: '../index/index'
                            })
                        }
                    })
                } else {
                    app.showModal('删除失败！')
                }
            }
        })
    }

})