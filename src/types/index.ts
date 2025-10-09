export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
  image?: string;
  branch?: string;
}

export interface Order {
  id: string;
  customerName: string;
  items: number;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: string;
}

export interface Notification {
  id: string;
  type: 'alert' | 'success' | 'info' | 'warning';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export interface DeliveryBoy {
  id: string;
  name: string;
  area: string;
  orders: number;
  rating: number;
  status: 'active' | 'inactive';
  avatar?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  manager: string;
  orders: number;
  revenue: number;
  status: 'active' | 'inactive';
  city?: string;
  state?: string;
  pincode?: string;
  address?: string;
  contactNumber?: string;
  adminEmail?: string;
  openingHours?: string;
  seatingCapacity?: number;
}
