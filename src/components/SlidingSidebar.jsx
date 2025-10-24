import { Home, ShoppingBag, ShoppingCart, Users, Building2, Bike, Settings, LifeBuoy, X, ChevronDown, UserCog, FileText, MonitorPlay } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const menuItems = [
  { icon: Home, label: 'Dashboard', page: 'dashboard' },
  {
    icon: UserCog,
    label: 'Management',
    subItems: [
      { icon: ShoppingBag, label: 'Products', page: 'products' },
      { icon: ShoppingCart, label: 'Orders', page: 'orders' },
      { icon: Users, label: 'Customers', page: 'customers' },
      { icon: Building2, label: 'Branches', page: 'branches' },
      { icon: Bike, label: 'Delivery Staff', page: 'delivery-staff' },
      { icon: Users, label: 'User Management', page: 'user-management' },
    ],
  },
  {
    icon: MonitorPlay,
    label: 'CMS',
    subItems: [
        { icon: FileText, label: 'Home Page', page: 'home-page' },
    ]
  }
];

export function SlidingSidebar({ isOpen, setIsOpen, currentPage, setCurrentPage }) {
  const [openMenu, setOpenMenu] = useState('Management');

  const handleNavigation = (page) => {
    setCurrentPage(page);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };
  
  const NavLink = ({ item }) => {
    const isSelected = currentPage === item.page;
    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleNavigation(item.page);
        }}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
          isSelected
            ? 'bg-red-500 text-white shadow-sm'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <item.icon className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
        <span className="font-medium">{item.label}</span>
      </a>
    );
  };

  const CollapsibleMenu = ({ item }) => {
    const isOpen = openMenu === item.label;
    return (
      <div>
        <button
          onClick={() => setOpenMenu(isOpen ? null : item.label)}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <item.icon className="h-4 w-4 text-gray-500" />
            <span className="font-medium">{item.label}</span>
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pl-8"
            >
              <div className="pt-2 space-y-1">
                {item.subItems.map(subItem => <NavLink key={subItem.page} item={subItem} />)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-64 bg-white border-r z-50 flex flex-col"
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h1 className="text-xl font-bold text-red-500">🥛 DairyDash</h1>
              <button onClick={() => setIsOpen(false)} className="md:hidden">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2">
              {menuItems.map((item) => 
                item.subItems 
                  ? <CollapsibleMenu key={item.label} item={item} />
                  : <NavLink key={item.page} item={item} />
              )}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}