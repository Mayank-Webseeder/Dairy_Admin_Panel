import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ShoppingCart, DollarSign, Users, Building2, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function Reports() {
  const [branch, setBranch] = useState('all');
  const [dateRange, setDateRange] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalOrders: 12847,
    totalRevenue: 456720.50,
    totalCustomers: 8542,
    activeBranches: 4,
  };

  const branchPerformance = [
    { name: 'Downtown', revenue: 185420.00, orders: 3240, growth: '+12.5%' },
    { name: 'Mall', revenue: 142680.00, orders: 2890, growth: '+12.5%' },
    { name: 'Airport', revenue: 98340.00, orders: 1890, growth: '+12.5%' },
    { name: 'Marina', revenue: 89280.00, orders: 1720, growth: '+12.5%' },
  ];

  const revenueByBranch = [
    { name: 'Downtown', revenue: 185000 },
    { name: 'Mall', revenue: 142000 },
    { name: 'Airport', revenue: 98000 },
    { name: 'Marina', revenue: 95000 },
  ];

  const topSellingDishes = [
    { name: 'Margherita Pizza', value: 1240, color: '#EF5350' },
    { name: 'Chicken Burger', value: 890, color: '#26C6DA' },
    { name: 'Caesar Salad', value: 720, color: '#42A5F5' },
    { name: 'Biryani', value: 650, color: '#FFA726' },
    { name: 'Shawarma', value: 580, color: '#AB47BC' },
  ];

  const highValueCustomers = [
    { initials: 'AAM', name: 'Ahmed Al Mansouri', revenue: 3456.50, orders: 24, vip: true },
    { initials: 'SJ', name: 'Sarah Johnson', revenue: 2890.25, orders: 18, vip: true },
    { initials: 'MH', name: 'Mohammed Hassan', revenue: 2654.80, orders: 22, vip: true },
    { initials: 'EW', name: 'Emily Wilson', revenue: 2340.90, orders: 15, vip: true },
  ];

  const newVsReturningData = [
    { name: 'New', value: 2845, color: '#4DD0E1' },
    { name: 'Returning', value: 5697, color: '#26C6DA' },
  ];

  const ordersByStatus = [
    { status: 'Completed', count: 11240, percentage: '87.5%', color: '#10B981' },
    { status: 'Pending', count: 890, percentage: '6.9%', color: '#F59E0B' },
    { status: 'Cancelled', count: 717, percentage: '5.6%', color: '#EF4444' },
  ];

  const peakHoursData = [
    { hour: '9 AM', orders: 55 },
    { hour: '10 AM', orders: 75 },
    { hour: '11 AM', orders: 95 },
    { hour: '12 PM', orders: 145 },
    { hour: '1 PM', orders: 165 },
    { hour: '2 PM', orders: 125 },
    { hour: '3 PM', orders: 95 },
    { hour: '4 PM', orders: 85 },
    { hour: '5 PM', orders: 105 },
    { hour: '6 PM', orders: 135 },
    { hour: '7 PM', orders: 175 },
    { hour: '8 PM', orders: 185 },
    { hour: '9 PM', orders: 155 },
    { hour: '10 PM', orders: 105 },
  ];

  const salesTrendData = [
    { date: 'Sep 23', sales: 12000, profit: 2300 },
    { date: 'Sep 24', sales: 14500, profit: 2800 },
    { date: 'Sep 25', sales: 17800, profit: 3100 },
    { date: 'Sep 26', sales: 13200, profit: 2650 },
    { date: 'Sep 27', sales: 18500, profit: 3400 },
    { date: 'Sep 28', sales: 21800, profit: 4200 },
    { date: 'Sep 29', sales: 17500, profit: 3550 },
  ];

  const handleApplyFilters = () => {
    console.log('Applying filters:', { branch, dateRange });
  };

  const handleExport = () => {
    console.log('Exporting report data...');
  };

  const handleExportCSV = () => {
    console.log('Exporting CSV...');
  };

  const handleRefresh = () => {
    console.log('Refreshing data...');
  };

  return (
    <div className="p-4">
      {/* Header Controls */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger className="w-40 h-9 text-xs border border-gray-300">
              <SelectValue placeholder="All Branches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">All Branches</SelectItem>
              <SelectItem value="downtown" className="text-xs">Downtown</SelectItem>
              <SelectItem value="mall" className="text-xs">Mall</SelectItem>
              <SelectItem value="airport" className="text-xs">Airport</SelectItem>
              <SelectItem value="marina" className="text-xs">Marina</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-36 h-9 text-xs border border-gray-300">
              <SelectValue placeholder="This Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today" className="text-xs">Today</SelectItem>
              <SelectItem value="week" className="text-xs">This Week</SelectItem>
              <SelectItem value="month" className="text-xs">This Month</SelectItem>
              <SelectItem value="quarter" className="text-xs">This Quarter</SelectItem>
              <SelectItem value="year" className="text-xs">This Year</SelectItem>
              <SelectItem value="custom" className="text-xs">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            onClick={handleApplyFilters}
            className="h-9 text-xs bg-blue-500 hover:bg-blue-600"
          >
            🔍 Apply Filters
          </Button>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="h-9 text-xs border border-gray-300"
          >
            🔄 Refresh
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="h-9 text-xs bg-red-500 text-white hover:bg-red-600 border border-red-500"
          >
            <Download className="h-3 w-3 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Orders</p>
              <h3 className="text-lg">{stats.totalOrders.toLocaleString()}</h3>
            </div>
            <div className="h-9 w-9 bg-blue-50 rounded-full flex items-center justify-center">
              <ShoppingCart className="h-4 w-4 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
              <h3 className="text-lg">₹{stats.totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="h-9 w-9 bg-red-50 rounded-full flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-red-500" />
            </div>
          </div>
        </Card>

        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Customers</p>
              <h3 className="text-lg">{stats.totalCustomers.toLocaleString()}</h3>
            </div>
            <div className="h-9 w-9 bg-green-50 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Active Branches</p>
              <h3 className="text-lg">{stats.activeBranches}</h3>
            </div>
            <div className="h-9 w-9 bg-purple-50 rounded-full flex items-center justify-center">
              <Building2 className="h-4 w-4 text-purple-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            📊 Overview
          </TabsTrigger>
          <TabsTrigger value="sales" className="text-xs data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            📈 Sales Reports
          </TabsTrigger>
          <TabsTrigger value="customers" className="text-xs data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            👥 Customer Reports
          </TabsTrigger>
          <TabsTrigger value="orders" className="text-xs data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            📦 Order Reports
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Revenue by Branch */}
            <Card className="p-6">
              <h3 className="font-medium mb-4">Revenue by Branch</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueByBranch}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Top Selling Dishes */}
            <Card className="p-6">
              <h3 className="font-medium mb-4">Top Selling Dishes</h3>
              <div className="flex items-center justify-between">
                <ResponsiveContainer width="50%" height={300}>
                  <PieChart>
                    <Pie
                      data={topSellingDishes}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {topSellingDishes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {topSellingDishes.map((dish, index) => (
                    <div key={index} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dish.color }} />
                        <span className="text-xs">{dish.name}</span>
                      </div>
                      <span className="text-xs font-medium">{dish.value} orders</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sales Trend */}
          <Card className="p-6">
            <h3 className="font-medium mb-4">Sales Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Sales Reports Tab */}
        <TabsContent value="sales" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Branch Performance */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Branch Performance</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-8"
                  onClick={handleExportCSV}
                >
                  Export CSV
                </Button>
              </div>
              <div className="space-y-3">
                {branchPerformance.map((branch, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{branch.name}</h4>
                        <p className="text-xs text-muted-foreground">{branch.orders} orders</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{branch.revenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                        <p className="text-xs text-green-600">{branch.growth}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Average Order Value */}
            <Card className="p-6">
              <h3 className="font-medium mb-4">Average Order Value</h3>
              <div className="text-center py-6">
                <h2 className="text-4xl font-bold text-blue-600 mb-2">₹89.50</h2>
                <p className="text-xs text-green-600 mb-6">📈 +8.2% from last month</p>
                <div className="space-y-2 text-left mt-8">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Highest AOV:</span>
                    <span className="font-medium">Downtown Branch - ₹125.80</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Lowest AOV:</span>
                    <span className="font-medium">Marina Branch - ₹67.20</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Customer Reports Tab */}
        <TabsContent value="customers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* New vs Returning Customers */}
            <Card className="p-6">
              <h3 className="font-medium mb-4">New vs Returning Customers</h3>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={newVsReturningData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={130}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {newVsReturningData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* High-Value Customers */}
            <Card className="p-6">
              <h3 className="font-medium mb-4">High-Value Customers</h3>
              <div className="space-y-3">
                {highValueCustomers.map((customer, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-blue-600">{customer.initials}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{customer.name}</h4>
                        <p className="text-xs text-muted-foreground">{customer.orders} orders</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">₹{customer.revenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                        {customer.vip && (
                          <span className="inline-flex items-center gap-1 text-xs text-yellow-600">
                            ⭐ VIP
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Order Reports Tab */}
        <TabsContent value="orders" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Orders by Status */}
            <Card className="p-6">
              <h3 className="font-medium mb-6">Orders by Status</h3>
              <div className="space-y-4">
                {ordersByStatus.map((status, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: status.color }}
                      />
                      <span className="text-sm">{status.status}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">{status.count.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground w-12 text-right">{status.percentage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Peak Hours */}
            <Card className="p-6">
              <h3 className="font-medium mb-4">Peak Hours</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={peakHoursData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis 
                    dataKey="hour" 
                    tick={{ fontSize: 10 }} 
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}