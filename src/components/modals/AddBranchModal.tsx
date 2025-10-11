import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Branch } from '../../types';

interface AddBranchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (branch: Partial<Branch>) => void;
}

export function AddBranchModal({ open, onOpenChange, onSave }: AddBranchModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    pincode: '',
    address: '',
    contactNumber: '',
    branchAdmin: '',
    adminEmail: '',
    openingHours: '',
    seatingCapacity: '',
    status: 'active' as 'active' | 'inactive',
  });

  const handleSubmit = () => {
    const newBranch: Partial<Branch> = {
      id: Date.now().toString(),
      name: formData.name,
      location: `${formData.city}, ${formData.state}`,
      manager: formData.branchAdmin,
      orders: 0,
      revenue: 0,
      status: formData.status,
    };
    onSave(newBranch);
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      city: '',
      state: '',
      pincode: '',
      address: '',
      contactNumber: '',
      branchAdmin: '',
      adminEmail: '',
      openingHours: '',
      seatingCapacity: '',
      status: 'active',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Branch</DialogTitle>
          <DialogDescription>
            Enter the branch details below to add a new location to your business.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Branch Name *</Label>
            <Input
              placeholder="Enter branch name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>City *</Label>
            <Input
              placeholder="Enter city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>State *</Label>
            <Input
              placeholder="Enter state"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Pincode *</Label>
            <Input
              placeholder="Enter pincode"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            />
          </div>

          <div className="col-span-2 space-y-2">
            <Label>Address *</Label>
            <Textarea
              placeholder="Enter complete address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Contact Number *</Label>
            <Input
              placeholder="+91 XXX XX XXXX"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Branch Admin *</Label>
            <Input
              placeholder="Admin name"
              value={formData.branchAdmin}
              onChange={(e) => setFormData({ ...formData, branchAdmin: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Admin Email *</Label>
            <Input
              type="email"
              placeholder="admin@example.com"
              value={formData.adminEmail}
              onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Opening Hours</Label>
            <Input
              placeholder="09:00 - 22:00"
              value={formData.openingHours}
              onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Seating Capacity</Label>
            <Input
              type="number"
              placeholder="Enter capacity"
              value={formData.seatingCapacity}
              onChange={(e) => setFormData({ ...formData, seatingCapacity: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Add Branch
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}