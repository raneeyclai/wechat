// on launch
wx.getStorage({
  key: 'travelPlans',
  success: res => this.globalData.plans = res.data
});

// Save when loading
wx.setStorageSync('travelPlans', plans);