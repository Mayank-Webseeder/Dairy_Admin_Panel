import { Search, UserPlus, Filter, Mail, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { customers } from '../lib/mockData';

export function Customers() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Customers</h2>
          <p className="text-muted-foreground">Manage your customer base</p>
        </div>
        <Button className="bg-red-500 hover:bg-red-600">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search customers..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Customer</th>
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Contact</th>
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Total Orders</th>
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Total Spent</th>
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Join Date</th>
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => {
                const initials = customer.name.split(' ').map(n => n[0]).join('');
                return (
                  <tr key={customer.id} className="border-b last:border-b-0 hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-red-100 text-red-600">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p>{customer.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </p>
                    </td>
                    <td className="py-3 px-4">{customer.totalOrders}</td>
                    <td className="py-3 px-4">₹{customer.totalSpent.toLocaleString()}</td>
                    <td className="py-3 px-4">{new Date(customer.joinDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Showing 1-{customers.length} of {customers.length} customers
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
