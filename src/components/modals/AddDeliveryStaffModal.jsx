import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { User } from 'lucide-react';

export function AddDeliveryStaffModal({ open, onOpenChange, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch: '',
    status: 'active',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newStaff = {
      ...formData,
      id: `DS-${Date.now()}`,
      joinedDate: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      orders: 0,
      rating: 0,
      completedOrders: 0,
      currentOrders: 0,
      weekOrders: 0,
      avgDeliveryTime: '0m',
    };

    onSave(newStaff);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      branch: '',
      status: 'active',
      rating: 4.5,
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">Add New Delivery Staff</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new delivery staff member to your team.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-2 py-4">
            <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="h-10 w-10 text-gray-400" />
            </div>
            <Button type="button" variant="outline" className="text-xs h-8">
              📤 Upload Photo
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs">Name *</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter staff name"
              className="text-xs h-9"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="staff@company.com"
              className="text-xs h-9"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs">Phone *</Label>
            <Input
              id="phone"
              value={formData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+971 50 123-4567"
              className="text-xs h-9"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="branch" className="text-xs">Assigned Branch</Label>
            <Select value={formData.branch || ''} onValueChange={(value) => handleChange('branch', value)}>
              <SelectTrigger className="text-xs h-9">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Downtown Branch" className="text-xs">Downtown Branch</SelectItem>
                <SelectItem value="Mall Branch" className="text-xs">Mall Branch</SelectItem>
                <SelectItem value="Airport Branch" className="text-xs">Airport Branch</SelectItem>
                <SelectItem value="Marina Branch" className="text-xs">Marina Branch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-xs">Status</Label>
            <Select 
              value={formData.status || 'active'} 
              onValueChange={(value) => handleChange('status', value)}
            >
              <SelectTrigger className="text-xs h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active" className="text-xs">Active</SelectItem>
                <SelectItem value="inactive" className="text-xs">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating" className="text-xs">Initial Rating</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">0.0</span>
                <span className="font-medium text-xs">{(formData.rating || 4.5).toFixed(1)} ⭐</span>
                <span className="text-xs text-muted-foreground">5.0</span>
              </div>
              <Slider
                value={[formData.rating || 4.5]}
                onValueChange={(value) => handleChange('rating', value[0])}
                min={0}
                max={5}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-9 text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 h-9 text-xs"
            >
              Add Staff
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}