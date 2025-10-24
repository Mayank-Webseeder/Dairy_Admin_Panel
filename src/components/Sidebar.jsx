import { Home, ShoppingBag, ShoppingCart, Users, Building2, Bike, Settings, LifeBuoy } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', page: 'dashboard' },
  { icon: ShoppingBag, label: 'Products', page: 'products' },
  { icon: ShoppingCart, label: 'Orders', page: 'orders' },
  { icon: Users, label: 'Customers', page: 'customers' },
  { icon: Building2, label: 'Branches', page: 'branches' },
  { icon: Bike, label: 'Delivery Staff', page: 'delivery-staff' },
];

const secondaryMenuItems = [
  { icon: Settings, label: 'Settings', page: 'settings' },
  { icon: LifeBuoy, label: 'Support', page: 'support' },
];

export function Sidebar({ currentPage, setCurrentPage }) {
  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-500">DairyDash</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.page}
            onClick={() => setCurrentPage(item.page)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
              currentPage === item.page
                ? 'bg-red-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="px-4 py-6 space-y-2">
        {secondaryMenuItems.map((item) => (
           <button
            key={item.page}
            onClick={() => setCurrentPage(item.page)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
              currentPage === item.page
                ? 'bg-red-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
}