const app = getApp()

Page({
  data: {
  },
	noteitemClick:function(e){
		var name = e.currentTarget.dataset.name;
		var sqlid = e.currentTarget.dataset.sqlid;//数据库的id主键字段用于details页面修改mysql数据库使用， 以太坊的id这个程序里为用户昵称 nickName
		wx.navigateTo({
			url: '../details/details?name=' + name + '&sqlid=' + sqlid
		})
	},
	viewStateClick:function(e){
		console.log(e.currentTarget.dataset)
		var code = e.currentTarget.dataset.code;
		app.showLoading();
		wx.request({
			url: app.globalData.api + 'status',
			data:{
				hash:code
			},
			success:(res)=>{
				if (res.data.info == 1){
        				app.showModal('存储成功！');
					this.data.noteList[e.currentTarget.dataset.index].text ='✔';
        } else if (res.data.info == 0){
					app.showModal('存储失败！');
					this.data.noteList[e.currentTarget.dataset.index].text = 'X';
				}
        else 
        {
          app.showModal('矿工还没有为该交易挖出区块，请稍后');
        }
				this.setData({
					noteList: this.data.noteList
				})
			}
		})
	},
  onLoad: function () {
		app.showLoading();
    wx.request({
      url: app.globalData.api+'getList',
      data: {       
        id: app.globalData.userInfo.nickName
      },
      success:(res)=>{
				var data=res.data;
				for(var i in data){
					data[i]['text']='状态';
				}
				this.setData({
					noteList:data
				})
      }
    })
  }
	
})