import { useState } from 'react';
import { Search, Plus, Filter, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { products as initialProducts, branches } from '../lib/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Product } from '../types';
import { AddProductModal } from '../components/modals/AddProductModal';
import { EditModal } from '../components/modals/EditModal';
import { DeleteConfirmationModal } from '../components/modals/DeleteConfirmationModal';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Products() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = productList.filter(p => {
    const matchesBranch = selectedBranch === 'all' || p.branch === selectedBranch;
    const matchesCategory = selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesBranch && matchesCategory;
  });

  const handleAddProduct = (product: Partial<Product>) => {
    setProductList([...productList, product as Product]);
  };

  const handleEditProduct = (updatedData: Product) => {
    setProductList(productList.map(p => p.id === updatedData.id ? updatedData : p));
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setProductList(productList.filter(p => p.id !== selectedProduct.id));
      setSelectedProduct(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Products</h2>
          <p className="text-muted-foreground">Manage your dairy products</p>
        </div>
        <Button 
          className="bg-red-500 hover:bg-red-600"
          onClick={() => setAddModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-10" />
          </div>
          
          {/* Branch Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm whitespace-nowrap">Branch:</span>
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger className="w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.name}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="milk">Milk</SelectItem>
              <SelectItem value="dairy">Dairy</SelectItem>
              <SelectItem value="beverages">Beverages</SelectItem>
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
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Product</th>
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Category</th>
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Price</th>
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Stock</th>
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Unit</th>
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Branch</th>
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b last:border-b-0 hover:bg-muted/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {product.image ? (
                        <ImageWithFallback 
                          src={product.image} 
                          alt={product.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-red-50 rounded-lg flex items-center justify-center">
                          <span className="text-xs text-red-500">{product.name[0]}</span>
                        </div>
                      )}
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">₹{product.price}</td>
                  <td className="py-3 px-4">{product.stock}</td>
                  <td className="py-3 px-4">{product.unit}</td>
                  <td className="py-3 px-4">{product.branch || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={product.stock > 50 ? 'default' : 'secondary'}
                      className={
                        product.stock > 50 
                          ? 'bg-[#e8f5e9] text-[#2e7d32] border-[#2e7d32]/20 hover:bg-[#e8f5e9] text-[10px] h-5' 
                          : product.stock > 20
                          ? 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-50 text-[10px] h-5'
                          : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-100 text-[10px] h-5'
                      }
                    >
                      {product.stock > 50 ? 'In Stock' : product.stock > 20 ? 'Low Stock' : 'Out of Stock'}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => {
                          setSelectedProduct(product);
                          setEditModalOpen(true);
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                        onClick={() => {
                          setSelectedProduct(product);
                          setDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Showing 1-{filteredProducts.length} of {filteredProducts.length} products
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>

      <AddProductModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onSave={handleAddProduct}
        branches={branches.map(b => ({ id: b.name, name: b.name }))}
      />

      {selectedProduct && (
        <>
          <EditModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            onSave={handleEditProduct}
            data={selectedProduct}
            title="Edit Product"
            fields={[
              { key: 'name', label: 'Product Name' },
              { key: 'category', label: 'Category' },
              { key: 'price', label: 'Price (₹)', type: 'number' },
              { key: 'stock', label: 'Stock', type: 'number' },
              { key: 'unit', label: 'Unit' },
            ]}
          />

          <DeleteConfirmationModal
            open={deleteModalOpen}
            onOpenChange={setDeleteModalOpen}
            onConfirm={handleDeleteProduct}
            title="Are you sure you want to delete?"
            description="This product will be permanently removed from your inventory."
          />
        </>
      )}
    </div>
  );
}