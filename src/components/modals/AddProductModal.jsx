import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function AddProductModal({ open, onOpenChange, onSave, branches }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    unit: '',
    branch: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave({
      id: `prod-${Date.now()}`,
      ...formData,
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock, 10) || 0,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} />
          <div className="grid grid-cols-2 gap-4">
            <Input name="price" placeholder="Price (₹)" type="number" value={formData.price} onChange={handleChange} />
            <Input name="stock" placeholder="Stock" type="number" value={formData.stock} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input name="unit" placeholder="Unit (e.g., Litre, 500g)" value={formData.unit} onChange={handleChange} />
            <Select onValueChange={(value) => handleSelectChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="milk">Milk</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Select onValueChange={(value) => handleSelectChange('branch', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Assign to Branch" />
            </SelectTrigger>
            <SelectContent>
              {branches.map(branch => (
                <SelectItem key={branch.id} value={branch.name}>{branch.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSave}>Save Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}