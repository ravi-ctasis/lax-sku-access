export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'shipped' | 'delivered';
  items: CartItem[];
  total: number;
  poNumber?: string;
  trackingNumber?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  assignedBrands: string[];
  assignedSkus: string[];
}
