export interface Branch {
  id: string;
  name: string;
  location: string;
  revenue: number;
  orders: number;
  status: 'active' | 'inactive';
  city: string;
  manager?: string;
  adminEmail?: string;
  contactNumber?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
  branch?: string;
  image?: string;
}

export interface Order {
  id: string;
  customerName: string;
  items: number;
  total: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  branch?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  status: 'active' | 'inactive';
  customerType?: 'new' | 'returning' | 'high-value';
}

export interface DeliveryBoy {
  id: string;
  name: string;
  area: string;
  orders: number;
  rating: number;
  status: 'active' | 'inactive';
}

export interface User {
  id: string;
  name:string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}