import { ShoppingCart, DollarSign, Users, TrendingUp } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { revenueDataMonthly, revenueDataWeekly, revenueDataToday, orderSummaryDataWeekly, orderSummaryDataMonthly } from '../lib/mockData';
import { DeliveryBoysCard } from '../components/DeliveryBoysCard';
import { useState } from 'react';
import { motion } from 'motion/react';

export function Dashboard() {
  const [revenueView, setRevenueView] = useState<'monthly' | 'weekly' | 'today'>('monthly');
  const [orderView, setOrderView] = useState<'weekly' | 'monthly'>('weekly');

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
        <div>
          <h2>Dashboard</h2>
          <p className="text-muted-foreground">Overview</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Reset Layout</Button>
          <Button variant="outline">Last 30 days</Button>
          <Button className="bg-red-500 hover:bg-red-600">Export Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value="2,847"
          icon={ShoppingCart}
          trend="+12.5% from last month"
        />
        <StatCard
          title="Revenue"
          value="₹1,45,230"
          icon={DollarSign}
          trend="+8.3% from last month"
        />
        <StatCard
          title="Customers"
          value="1,534"
          icon={Users}
          trend="+5.2% from last month"
        />
        <StatCard
          title="Avg Order Value"
          value="₹895"
          icon={TrendingUp}
          trend="+3.1% from last month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3>Revenue</h3>
              <p className="text-sm text-muted-foreground">Income vs Expenses analysis</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={revenueView === 'monthly' ? 'default' : 'outline'}
                onClick={() => setRevenueView('monthly')}
                className={revenueView === 'monthly' ? 'bg-gray-900 hover:bg-gray-800' : ''}
              >
                Monthly
              </Button>
              <Button
                size="sm"
                variant={revenueView === 'weekly' ? 'default' : 'outline'}
                onClick={() => setRevenueView('weekly')}
                className={revenueView === 'weekly' ? 'bg-gray-900 hover:bg-gray-800' : ''}
              >
                Weekly
              </Button>
              <Button
                size="sm"
                variant={revenueView === 'today' ? 'default' : 'outline'}
                onClick={() => setRevenueView('today')}
                className={revenueView === 'today' ? 'bg-gray-900 hover:bg-gray-800' : ''}
              >
                Today
              </Button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={getRevenueData()} key={revenueView}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#ef4444" 
                strokeWidth={2} 
                name="Income"
                animationDuration={800}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#9ca3af" 
                strokeWidth={2} 
                name="Expenses"
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3>Order Summary</h3>
              <p className="text-sm text-muted-foreground">Completed vs Pending orders</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={orderView === 'weekly' ? 'default' : 'outline'}
                onClick={() => setOrderView('weekly')}
                className={orderView === 'weekly' ? 'bg-gray-900 hover:bg-gray-800' : ''}
              >
                Weekly
              </Button>
              <Button
                size="sm"
                variant={orderView === 'monthly' ? 'default' : 'outline'}
                onClick={() => setOrderView('monthly')}
                className={orderView === 'monthly' ? 'bg-gray-900 hover:bg-gray-800' : ''}
              >
                Monthly
              </Button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getOrderData()} key={orderView}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="completed" 
                fill="#ef4444" 
                name="Completed"
                animationBegin={0}
                animationDuration={1000}
                animationEasing="ease-out"
              />
              <Bar 
                dataKey="pending" 
                fill="#9ca3af" 
                name="Pending"
                animationBegin={0}
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">Items</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">Total</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'ORD-1234', customer: 'Rajesh Kumar', items: 5, total: 425, status: 'completed' },
                  { id: 'ORD-1235', customer: 'Priya Sharma', items: 3, total: 285, status: 'completed' },
                  { id: 'ORD-1236', customer: 'Amit Patel', items: 7, total: 670, status: 'pending' },
                  { id: 'ORD-1237', customer: 'Neha Singh', items: 2, total: 190, status: 'completed' },
                ].map((order) => (
                  <tr key={order.id} className="border-b last:border-b-0">
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4">{order.items}</td>
                    <td className="py-3 px-4">₹{order.total}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={order.status === 'completed' ? 'default' : 'secondary'}
                        className={order.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}
                      >
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
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
                <div>
                  <p className="text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.sales} sales</p>
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
          <h3 className="mb-4">Top Selling Dishes</h3>
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
