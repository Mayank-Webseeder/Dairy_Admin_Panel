import { Search, Filter, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { orders } from '../lib/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export function Orders() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Orders</h2>
          <p className="text-muted-foreground">Manage all your orders</p>
        </div>
        <Button className="bg-red-500 hover:bg-red-600">
          <Download className="h-4 w-4 mr-2" />
          Export Orders
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search orders..." className="pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Order ID</th>
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Customer</th>
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Items</th>
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Total</th>
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b last:border-b-0 hover:bg-muted/50">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{order.customerName}</td>
                  <td className="py-3 px-4">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{order.items}</td>
                  <td className="py-3 px-4">₹{order.total}</td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={order.status === 'completed' ? 'default' : 'secondary'}
                      className={
                        order.status === 'completed'
                          ? 'bg-green-500'
                          : order.status === 'pending'
                          ? 'bg-yellow-500'
                          : 'bg-gray-500'
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Showing 1-{orders.length} of {orders.length} orders
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
