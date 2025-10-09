import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Upload, X } from 'lucide-react';
import { Product } from '../../types';

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (product: Partial<Product>) => void;
  branches: { id: string; name: string }[];
}

export function AddProductModal({ open, onOpenChange, onSave, branches }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    cost: '',
    preparationTime: '',
    calories: '',
    description: '',
    branch: '',
    availableForOrder: true,
    vegetarian: false,
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const newProduct: Partial<Product> = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: 100, // Default stock
      unit: '1 unit',
      image: imagePreview || undefined,
    };
    onSave(newProduct);
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      cost: '',
      preparationTime: '',
      calories: '',
      description: '',
      branch: '',
      availableForOrder: true,
      vegetarian: false,
    });
    setImagePreview('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Dish</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Dish Name *</Label>
            <Input
              placeholder="Enter dish name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Milk">Milk</SelectItem>
                <SelectItem value="Dairy">Dairy</SelectItem>
                <SelectItem value="Beverages">Beverages</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Price *</Label>
            <Input
              type="number"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Cost *</Label>
            <Input
              type="number"
              placeholder="0.00"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Preparation Time (minutes)</Label>
            <Input
              type="number"
              placeholder="15"
              value={formData.preparationTime}
              onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Calories</Label>
            <Input
              type="number"
              placeholder="250"
              value={formData.calories}
              onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
            />
          </div>

          <div className="col-span-2 space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Enter dish description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Branch *</Label>
            <Select value={formData.branch} onValueChange={(value) => setFormData({ ...formData, branch: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Product Image</Label>
            <div className="flex gap-2">
              <label className="flex-1 cursor-pointer">
                <div className="border-2 border-dashed rounded-lg p-3 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Upload className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Upload Image</span>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
              {imagePreview && (
                <div className="relative h-12 w-12">
                  <img src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                  <button
                    onClick={() => setImagePreview('')}
                    className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <X className="h-3 w-3 text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="availableForOrder"
                checked={formData.availableForOrder}
                onChange={(e) => setFormData({ ...formData, availableForOrder: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="availableForOrder" className="cursor-pointer">Available for order</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="vegetarian"
                checked={formData.vegetarian}
                onChange={(e) => setFormData({ ...formData, vegetarian: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="vegetarian" className="cursor-pointer">Vegetarian</Label>
            </div>
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
            Add Dish
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
