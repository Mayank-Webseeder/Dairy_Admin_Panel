import { useState, useEffect, useRef } from 'react';
import { Search, X, File, ShoppingCart, Users, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const searchItems = [
  { name: 'Dashboard', icon: File, category: 'Pages' },
  { name: 'Orders', icon: ShoppingCart, category: 'Pages' },
  { name: 'Customers', icon: Users, category: 'Pages' },
  { name: 'Profile Settings', icon: Settings, category: 'Settings' },
];

export function SearchPopup({ isOpen, setIsOpen }) {
  const [searchTerm, setSearchTerm] = useState('');
  const popupRef = useRef(null);

  useEffect(() => {
    const handleKeydown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

  const filteredItems = searchItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
        >
          <motion.div
            ref={popupRef}
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -20 }}
            className="w-full max-w-lg bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <div className="p-4 border-b flex items-center">
              <Search className="h-5 w-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full text-lg outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <div key={index} className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <item.icon className="h-5 w-5 text-gray-500 mr-4" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">No results found</p>
              )}
            </div>
            <div className="p-3 bg-gray-50 border-t text-xs text-gray-500">
              Press{' '}
              <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
                Ctrl+K
              </kbd>{' '}
              to search
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}