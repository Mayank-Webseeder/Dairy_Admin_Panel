import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  Settings,
  Home,
  Milk,
  TrendingUp,
  FileText
} from 'lucide-react';
import { cn } from './ui/utils';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ currentPage, onPageChange }) {
  return (
    <aside className="w-64 bg-white border-r border-border h-screen sticky top-0 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-red-500 rounded-lg flex items-center justify-center">
            <Milk className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg">DairyDash</h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
                isActive 
                  ? "bg-red-50 text-red-600" 
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="bg-red-50 rounded-lg p-4">
          <Home className="h-5 w-5 text-red-500 mb-2" />
          <p className="text-sm mb-1">Need Help?</p>
          <p className="text-xs text-muted-foreground mb-3">
            Check our documentation
          </p>
          <button className="text-xs text-red-600 hover:text-red-700">
            Learn More →
          </button>
        </div>
      </div>
    </aside>
  );
}