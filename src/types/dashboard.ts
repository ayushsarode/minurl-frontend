export interface URL {
    short: string;
    original: string;
    clicks: number;
    createdAt: string;
  }
  
 export  interface DailyClickData {
    date: string;
    clicks: number;
  }
  
 export interface TopURL {
    name: string;
    clicks: number;
    original: string;
  }
  
  export interface ClickDistribution {
    low: number;
    medium: number;
    high: number;
  }
  
  export interface TotalMetrics {
    totalClicks: number;
    averageClicksPerUrl: number;
    totalUrls: number;
    clickDistribution: ClickDistribution;
    recentUrls: number;
  }