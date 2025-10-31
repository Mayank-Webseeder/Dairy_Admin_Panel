import { ShoppingCart, DollarSign, Users, TrendingUp, Download, Calendar, ChevronDown } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { revenueDataMonthly, revenueDataWeekly, revenueDataToday, orderSummaryDataWeekly, orderSummaryDataMonthly, getTotalOrdersCount, getTotalRevenue, getTotalCustomersCount, getAverageOrderValue } from '../lib/mockData';
import { DeliveryBoysCard } from '../components/DeliveryBoysCard';
import { useState } from 'react';
import { motion } from 'motion/react';

export function Dashboard() {
  const [revenueView, setRevenueView] = useState('monthly');
  const [orderView, setOrderView] = useState('weekly');

  const getRevenueData = () => {
    switch (revenueView) {
      case 'monthly':
        return revenueDataMonthly;
      case 'weekly':
        return revenueDataWeekly;
      case 'today':
        return revenueDataToday;
      default:
        return revenueDataMonthly;
    }
  };

  const getOrderData = () => {
    return orderView === 'weekly' ? orderSummaryDataWeekly : orderSummaryDataMonthly;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" className="transition-all duration-200">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
          <Button className="bg-red-500 hover:bg-red-600 transition-all duration-200">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={getTotalOrdersCount().toString()}
          icon={ShoppingCart}
        />
        <StatCard
          title="Revenue"
          value={`₹${getTotalRevenue().toLocaleString('en-IN')}`}
          icon={DollarSign}
        />
        <StatCard
          title="Customers"
          value={getTotalCustomersCount().toString()}
          icon={Users}
        />
        <StatCard
          title="Avg Order Value"
          value={`₹${getAverageOrderValue()}`}
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3>Revenue</h3>
              <p className="text-sm text-muted-foreground">Income vs Expenses analysis</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={revenueView === 'monthly' ? 'default' : 'outline'}
                onClick={() => setRevenueView('monthly')}
                className={revenueView === 'monthly' ? 'bg-gray-900 hover:bg-gray-800 transition-all duration-200' : 'transition-all duration-200'}
              >
                Monthly
              </Button>
              <Button
                size="sm"
                variant={revenueView === 'weekly' ? 'default' : 'outline'}
                onClick={() => setRevenueView('weekly')}
                className={revenueView === 'weekly' ? 'bg-gray-900 hover:bg-gray-800 transition-all duration-200' : 'transition-all duration-200'}
              >
                Weekly
              </Button>
              <Button
                size="sm"
                variant={revenueView === 'today' ? 'default' : 'outline'}
                onClick={() => setRevenueView('today')}
                className={revenueView === 'today' ? 'bg-gray-900 hover:bg-gray-800 transition-all duration-200' : 'transition-all duration-200'}
              >
                Today
              </Button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={getRevenueData()} key={revenueView}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip
                contentStyle={{ fontSize: '11px' }}
                labelStyle={{ fontSize: '11px' }}
              />
              <Legend
                iconType="circle"
                wrapperStyle={{ fontSize: '11px' }}
                iconSize={8}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#9ca3af"
                strokeWidth={2}
                name="Expenses"
                animationDuration={800}
                animationBegin={0}
                dot={{ r: 3, animationBegin: 800, animationDuration: 400 }}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#ef4444"
                strokeWidth={2}
                name="Income"
                animationDuration={800}
                animationBegin={0}
                dot={{ r: 3, animationBegin: 800, animationDuration: 400 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3>Order Summary</h3>
              <p className="text-sm text-muted-foreground">Completed vs Pending orders</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={orderView === 'weekly' ? 'default' : 'outline'}
                onClick={() => setOrderView('weekly')}
                className={orderView === 'weekly' ? 'bg-gray-900 hover:bg-gray-800 transition-all duration-200' : 'transition-all duration-200'}
              >
                Weekly
              </Button>
              <Button
                size="sm"
                variant={orderView === 'monthly' ? 'default' : 'outline'}
                onClick={() => setOrderView('monthly')}
                className={orderView === 'monthly' ? 'bg-gray-900 hover:bg-gray-800 transition-all duration-200' : 'transition-all duration-200'}
              >
                Monthly
              </Button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={getOrderData()} key={orderView}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip
                contentStyle={{ fontSize: '11px' }}
                labelStyle={{ fontSize: '11px' }}
              />
              <Legend
                iconType="circle"
                wrapperStyle={{ fontSize: '11px' }}
                iconSize={8}
              />
              <Bar
                dataKey="completed"
                fill="#ef4444"
                name="Completed"
                animationBegin={0}
                animationDuration={1000}
                animationEasing="ease-out"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="pending"
                fill="#9ca3af"
                name="Pending"
                animationBegin={0}
                animationDuration={1000}
                animationEasing="ease-out"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 transition-all duration-200 hover:shadow-md">
          <h3 className="mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">Items</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">Total</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">Time</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '1234', customer: 'Rajesh Kumar', items: 5, total: 425, status: 'completed', time: '10:30 AM' },
                  { id: '1235', customer: 'Priya Sharma', items: 3, total: 285, status: 'completed', time: '11:45 AM' },
                  { id: '1236', customer: 'Amit Patel', items: 7, total: 670, status: 'pending', time: '12:15 PM' },
                  { id: '1237', customer: 'Neha Singh', items: 2, total: 190, status: 'completed', time: '01:20 PM' },
                ].map((order) => {
                  const initials = order.customer.split(' ').map(n => n[0]).join('');
                  return (
                    <tr key={order.id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-3 px-4">
                        <span className="text-red-500">#</span>
                        <span className="text-red-500">{order.id}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gray-900 text-white text-xs">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <span>{order.customer}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{order.items}</td>
                      <td className="py-3 px-4">₹{order.total}</td>
                      <td className="py-3 px-4 text-muted-foreground">{order.time}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="secondary"
                          className={order.status === 'completed'
                            ? 'bg-green-50 text-green-700 hover:bg-green-50'
                            : 'bg-orange-50 text-orange-700 hover:bg-orange-50'}
                        >
                          {order.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4">Top Products</h3>
          <div className="space-y-4">
            {[
              { name: 'Full Cream Milk', sales: 234, change: '+12%' },
              { name: 'Paneer', sales: 189, change: '+8%' },
              { name: 'Fresh Curd', sales: 156, change: '+15%' },
              { name: 'Ghee', sales: 142, change: '+5%' },
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded bg-red-50 text-red-600">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                  </div>
                </div>
                <span className="text-sm text-green-600">{product.change}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DeliveryBoysCard />
       
        <Card className="p-6">
          <h3 className="mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            {[
              { name: 'Full Cream Milk', orders: 328, revenue: 4920 },
              { name: 'Paneer', orders: 287, revenue: 5805 },
              { name: 'Fresh Curd', orders: 245, revenue: 3675 },
              { name: 'Ghee', orders: 212, revenue: 3180 },
              { name: 'Toned Milk', orders: 198, revenue: 2970 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded bg-red-50 text-red-600">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.orders} orders</p>
                  </div>
                </div>
                <p>₹{item.revenue.toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}