import { useMemo, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import {
  Line as LineChart,
  Bar as BarChart,
} from "react-chartjs-2";
import { useURLStore } from "../store/urlStore";
import { useAuthStore } from "../store/authStore";
import { 
  MousePointerClick, 
  Link2, 
  TrendingUp, 
  Calendar,
  AlertCircle,
  Loader2
} from "lucide-react";
import {URL,DailyClickData, TopURL, TotalMetrics} from "../types/dashboard"



// Chart.js registration remains the same
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: number;
}> = ({ title, value, icon, trend }) => (
  <Card className="relative overflow-hidden">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value.toLocaleString()}</div>
      {trend !== undefined && (
        <div className={`text-xs ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last period
        </div>
      )}
    </CardContent>
  </Card>
);

const AnalyticsDashboard: React.FC = () => {
  const { urls, loading, error, fetchUrls } = useURLStore();
  const { token } = useAuthStore();

  useEffect(() => {
    if (token) {
      fetchUrls(token);
    }
  }, [token, fetchUrls]);

  // Daily clicks calculation remains the same
  const dailyClicksData = useMemo<DailyClickData[]>(() => {
    if (!urls || urls.length === 0) return [];

    const today = new Date().toISOString().split("T")[0];
    const clicksByDate: Record<string, number> = {};
    clicksByDate[today] = 0;

    urls.forEach((url: URL) => {
      const urlDate = new Date(url.createdAt).toISOString().split("T")[0];
      if (urlDate === today) {
        clicksByDate[today] += url.clicks;
      } else {
        clicksByDate[urlDate] = (clicksByDate[urlDate] || 0) + url.clicks;
      }
    });

    return Object.entries(clicksByDate)
      .map(([date, clicks]) => ({ date, clicks }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [urls]);

  // Other calculations remain the same
  const topUrls = useMemo<TopURL[]>(() => {
    if (!urls || urls.length === 0) return [];
    return urls
      .slice()
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5)
      .map((url) => ({
        name: url.short,
        clicks: url.clicks,
        original: url.original,
      }));
  }, [urls]);

  const totalMetrics = useMemo<TotalMetrics>(() => {
    if (!urls || urls.length === 0)
      return {
        totalClicks: 0,
        averageClicksPerUrl: 0,
        totalUrls: 0,
        clickDistribution: { low: 0, medium: 0, high: 0 },
        recentUrls: 0,
      };

    const total = urls.reduce((acc, url) => acc + url.clicks, 0);
    const average = urls.length ? total / urls.length : 0;

    const clickDistribution = {
      low: urls.filter((url) => url.clicks < 10).length,
      medium: urls.filter((url) => url.clicks >= 10 && url.clicks < 50).length,
      high: urls.filter((url) => url.clicks >= 50).length,
    };

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentUrls = urls.filter(
      (url) => new Date(url.createdAt) >= sevenDaysAgo
    );

    return {
      totalClicks: total,
      averageClicksPerUrl: Math.round(average),
      totalUrls: urls.length,
      clickDistribution,
      recentUrls: recentUrls.length,
    };
  }, [urls]);

  // Enhanced chart styling
  const colors = {
    primary: "#3B82F6",
    secondary: "#60A5FA",
    background: "rgba(59, 130, 246, 0.1)",
    gradient: ["#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE"],
  };

  const barChartData = {
    labels: topUrls.map((entry) => entry.name),
    datasets: [
      {
        label: "Clicks",
        data: topUrls.map((entry) => entry.clicks),
        backgroundColor: colors.gradient,
        borderRadius: 5, // Adjust the value for more or less rounding
      },
    ],
  };
  
  const lineChartData = {
    labels: dailyClicksData.map((entry) => entry.date),
    datasets: [
      {
        label: "Clicks",
        data: dailyClicksData.map((entry) => entry.clicks),
        borderColor: colors.primary,
        backgroundColor: colors.background,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
          weight: 700,
        },
        bodyFont: {
          size: 13,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: (value: string | number) => (typeof value === 'number' ? Math.floor(value) : value),
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.06)",
        },
      },
    },
  };

  if (!token)
    return (
      <div className="flex items-center justify-center h-screen gap-2 text-gray-500">
        <AlertCircle className="h-5 w-5" />
        <span>No Token Available</span>
      </div>
    );
    
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen gap-2 text-blue-500">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Loading dashboard data...</span>
      </div>
    );
    
  if (error)
    return (
      <div className="flex items-center justify-center h-screen gap-2 text-red-500">
        <AlertCircle className="h-5 w-5" />
        <span>Error loading data</span>
      </div>
    );

  return (
    <>
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen ml-80">
   

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Clicks"
          value={totalMetrics.totalClicks}
          icon={<MousePointerClick className="h-5 w-5 text-blue-500" />}
          trend={5.2}
        />
        <StatCard
          title="Average Clicks/URL"
          value={totalMetrics.averageClicksPerUrl}
          icon={<TrendingUp className="h-5 w-5 text-green-500" />}
          trend={-2.1}
        />
        <StatCard
          title="Total URLs"
          value={totalMetrics.totalUrls}
          icon={<Link2 className="h-5 w-5 text-purple-500" />}
        />
        <StatCard
          title="New URLs (7d)"
          value={totalMetrics.recentUrls}
          icon={<Calendar className="h-5 w-5 text-orange-500" />}
          trend={8.4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Top Performing URLs
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 p-4">
            <div className="h-full w-full">
              <BarChart data={barChartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <MousePointerClick className="h-5 w-5 text-blue-500" />
              Daily Clicks Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 p-4">
            <div className="h-full w-full">
              <LineChart data={lineChartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
};

export default AnalyticsDashboard;