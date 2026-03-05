// pages/day/day.js
Page({
  data: {
    planTitle: '',
    day: null
  },

  onLoad(options) {
    const { planId, dayId } = options;
    this.loadDay(planId, dayId);
  },

  loadDay(planId, dayId) {
    // Load the specific plan file
    const filename = `${planId}.json`;
    const planPath = `/LocalData/TravelPlan/${filename}`;
    
    try {
      const plan = require(planPath);
      const day = plan.days.find(d => d.id === dayId);
      
      // Add expanded state to activities
      const activities = day.activities.map(activity => ({
        ...activity,
        expanded: false
      }));
      
      this.setData({
        planTitle: plan.title,
        day: { ...day, activities }
      });
      
      wx.setNavigationBarTitle({ title: `${day.date} ${day.title}` });
    } catch (e) {
      wx.showToast({ title: '找不到行程資料', icon: 'error' });
    }
  },

  // Toggle activity expand/collapse
  toggleActivity(e) {
    const index = e.currentTarget.dataset.index;
    const day = this.data.day;
    const activities = day.activities.slice();
    activities[index].expanded = !activities[index].expanded;
    
    this.setData({
      day: { ...day, activities }
    });
  },

  // Handle URL taps (copy to clipboard)
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