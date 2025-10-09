import { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp, 
  FileText,
  Settings,
  LogOut,
  Bike,
  Home,
  Building2,
  UserCog
} from 'lucide-react';
import { cn } from '../components/ui/utils';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void; // Add this line
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'delivery-staff', label: 'Delivery Staff', icon: Bike },
  { id: 'users', label: 'User Management', icon: UserCog },
  { id: 'branches', label: 'Branch Management', icon: Building2 },
  { id: 'home-management', label: 'Home Page', icon: Home },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function SlidingSidebar({ currentPage, onPageChange, onLogout }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cn(
        "h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col",
        isExpanded ? "w-64" : "w-20"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200 px-4">
        <div className="h-10 w-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Package className="h-6 w-6 text-white" />
        </div>
        {isExpanded && (
          <span className="ml-3 text-foreground whitespace-nowrap">
            Dairy Admin
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-red-50 text-red-600" 
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <Icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-red-600")} />
                {isExpanded && (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={onLogout} // Use the onLogout prop here
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {isExpanded && (
            <span className="whitespace-nowrap">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
}