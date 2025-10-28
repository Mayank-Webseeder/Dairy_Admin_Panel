import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export function CustomerDetailsModal({ open, onOpenChange, customer }) {
  const initials = customer.name.split(' ').map(n => n[0]).join('').substring(0, 2);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
          <DialogDescription>
            Customer ID: {customer.id}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">

          <div className="grid grid-cols-2 gap-6">
            {/* Left Column - Customer Profile */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <span>👤</span> Customer Profile
              </h3>
              
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl font-medium">{initials}</span>
                </div>
                <div>
                  <p className="font-medium">{customer.name}</p>
                  <Badge className="text-xs mt-1" style={{ backgroundColor: '#e8f5e9', color: '#2e7d32' }}>
                    {customer.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">📧</span>
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">📞</span>
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">📍</span>
                  <span>{customer.branch || 'No branch assigned'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">📅</span>
                  <span>Joined: {new Date(customer.joinDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-xs font-medium text-yellow-800">Notes: Frequent business traveler</p>
              </div>
            </div>

            {/* Right Column - Branch Activity */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <span>🏪</span> Branch Activity
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-xs font-medium">Airport Branch</span>
                  <div className="text-right">
                    <p className="text-xs font-semibold">28 orders</p>
                    <p className="text-xs text-muted-foreground">SAR 3890.20</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-xs font-medium">Downtown Branch</span>
                  <div className="text-right">
                    <p className="text-xs font-semibold">12 orders</p>
                    <p className="text-xs text-muted-foreground">SAR 1567.40</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-xs font-medium">Mall Branch</span>
                  <div className="text-right">
                    <p className="text-xs font-semibold">5 orders</p>
                    <p className="text-xs text-muted-foreground">SAR 777.20</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <span>📊</span> Order Summary
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded text-center">
                  <p className="text-2xl font-semibold">{customer.totalOrders}</p>
                  <p className="text-xs text-muted-foreground">Total Orders</p>
                </div>
                <div className="bg-gray-50 p-3 rounded text-center">
                  <p className="text-2xl font-semibold">₹{customer.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Spend</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded text-center">
                  <p className="text-lg font-semibold">₹{Math.round(customer.totalSpent / customer.totalOrders)}</p>
                  <p className="text-xs text-muted-foreground">Avg Order</p>
                </div>
                <div className="bg-gray-50 p-3 rounded text-center">
                  <p className="text-lg font-semibold">{customer.totalOrders * 234}</p>
                  <p className="text-xs text-muted-foreground">Loyalty Points</p>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <span>🛒</span> Recent Orders
              </h3>
              <div className="space-y-1.5">
                <div className="p-2 bg-gray-50 rounded">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">ORD-2025-089</span>
                    <Badge className="text-[10px] h-4" style={{ backgroundColor: '#e8f5e9', color: '#2e7d32' }}>
                      In Progress
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">23 Sep 2025, 12:15 PM</span>
                    <span className="text-xs font-semibold">₹234.50</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">Airport Branch</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">ORD-2025-076</span>
                    <Badge className="text-[10px] h-4" style={{ backgroundColor: '#e8f5e9', color: '#2e7d32' }}>
                      Completed
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">21 Sep 2025, 05:30 PM</span>
                    <span className="text-xs font-semibold">₹189.75</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">Airport Branch</p>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">ORD-2025-063</span>
                    <Badge className="text-[10px] h-4" style={{ backgroundColor: '#e8f5e9', color: '#2e7d32' }}>
                      Completed
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">19 Sep 2025, 04:45 PM</span>
                    <span className="text-xs font-semibold">₹156.20</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">Airport Branch</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Preferred Payment:</span> Credit Card
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="font-medium">Last Order:</span> {customer.lastOrderDate ? new Date(customer.lastOrderDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Never'}
            </p>
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300 h-9 text-xs"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}