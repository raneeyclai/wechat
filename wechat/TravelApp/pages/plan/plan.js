Page({
  data: {
    plan: null
  },
  onLoad(options) {
    const { id } = options;
    this.loadPlan(id);
  },
  
  loadPlan(planId) {
    // Reconstruct filename from ID (assuming pattern ID.json)
    const filename = `${planId}.json`;
    const planPath = `/LocalData/TravelPlan/${filename}`;
    const plan = require(planPath);
    
    this.setData({ plan });
    wx.setNavigationBarTitle({ title: plan.title });
  },
  
  goToDay(e) {
    const dayId = e.currentTarget.dataset.dayId;
    const planId = this.data.plan.id;
    wx.navigateTo({
      url: `/pages/day/day?planId=${planId}&dayId=${dayId}`
    });
  }
});