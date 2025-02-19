import { useMemo, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
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
import { Line as LineChart, Bar as BarChart, Pie as PieChart } from "react-chartjs-2";
import { useURLStore } from "../store/urlStore";
import { useAuthStore } from "../store/authStore";

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const AnalyticsDashboard = () => {
  const { urls, loading, error, fetchUrls } = useURLStore();
  const { token } = useAuthStore();

  useEffect(() => {
    if (token) {
      fetchUrls(token);
    }
  }, [token, fetchUrls]);

  const dailyClicksData = useMemo(() => {
    if (!urls || urls.length === 0) return [];

    const clicksByDate = urls.reduce((acc, url) => {
      const date = new Date(url.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + url.clicks;
      return acc;
    }, {});

    return Object.entries(clicksByDate)
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .map(([date, clicks]) => ({ date, clicks }));
  }, [urls]);

  const topUrls = useMemo(() => {
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

  const totalMetrics = useMemo(() => {
    if (!urls || urls.length === 0) return { totalClicks: 0, averageClicksPerUrl: 0, totalUrls: 0, clickDistribution: { low: 0, medium: 0, high: 0 }, recentUrls: 0 };

    const total = urls.reduce((acc, url) => acc + url.clicks, 0);
    const average = urls.length ? total / urls.length : 0;

    const clickDistribution = {
      low: urls.filter((url) => url.clicks < 10).length,
      medium: urls.filter((url) => url.clicks >= 10 && url.clicks < 50).length,
      high: urls.filter((url) => url.clicks >= 50).length,
    };

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentUrls = urls.filter((url) => new Date(url.createdAt) >= sevenDaysAgo);

    return {
      totalClicks: total,
      averageClicksPerUrl: Math.round(average),
      totalUrls: urls.length,
      clickDistribution,
      recentUrls: recentUrls.length,
    };
  }, [urls]);

  const colors = ["#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE"];

  const barChartData = {
    labels: topUrls.map((entry) => entry.name),
    datasets: [
      {
        label: "Clicks",
        data: topUrls.map((entry) => entry.clicks),
        backgroundColor: colors,
      },
    ],
  };

  const lineChartData = {
    labels: dailyClicksData.map((entry) => entry.date),
    datasets: [
      {
        label: "Clicks",
        data: dailyClicksData.map((entry) => entry.clicks),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Ensures integer steps
          callback: (value) => Math.floor(value), // Ensures whole numbers only
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 10,
        barThickness: 20,
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: (value) => Math.floor(value),
        },
      },
    },
  };

  if (!token) return <div className="flex items-center justify-center h-screen">No Token</div>;
  if (loading) return <div className="flex items-center justify-center h-screen">Loading dashboard data...</div>;
  if (error) return <div className="flex items-center justify-center h-screen">Error loading data</div>;

  return (
    <div className="space-y-6 ml-90 mt-10 mr-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Total Clicks</CardTitle></CardHeader><CardContent>{totalMetrics.totalClicks}</CardContent></Card>
        <Card><CardHeader><CardTitle>Average Clicks/URL</CardTitle></CardHeader><CardContent>{totalMetrics.averageClicksPerUrl}</CardContent></Card>
        <Card><CardHeader><CardTitle>Total URLs</CardTitle></CardHeader><CardContent>{totalMetrics.totalUrls}</CardContent></Card>
        <Card><CardHeader><CardTitle>New URLs (7d)</CardTitle></CardHeader><CardContent>{totalMetrics.recentUrls}</CardContent></Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Top Performing URLs</CardTitle></CardHeader>
          <CardContent className="h-80">
            <BarChart data={barChartData} options={barChartOptions} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader><CardTitle>Daily Clicks Trend</CardTitle></CardHeader>
          <CardContent className="h-80">
            <LineChart data={lineChartData} options={lineChartOptions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
