import Layout from '@/components/Layout';
import StatsCard from '@/components/StatsCard';
import IndiaMap from '@/components/IndiaMap';
import { Calendar, Users, BookOpen, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { dashboardStats } from '@/data/mockData';

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to FOSSEE Workshop Management System
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Monthly Workshops"
            value={dashboardStats.monthlyWorkshops}
            icon={<Calendar className="h-6 w-6 text-primary" />}
            description="This month"
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Upcoming Workshops"
            value={dashboardStats.upcomingWorkshops}
            icon={<BookOpen className="h-6 w-6 text-primary" />}
            description="Next 30 days"
          />
          <StatsCard
            title="Total Coordinators"
            value={dashboardStats.totalCoordinators}
            icon={<Users className="h-6 w-6 text-primary" />}
            description="Active coordinators"
          />
          <StatsCard
            title="Growth Rate"
            value="23%"
            icon={<TrendingUp className="h-6 w-6 text-primary" />}
            description="Workshop participation"
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Charts and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Workshop Types Chart */}
          <div className="bg-gradient-card rounded-lg border shadow-card p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Workshop Types</h3>
              <p className="text-sm text-muted-foreground">
                Distribution of workshop categories
              </p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dashboardStats.workshopTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dashboardStats.workshopTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* India Map */}
          <IndiaMap />
        </div>

        {/* Recent Activity */}
        <div className="bg-gradient-card rounded-lg border shadow-card p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              {
                action: 'Workshop Accepted',
                description: 'Python for Scientific Computing in Mumbai',
                time: '2 hours ago',
                type: 'success'
              },
              {
                action: 'New Workshop Request',
                description: 'Blockchain Technology in Hyderabad',
                time: '4 hours ago',
                type: 'info'
              },
              {
                action: 'Workshop Postponed',
                description: 'Data Science with R in Delhi',
                time: '1 day ago',
                type: 'warning'
              }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  item.type === 'success' ? 'bg-accepted' :
                  item.type === 'warning' ? 'bg-warning' :
                  'bg-primary'
                }`} />
                <div className="flex-1">
                  <p className="font-medium">{item.action}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;