export const products = [
  { id: '1', name: 'Full Cream Milk', category: 'Milk', price: 65, stock: 120, unit: '1L', image: 'https://images.unsplash.com/photo-1745256698394-867c94a3a0b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwYm90dGxlJTIwZGFpcnl8ZW58MXx8fHwxNzU5ODMzNzQyfDA&ixlib=rb-4.1.0&q=80&w=1080', branch: 'Koramangala Branch' },
  { id: '2', name: 'Toned Milk', category: 'Milk', price: 55, stock: 95, unit: '1L', image: 'https://images.unsplash.com/photo-1745256698394-867c94a3a0b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwYm90dGxlJTIwZGFpcnl8ZW58MXx8fHwxNzU5ODMzNzQyfDA&ixlib=rb-4.1.0&q=80&w=1080', branch: 'Andheri West Branch' },
  { id: '3', name: 'Paneer', category: 'Dairy', price: 180, stock: 45, unit: '250g', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5lZXIlMjBpbmRpYW4lMjBjaGVlc2V8ZW58MXx8fHwxNzU5OTQzODM2fDA&ixlib=rb-4.1.0&q=80&w=1080', branch: 'Koramangala Branch' },
  { id: '4', name: 'Fresh Curd', category: 'Dairy', price: 45, stock: 80, unit: '500g', image: 'https://images.unsplash.com/photo-1633383718081-22ac93e3db65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXJkJTIweW9ndXJ0JTIwYm93bHxlbnwxfHx8fDE3NTk5NDM4MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', branch: 'T. Nagar Branch' },
  { id: '5', name: 'Butter', category: 'Dairy', price: 95, stock: 15, unit: '200g', image: 'https://images.unsplash.com/photo-1709177068446-d5c0f6d25c48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXR0ZXIlMjBkYWlyeSUyMGZyZXNofGVufDF8fHx8MTc1OTk0MzgzN3ww&ixlib=rb-4.1.0&q=80&w=1080', branch: 'Sector 29 Branch' },
  { id: '6', name: 'Ghee', category: 'Dairy', price: 550, stock: 30, unit: '500ml', image: 'https://images.unsplash.com/photo-1573812461383-e5f8b759d12e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaGVlJTIwY2xhcmlmaWVkJTIwYnV0dGVyfGVufDF8fHx8MTc1OTk0MzIyM3ww&ixlib=rb-4.1.0&q=80&w=1080', branch: 'Koramangala Branch' },
  { id: '7', name: 'Cheese Slices', category: 'Dairy', price: 140, stock: 60, unit: '200g', image: 'https://images.unsplash.com/photo-1723473620176-8d26dc6314cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVlc2UlMjBzbGljZXMlMjBkYWlyeXxlbnwxfHx8fDE3NTk5NDM4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080', branch: 'Andheri West Branch' },
  { id: '8', name: 'Lassi', category: 'Beverages', price: 35, stock: 70, unit: '250ml', image: 'https://images.unsplash.com/photo-1637958427185-25a2c0e58419?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXNzaSUyMGRyaW5rJTIwaW5kaWFufGVufDF8fHx8MTc1OTk0MzgzOHww&ixlib=rb-4.1.0&q=80&w=1080', branch: 'T. Nagar Branch' },
  { id: '9', name: 'Flavored Milk', category: 'Beverages', price: 40, stock: 0, unit: '200ml', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwYm90dGxlfGVufDB8fHx8MTczMDE5MDQ4MHww&ixlib=rb-4.1.0&q=80&w=1080', branch: 'Andheri West Branch' },
];

export const orders = [
  { id: 'ORD-1234', customerName: 'Rajesh Kumar', items: 5, total: 425, status: 'completed', date: '2025-10-28', branch: 'Koramangala Branch', payment: 'UPI' },
  { id: 'ORD-1235', customerName: 'Priya Sharma', items: 3, total: 285, status: 'completed', date: '2025-10-28', branch: 'Andheri West Branch', payment: 'Card' },
  { id: 'ORD-1236', customerName: 'Amit Patel', items: 7, total: 670, status: 'pending', date: '2025-10-28', branch: 'T. Nagar Branch', payment: 'Cash' },
  { id: 'ORD-1237', customerName: 'Neha Singh', items: 2, total: 190, status: 'completed', date: '2025-10-27', branch: 'Koramangala Branch', payment: 'UPI' },
  { id: 'ORD-1238', customerName: 'Vijay Reddy', items: 4, total: 380, status: 'pending', date: '2025-10-27', branch: 'Sector 29 Branch', payment: 'Wallet' },
  { id: 'ORD-1239', customerName: 'Sanjana Gupta', items: 6, total: 545, status: 'completed', date: '2025-10-26', branch: 'Andheri West Branch', payment: 'Card' },
  { id: 'ORD-1240', customerName: 'Rahul Mehta', items: 3, total: 225, status: 'cancelled', date: '2025-10-25', branch: 'T. Nagar Branch', payment: 'Cash' },
];

export const customers = [
  { id: '1', name: 'Rajesh Kumar', email: 'rajesh.k@email.com', phone: '+91 98765 43210', totalOrders: 24, totalSpent: 8950, joinDate: '2025-05-15', status: 'active', branch: 'Koramangala Branch', customerType: 'returning', lastOrderDate: '2025-10-08' },
  { id: '2', name: 'Priya Sharma', email: 'priya.s@email.com', phone: '+91 98765 43211', totalOrders: 18, totalSpent: 6780, joinDate: '2025-06-22', status: 'active', branch: 'Andheri West Branch', customerType: 'returning', lastOrderDate: '2025-10-07' },
  { id: '3', name: 'Amit Patel', email: 'amit.p@email.com', phone: '+91 98765 43212', totalOrders: 32, totalSpent: 12450, joinDate: '2025-04-10', status: 'active', branch: 'T. Nagar Branch', customerType: 'high-value', lastOrderDate: '2025-10-08' },
  { id: '4', name: 'Neha Singh', email: 'neha.s@email.com', phone: '+91 98765 43213', totalOrders: 15, totalSpent: 5340, joinDate: '2025-07-05', status: 'inactive', branch: 'Koramangala Branch', customerType: 'returning', lastOrderDate: '2025-09-15' },
  { id: '5', name: 'Vijay Reddy', email: 'vijay.r@email.com', phone: '+91 98765 43214', totalOrders: 28, totalSpent: 10230, joinDate: '2025-05-28', status: 'active', branch: 'Sector 29 Branch', customerType: 'high-value', lastOrderDate: '2025-10-06' },
  { id: '6', name: 'Ananya Iyer', email: 'ananya.i@email.com', phone: '+91 98765 43215', totalOrders: 3, totalSpent: 890, joinDate: '2025-09-20', status: 'active', branch: 'Andheri West Branch', customerType: 'new', lastOrderDate: '2025-10-05' },
  { id: '7', name: 'Karthik Menon', email: 'karthik.m@email.com', phone: '+91 98765 43216', totalOrders: 42, totalSpent: 15670, joinDate: '2025-03-12', status: 'active', branch: 'Koramangala Branch', customerType: 'high-value', lastOrderDate: '2025-10-09' },
  { id: '8', name: 'Divya Nair', email: 'divya.n@email.com', phone: '+91 98765 43217', totalOrders: 21, totalSpent: 7890, joinDate: '2025-06-18', status: 'active', branch: 'T. Nagar Branch', customerType: 'returning', lastOrderDate: '2025-10-07' },
];

export const notifications = [
  {
    id: '1',
    type: 'alert',
    title: 'Low Stock Alert',
    message: 'Butter stock running low at Central branch',
    time: '2 minutes ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'success',
    title: 'Order Milestone',
    message: 'North branch reached 1000 orders this month',
    time: '15 minutes ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'System Update',
    message: 'New feature: Advanced analytics dashboard is now available',
    time: '1 hour ago',
    isRead: true,
  },
  {
    id: '4',
    type: 'warning',
    title: 'Maintenance Schedule',
    message: 'Scheduled maintenance on Sunday 2:00 AM - 4:00 AM',
    time: '3 hours ago',
    isRead: true,
  },
];

export const revenueDataMonthly = [
  { month: 'Jan', income: 145230, expenses: 98450 },
  { month: 'Feb', income: 167890, expenses: 104230 },
  { month: 'Mar', income: 189450, expenses: 112340 },
  { month: 'Apr', income: 198670, expenses: 118900 },
  { month: 'May', income: 187230, expenses: 115670 },
  { month: 'Jun', income: 215890, expenses: 125430 },
  { month: 'Jul', income: 223450, expenses: 128900 },
];

export const revenueDataWeekly = [
  { month: 'Mon', income: 32450, expenses: 18230 },
  { month: 'Tue', income: 38670, expenses: 21450 },
  { month: 'Wed', income: 41230, expenses: 22890 },
  { month: 'Thu', income: 39450, expenses: 21670 },
  { month: 'Fri', income: 45890, expenses: 24560 },
  { month: 'Sat', income: 52340, expenses: 27890 },
  { month: 'Sun', income: 48900, expenses: 25340 },
];

export const revenueDataToday = [
  { month: '6 AM', income: 2340, expenses: 1450 },
  { month: '9 AM', income: 5670, expenses: 2890 },
  { month: '12 PM', income: 8900, expenses: 4560 },
  { month: '3 PM', income: 7450, expenses: 3890 },
  { month: '6 PM', income: 9890, expenses: 5230 },
  { month: '9 PM', income: 6780, expenses: 3450 },
];

export const orderSummaryDataWeekly = [
  { date: 'Mon', completed: 145, pending: 35 },
  { date: 'Tue', completed: 178, pending: 28 },
  { date: 'Wed', completed: 165, pending: 42 },
  { date: 'Thu', completed: 192, pending: 38 },
  { date: 'Fri', completed: 175, pending: 32 },
  { date: 'Sat', completed: 198, pending: 45 },
  { date: 'Sun', completed: 185, pending: 40 },
];

export const orderSummaryDataMonthly = [
  { date: 'Week 1', completed: 845, pending: 185 },
  { date: 'Week 2', completed: 978, pending: 142 },
  { date: 'Week 3', completed: 1065, pending: 198 },
  { date: 'Week 4', completed: 1142, pending: 156 },
];

export const deliveryBoys = [
  { id: '1', name: 'Mohammed Hassan', area: 'Downtown', orders: 48, rating: 4.8, status: 'active', email: 'mohammed.hassan@company.com', phone: '+971 50 123-4567', branch: 'Downtown Branch', joinedDate: '1/15/2024', completedOrders: 152, avgDeliveryTime: '28m', currentOrders: 2, weekOrders: 45 },
  { id: '2', name: 'Ahmed Al Mansouri', area: 'Mall', orders: 42, rating: 4.6, status: 'active', email: 'ahmed.almansouri@company.com', phone: '+971 50 234-5678', branch: 'Mall Branch', joinedDate: '2/20/2024', completedOrders: 181, avgDeliveryTime: '32m', currentOrders: 1, weekOrders: 28 },
  { id: '3', name: 'Omar Sheikh', area: 'Airport', orders: 38, rating: 4.4, status: 'inactive', email: 'omar.sheikh@company.com', phone: '+971 50 345-6789', branch: 'Airport Branch', joinedDate: '3/10/2024', completedOrders: 76, avgDeliveryTime: '35m', currentOrders: 0, weekOrders: 0 },
  { id: '4', name: 'Khalid Ibrahim', area: 'Marina', orders: 35, rating: 4.9, status: 'active', email: 'khalid.ibrahim@company.com', phone: '+971 50 456-7890', branch: 'Marina Branch', joinedDate: '1/5/2023', completedOrders: 189, avgDeliveryTime: '25m', currentOrders: 3, weekOrders: 52 },
];

export const users = [
  { id: '1', name: 'Admin User', email: 'admin@dairy.com', role: 'Super Admin', status: 'active', joinDate: '2024-01-15' },
  { id: '2', name: 'Manager One', email: 'manager1@dairy.com', role: 'Manager', status: 'active', joinDate: '2024-02-20' },
  { id: '3', name: 'Staff One', email: 'staff1@dairy.com', role: 'Staff', status: 'active', joinDate: '2024-03-10' },
  { id: '4', name: 'Staff Two', email: 'staff2@dairy.com', role: 'Staff', status: 'inactive', joinDate: '2024-04-05' },
];

export const branches = [
  { id: '1', name: 'Koramangala Branch', location: 'Bengaluru, Karnataka', manager: 'Koramangala Admin', orders: 430, revenue: 120000, status: 'active', city: 'Bengaluru', state: 'Karnataka', pincode: '560034', address: '80 Feet Road, Koramangala', contactNumber: '+91 98765 43210', adminEmail: 'admin@dairy.com', openingHours: '06:00 - 22:00', seatingCapacity: 50 },
  { id: '2', name: 'Andheri West Branch', location: 'Mumbai, Maharashtra', manager: 'Andheri Admin', orders: 320, revenue: 95000, status: 'active', city: 'Mumbai', state: 'Maharashtra', pincode: '400058', address: 'S.V. Road, Andheri West', contactNumber: '+91 98765 43210', adminEmail: 'admin@dairy.com', openingHours: '06:00 - 22:00', seatingCapacity: 40 },
  { id: '3', name: 'Sector 29 Branch', location: 'Gurugram, Haryana', manager: 'Sector Admin', orders: 280, revenue: 78000, status: 'inactive', city: 'Gurugram', state: 'Haryana', pincode: '122001', address: 'Leisure Valley Road, Sector 29', contactNumber: '+91 98765 43210', adminEmail: 'admin@dairy.com', openingHours: '06:00 - 22:00', seatingCapacity: 45 },
  { id: '4', name: 'T. Nagar Branch', location: 'Chennai, Tamil Nadu', manager: 'T. Admin', orders: 410, revenue: 110000, status: 'active', city: 'Chennai', state: 'Tamil Nadu', pincode: '600017', address: 'Usman Road, T. Nagar', contactNumber: '+91 98765 43210', adminEmail: 'admin@dairy.com', openingHours: '06:00 - 22:00', seatingCapacity: 35 },
];