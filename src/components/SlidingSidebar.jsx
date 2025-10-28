import { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  ShoppingBag,
  Settings,
  LogOut,
  Bike,
  Home,
  Building2,
  UserCog,
  FileText,
  Bell,
  ChevronDown,
  TrendingUp
} from 'lucide-react';
import { cn } from '../components/ui/utils';

export function SlidingSidebar({ currentPage, onPageChange, onLogout }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openMenus, setOpenMenus] = useState({
    management: true,
    cms: false
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const managementItems = [
    { icon: ShoppingBag, label: 'Products', id: 'products' },
    { icon: ShoppingCart, label: 'Orders', id: 'orders' },
    { icon: Users, label: 'Customers', id: 'customers' },
    { icon: Building2, label: 'Branches', id: 'branches' },
    { icon: Bike, label: 'Delivery Staff', id: 'delivery-staff' },
    { icon: UserCog, label: 'User Management', id: 'user-management' },
  ];

  const cmsItems = [
    { icon: FileText, label: 'Home Page', id: 'home-page' },
  ];

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col z-50 shadow-lg",
        isExpanded ? "w-64" : "w-20"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo */}
      <div className="h-12 flex items-center px-4 border-b border-gray-200 bg-white">
        {isExpanded ? (
          <span className="text-red-500 whitespace-nowrap transition-opacity duration-300 text-sm font-semibold">
            DairyDash
          </span>
        ) : (
          <div className="h-8 w-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 mx-auto">
            <Package className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      {/* Welcome Message */}
      {isExpanded && (
        <div className="px-4 py-3 border-b border-gray-200 bg-white">
          <p className="text-xs text-gray-600">Welcome Admin!</p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        <div className="space-y-1">
          {/* Dashboard */}
          <button
            onClick={() => onPageChange('dashboard')}
            className={cn(
              "w-full flex items-center gap-3 rounded-lg transition-all duration-200 text-xs",
              isExpanded ? "px-3 py-2" : "px-0 py-2 justify-center",
              currentPage === 'dashboard'
                ? "bg-red-500 text-white" 
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <Home className={cn("h-4 w-4 flex-shrink-0 transition-colors duration-200")} />
            {isExpanded && (
              <span className="whitespace-nowrap transition-opacity duration-300">Dashboard</span>
            )}
          </button>

          {/* Management Section */}
          <div className="space-y-1">
            <button
              onClick={() => isExpanded && toggleMenu('management')}
              className={cn(
                "w-full flex items-center gap-3 rounded-lg transition-all duration-200 text-xs text-gray-600 hover:bg-gray-50",
                isExpanded ? "px-3 py-2" : "px-0 py-2 justify-center"
              )}
            >
              <UserCog className="h-4 w-4 flex-shrink-0" />
              {isExpanded && (
                <>
                  <span className="whitespace-nowrap flex-1 text-left">Management</span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openMenus.management && "rotate-180"
                  )} />
                </>
              )}
            </button>
            
            {isExpanded && openMenus.management && (
              <div className="ml-6 space-y-1">
                {managementItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => onPageChange(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-xs",
                        isActive 
                          ? "bg-red-50 text-red-600" 
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      <Icon className={cn("h-4 w-4 flex-shrink-0", isActive && "text-red-600")} />
                      <span className="whitespace-nowrap">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* CMS Section */}
          <div className="space-y-1">
            <button
              onClick={() => isExpanded && toggleMenu('cms')}
              className={cn(
                "w-full flex items-center gap-3 rounded-lg transition-all duration-200 text-xs text-gray-600 hover:bg-gray-50",
                isExpanded ? "px-3 py-2" : "px-0 py-2 justify-center"
              )}
            >
              <FileText className="h-4 w-4 flex-shrink-0" />
              {isExpanded && (
                <>
                  <span className="whitespace-nowrap flex-1 text-left">CMS</span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openMenus.cms && "rotate-180"
                  )} />
                </>
              )}
            </button>
            
            {isExpanded && openMenus.cms && (
              <div className="ml-6 space-y-1">
                {cmsItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => onPageChange(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-xs",
                        isActive 
                          ? "bg-red-50 text-red-600" 
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      <Icon className={cn("h-4 w-4 flex-shrink-0", isActive && "text-red-600")} />
                      <span className="whitespace-nowrap">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Reports */}
          <button
            onClick={() => onPageChange('reports')}
            className={cn(
              "w-full flex items-center gap-3 rounded-lg transition-all duration-200 text-xs",
              isExpanded ? "px-3 py-2" : "px-0 py-2 justify-center",
              currentPage === 'reports'
                ? "bg-red-50 text-red-600" 
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <TrendingUp className={cn("h-4 w-4 flex-shrink-0", currentPage === 'reports' && "text-red-600")} />
            {isExpanded && (
              <span className="whitespace-nowrap transition-opacity duration-300">Reports</span>
            )}
          </button>

          {/* Push Notifications */}
          <button
            onClick={() => onPageChange('notifications')}
            className={cn(
              "w-full flex items-center gap-3 rounded-lg transition-all duration-200 text-xs",
              isExpanded ? "px-3 py-2" : "px-0 py-2 justify-center",
              currentPage === 'notifications'
                ? "bg-red-50 text-red-600" 
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <Bell className={cn("h-4 w-4 flex-shrink-0", currentPage === 'notifications' && "text-red-600")} />
            {isExpanded && (
              <span className="whitespace-nowrap transition-opacity duration-300">Push Notifications</span>
            )}
          </button>

          {/* Settings */}
          <button
            onClick={() => onPageChange('updated-settings')}
            className={cn(
              "w-full flex items-center gap-3 rounded-lg transition-all duration-200 text-xs",
              isExpanded ? "px-3 py-2" : "px-0 py-2 justify-center",
              currentPage === 'updated-settings'
                ? "bg-red-50 text-red-600" 
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <Settings className={cn("h-4 w-4 flex-shrink-0", currentPage === 'updated-settings' && "text-red-600")} />
            {isExpanded && (
              <span className="whitespace-nowrap transition-opacity duration-300">Settings</span>
            )}
          </button>
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 text-xs"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {isExpanded && (
            <span className="whitespace-nowrap transition-opacity duration-300">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
}