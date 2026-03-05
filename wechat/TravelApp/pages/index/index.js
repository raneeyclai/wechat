Page({
  data: {
    plans: []
  },
  onLoad() {
    this.loadAllPlans();
  },
  
  // Scan directory and load all plans
  loadAllPlans() {
    const plansDir = '/LocalData/TravelPlan/';
    const fs = wx.getFileSystemManager();
    
    // Note: Mini Programs can't directly list directories, so we need 
    // a predefined list or use a different approach
    const planFiles = [
      '2026AprSeoul.json',
      'Sample.json'
      // Add more filenames here as you create plans
    ];
    
    const allPlans = [];
    planFiles.forEach(filename => {
      const planPath = `${plansDir}${filename}`;
      const planContent = require(planPath); // or use wx.getFileSystemManager().readFileSync()
      
      // Calculate duration
      const start = new Date(planContent.startDate);
      const end = new Date(planContent.endDate);
      const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
      
      allPlans.push({
        ...planContent,
        durationDays: diffDays,
        filename: filename
      });
    });
    
    this.setData({ plans: allPlans });
  },
  
  goToPlan(e) {
    const planId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/plan/plan?id=${planId}`
    });
  },

  onThemeToggle() {
  const systemInfo = wx.getSystemInfoSync();
  const isDark = systemInfo.theme === 'dark';
  
  wx.setNavigationBarColor({
    frontColor: isDark ? '#ffffff' : '#000000',
    backgroundColor: isDark ? '#1a1a1a' : '#ffffff'
  });
  }
});