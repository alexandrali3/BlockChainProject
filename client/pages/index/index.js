//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        getUserInfoFail: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    addBtnClick: function () {//新增内容
    wx.navigateTo({
      url: '../newnote/newnote'
    })
  },

    showListBtnClick: function () {//列表
    wx.navigateTo({
      url: '../search/search'
    })
    },

  onLoad: function () {

      if (app.globalData.userInfo) {
          console.log(1)
          this.setData({
              userInfo: app.globalData.userInfo,
              hasUserInfo: true
          })
      } else if (this.data.canIUse) {
          console.log(2)
          app.userInfoReadyCallback = res => {
              console.log(12)
              app.globalData.userInfo = res.userInfo
              this.setData({
                  userInfo: res.userInfo,
                  hasUserInfo: true
              })
          }
      } else {
          console.log(3)
      }
    },
    onShow: function () {
        this.login();
    },
    login: function () {
        console.log(111)
        var that = this
        wx.login({
            success: function (res) {
                var code = res.code;
                console.log(code);
                wx.getUserInfo({
                    success: function (res) {
                        console.log(7);
                        app.globalData.userInfo = res.userInfo
                        that.setData({
                            getUserInfoFail: false,
                            userInfo: res.userInfo,
                            hasUserInfo: true

                        })
                        //平台登录
                    },
                    fail: function (res) {
                        console.log(8);
                        console.log(res);
                        that.setData({
                            getUserInfoFail: true
                        })
                    }
                })
            }
        })
    },
    getUserInfo: function (e) {
        console.log(5);
        console.log(e)
        if (e.detail.userInfo) {
            app.globalData.userInfo = e.detail.userInfo
            this.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: true
            })
        } else {
            this.openSetting();
        }

    },
    openSetting: function () {
        var that = this
        if (wx.openSetting) {
            wx.openSetting({
                success: function (res) {
                    console.log(9);
                    //尝试再次登录
                    that.login()
                }
            })
        } else {
            console.log(10);
            wx.showModal({
                title: '授权提示',
                content: '小程序需要您的微信授权才能使用哦~ 错过授权页面的处理方法：删除小程序->重新搜索进入->点击授权按钮'
            })
        }
    }
})
