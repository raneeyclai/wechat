Page({
  data: {
    loading: true,
    plans: [],
    allPlans: []
  },

  onLoad() {
    this.loadAllPlans();
  },

  loadAllPlans() {
    const planFiles = [
      '2026-apr-hkg.json',
      '2026-jun-macau.json'
    ];
    
    const allPlans = [];
    planFiles.forEach(filename => {
      try {
        const planPath = `/LocalData/TravelPlan/${filename}`;
        const plan = require(planPath);
        
        const start = new Date(plan.startDate);
        const end = new Date(plan.endDate);
        const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
        
        allPlans.push({
          ...plan,
          durationDays: diffDays,
          filename: filename
        });
      } catch (e) {
        console.warn(`Failed to load ${filename}:`, e);
      }
    });
    
    this.setData({ 
      loading: false, 
      plans: allPlans,
      allPlans 
    });
  },

  goToPlan(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/plan/plan?id=${id}`
    });
  },

  onPullDownRefresh() {
    this.loadAllPlans();
    wx.stopPullDownRefresh();
  }
});