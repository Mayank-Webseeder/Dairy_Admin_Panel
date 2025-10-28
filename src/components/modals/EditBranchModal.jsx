import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function EditBranchModal({
  open,
  onOpenChange,
  onSave,
  data,
}) {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">Edit Branch</DialogTitle>
          <DialogDescription>
            Update the branch information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Branch Information Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs">Branch Name *</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter branch name"
                  className="text-xs h-9"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-xs">City *</Label>
                <Input
                  id="city"
                  value={formData.city || ''}
                  onChange={(e) => handleChange('city', e.target.value)}
                  placeholder="Enter city"
                  className="text-xs h-9"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state" className="text-xs">State *</Label>
                <Input
                  id="state"
                  value={formData.state || ''}
                  onChange={(e) => handleChange('state', e.target.value)}
                  placeholder="Enter state"
                  className="text-xs h-9"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode" className="text-xs">Pincode *</Label>
                <Input
                  id="pincode"
                  value={formData.pincode || ''}
                  onChange={(e) => handleChange('pincode', e.target.value)}
                  placeholder="Enter pincode"
                  className="text-xs h-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-xs">Address *</Label>
              <Input
                id="address"
                value={formData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Enter full address"
                className="text-xs h-9"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactNumber" className="text-xs">Contact Number *</Label>
                <Input
                  id="contactNumber"
                  value={formData.contactNumber || ''}
                  onChange={(e) => handleChange('contactNumber', e.target.value)}
                  placeholder="+91 98765 43210"
                  className="text-xs h-9"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="manager" className="text-xs">Branch Admin *</Label>
                <Input
                  id="manager"
                  value={formData.manager || ''}
                  onChange={(e) => handleChange('manager', e.target.value)}
                  placeholder="Enter admin name"
                  className="text-xs h-9"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adminEmail" className="text-xs">Admin Email *</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={formData.adminEmail || ''}
                  onChange={(e) => handleChange('adminEmail', e.target.value)}
                  placeholder="admin@dairy.com"
                  className="text-xs h-9"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="openingHours" className="text-xs">Opening Hours</Label>
                <Input
                  id="openingHours"
                  value={formData.openingHours || ''}
                  onChange={(e) => handleChange('openingHours', e.target.value)}
                  placeholder="09:00 - 22:00"
                  className="text-xs h-9"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="seatingCapacity" className="text-xs">Seating Capacity</Label>
                <Input
                  id="seatingCapacity"
                  type="number"
                  value={formData.seatingCapacity || ''}
                  onChange={(e) => handleChange('seatingCapacity', parseInt(e.target.value) || 0)}
                  placeholder="50"
                  className="text-xs h-9"
                  min="0"
                />
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
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-9 text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 h-9 text-xs"
            >
              Update Branch
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}