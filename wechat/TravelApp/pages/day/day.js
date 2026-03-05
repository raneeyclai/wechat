Page({
  data: {
    day: null
  },
  onLoad(options) {
    // ...find plan & day from your config...
    const day = /* your selected day */;
    const activities = day.activities.map(a => ({
      ...a,
      expanded: false
    }));
    this.setData({
      day: { ...day, activities }
    });
  },
  toggleActivity(e) {
    const index = e.currentTarget.dataset.index;
    const day = this.data.day;
    const activities = day.activities.slice();
    activities[index].expanded = !activities[index].expanded;
    this.setData({
      day: { ...day, activities }
    });
  }
  onNoteTap(e) {
  const url = e.currentTarget.dataset.url;
  if (url && url.startsWith('http')) {
    wx.setClipboardData({
      data: url,
      success() {
        wx.showToast({ title: 'URL已複製' });
      }
    });
  }
}
});