export const branches = [
  { id: 'branch-1', name: 'Koramangala Branch', location: 'Bengaluru, Karnataka', revenue: 120000, orders: 450, status: 'active', city: 'Bengaluru' },
  { id: 'branch-2', name: 'Andheri West Branch', location: 'Mumbai, Maharashtra', revenue: 95000, orders: 320, status: 'active', city: 'Mumbai' },
  { id: 'branch-3', name: 'Sector 29 Branch', location: 'Gurugram, Haryana', revenue: 78000, orders: 280, status: 'inactive', city: 'Gurugram' },
  { id: 'branch-4', name: 'T. Nagar Branch', location: 'Chennai, Tamil Nadu', revenue: 110000, orders: 410, status: 'active', city: 'Chennai' },
];

export const products = [
  { id: 'prod-1', name: 'Full Cream Milk', category: 'Milk', price: 60, stock: 150, unit: 'Litre', branch: 'Koramangala Branch' },
  { id: 'prod-2', name: 'Paneer', category: 'Dairy', price: 120, stock: 80, unit: '200g', branch: 'Andheri West Branch' },
  { id: 'prod-3', name: 'Fresh Curd', category: 'Dairy', price: 40, stock: 200, unit: '500g', branch: 'Koramangala Branch' },
  { id: 'prod-4', name: 'Ghee', category: 'Dairy', price: 250, stock: 60, unit: '500g', branch: 'Sector 29 Branch' },
  { id: 'prod-5', name: 'Buttermilk', category: 'Beverages', price: 25, stock: 120, unit: '500ml', branch: 'T. Nagar Branch' },
];

export const orders = [
  { id: 'ord-001', customerName: 'Rajesh Kumar', items: 5, total: 425, date: '2023-10-26', status: 'completed' },
  { id: 'ord-002', customerName: 'Priya Sharma', items: 3, total: 285, date: '2023-10-26', status: 'completed' },
  { id: 'ord-003', customerName: 'Amit Patel', items: 7, total: 670, date: '2023-10-25', status: 'pending' },
  { id: 'ord-004', customerName: 'Neha Singh', items: 2, total: 190, date: '2023-10-25', status: 'completed' },
  { id: 'ord-005', customerName: 'Suresh Gupta', items: 4, total: 350, date: '2023-10-24', status: 'cancelled' },
];

export const customers = [
  { id: 'cust-1', name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '+91 98765 43210', branch: 'Koramangala Branch', totalOrders: 15, totalSpent: 6375, lastOrderDate: '2023-10-26', status: 'active', customerType: 'returning' },
  { id: 'cust-2', name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 12345', branch: 'Andheri West Branch', totalOrders: 25, totalSpent: 12500, lastOrderDate: '2023-10-26', status: 'active', customerType: 'high-value' },
  { id: 'cust-3', name: 'Amit Patel', email: 'amit@example.com', phone: '+91 98765 67890', branch: 'Sector 29 Branch', totalOrders: 8, totalSpent: 4200, lastOrderDate: '2023-10-25', status: 'inactive', customerType: 'new' },
];

export const deliveryBoys = [
  { id: 'db-1', name: 'Sanjay Singh', area: 'Koramangala', orders: 25, rating: 4.8, status: 'active' },
  { id: 'db-2', name: 'Vijay Kumar', area: 'Andheri West', orders: 18, rating: 4.5, status: 'active' },
  { id: 'db-3', name: 'Anil Yadav', area: 'Sector 29', orders: 15, rating: 4.2, status: 'inactive' },
  { id: 'db-4', name: 'Ravi Sharma', area: 'T. Nagar', orders: 22, rating: 4.9, status: 'active' },
];

export const users = [
  { id: 'user-1', name: 'John Doe', email: 'john.doe@dairy.com', role: 'Super Admin', status: 'active', joinDate: '2023-01-15' },
  { id: 'user-2', name: 'Jane Smith', email: 'jane.smith@dairy.com', role: 'Admin', status: 'active', joinDate: '2023-02-20' },
  { id: 'user-3', name: 'Peter Jones', email: 'peter.jones@dairy.com', role: 'Manager', status: 'inactive', joinDate: '2023-03-10' },
  { id: 'user-4', name: 'Mary Johnson', email: 'mary.j@dairy.com', role: 'Staff', status: 'active', joinDate: '2023-04-05' },
];

// Data for charts
export const revenueDataMonthly = [
  { month: 'Jan', income: 4000, expenses: 2400 },
  { month: 'Feb', income: 3000, expenses: 1398 },
  { month: 'Mar', income: 2000, expenses: 9800 },
  { month: 'Apr', income: 2780, expenses: 3908 },
  { month: 'May', income: 1890, expenses: 4800 },
  { month: 'Jun', income: 2390, expenses: 3800 },
];

export const revenueDataWeekly = [
  { day: 'Mon', income: 1200, expenses: 800 },
  { day: 'Tue', income: 900, expenses: 600 },
  { day: 'Wed', income: 1500, expenses: 1000 },
  { day: 'Thu', income: 1100, expenses: 750 },
  { day: 'Fri', income: 1800, expenses: 1200 },
  { day: 'Sat', income: 2200, expenses: 1500 },
  { day: 'Sun', income: 1900, expenses: 1300 },
];

export const revenueDataToday = [
  { time: '9am', income: 200, expenses: 50 },
  { time: '12pm', income: 400, expenses: 150 },
  { time: '3pm', income: 300, expenses: 100 },
  { time: '6pm', income: 500, expenses: 200 },
];

export const orderSummaryDataWeekly = [
  { date: 'Mon', completed: 30, pending: 5 },
  { date: 'Tue', completed: 45, pending: 8 },
  { date: 'Wed', completed: 25, pending: 3 },
  { date: 'Thu', completed: 50, pending: 12 },
  { date: 'Fri', completed: 60, pending: 10 },
  { date: 'Sat', completed: 75, pending: 15 },
  { date: 'Sun', completed: 70, pending: 8 },
];

export const orderSummaryDataMonthly = [
  { week: 'Week 1', completed: 250, pending: 40 },
  { week: 'Week 2', completed: 300, pending: 55 },
  { week: 'Week 3', completed: 280, pending: 30 },
  { week: 'Week 4', completed: 320, pending: 45 },
];