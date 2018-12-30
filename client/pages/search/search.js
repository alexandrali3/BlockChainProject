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
        var name = e.detail.value.title;
        if (name.length == 0) {
            app.showModal('输入信息不完整！')
        }
        else {
            app.showLoading(1000);
            wx.request({
                url: app.globalData.api + 'getNote',
                data: {
                    name: name,
                    id: app.globalData.userInfo.nickName
                },

                success: (res) => {

                    if (res.data) {
                        wx.showModal({
                            title: '提示',
                            content: '查询成功！',
                            success: function (res) {
                                wx.redirectTo({
                                    url: '../details/details?name=' + name + '&id=' + app.globalData.userInfo.nickName
                                })
                            }
                        })
                    } else {
                        app.showModal('查询失败，无对应记录')
                        wx.navigateTo({
                            url: '../details/details?name=' + name + '&id=' + app.globalData.userInfo.nickName
                        })
                    }
                }
            })
        }
    },


    onLoad: function () {

    }
})