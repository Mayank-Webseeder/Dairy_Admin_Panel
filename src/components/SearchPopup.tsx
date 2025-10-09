import { useState } from 'react';
import { Search, LayoutDashboard, ShoppingCart, Package, Users, Building2, Bike, Settings, Home } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { Input } from './ui/input';
import { cn } from './ui/utils';

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  page: string;
}

const searchItems: SearchItem[] = [
  { id: '1', title: 'Dashboard', subtitle: 'Overview & Analytics', icon: LayoutDashboard, page: 'dashboard' },
  { id: '2', title: 'User Management', subtitle: 'Manage users', icon: Users, page: 'users' },
  { id: '3', title: 'Branch Management', subtitle: 'Manage branches', icon: Building2, page: 'branches' },
  { id: '4', title: 'Menu Management', subtitle: 'Manage menu items', icon: Home, page: 'home-management' },
  { id: '5', title: 'Orders', subtitle: 'View all orders', icon: ShoppingCart, page: 'orders' },
  { id: '6', title: 'Products', subtitle: 'Manage products', icon: Package, page: 'products' },
  { id: '7', title: 'Customers', subtitle: 'Customer list', icon: Users, page: 'customers' },
  { id: '8', title: 'Delivery Staff', subtitle: 'Manage delivery team', icon: Bike, page: 'delivery-staff' },
  { id: '9', title: 'Settings', subtitle: 'App settings', icon: Settings, page: 'settings' },
];

interface SearchPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (page: string) => void;
}

export function SearchPopup({ open, onOpenChange, onNavigate }: SearchPopupProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredItems = query
    ? searchItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : searchItems;

  const handleSelect = (page: string) => {
    onNavigate(page);
    onOpenChange(false);
    setQuery('');
    setSelectedIndex(0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <div className="flex items-center border-b px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground mr-3" />
          <Input
            placeholder="Search modules..."
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        
        <div className="max-h-[400px] overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-muted-foreground px-3 py-2">
              {filteredItems.length} results
            </div>
            {filteredItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.page)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-blue-50 transition-colors text-left group",
                    index === selectedIndex && "bg-blue-50"
                  )}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="h-10 w-10 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                    <Icon className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t px-4 py-3 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-muted rounded">↑</kbd>
              <kbd className="px-2 py-1 bg-muted rounded">↓</kbd>
              <span className="ml-1">Navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-muted rounded">↵</kbd>
              <span className="ml-1">Open</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-muted rounded">ESC</kbd>
              <span className="ml-1">Close</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
