const app = getApp()

Page({
  data: {
  },
  //事件处理函数

  addBtnClick: function () {//新增内容
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  submit: function (e) {//提交
    var content = e.detail.value.content;
    var name = e.detail.value.title;
    if (content.length == 0 || name.length==0){
			app.showModal('输入信息不完整！')
    }
    else{
      app.showLoading(1000);
      wx.request({
        url: app.globalData.api+'addNote',
        data:{
          name:name,
          content: content,
          id: app.globalData.userInfo.nickName
        },

        success:(res)=>{

          if(res.data.insertId){
            wx.showModal({
              title: '提示',
              content: '添加成功！是否查看列表？',
              success: function (res) {
								wx.redirectTo({
                  url: '../list/list'
                })
              }
            })
          }else{
						app.showModal('添加失败！')
          }
        }
      })
    }
  },


  onLoad:function(){

  }
})