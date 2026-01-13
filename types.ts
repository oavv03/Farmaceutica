
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  therapeuticArea: TherapeuticArea;
  image: string;
  price: number;
  requiresPrescription: boolean;
  stock: number;
}

export enum TherapeuticArea {
  ONCOLOGY = 'Oncology',
  CARDIOLOGY = 'Cardiology',
  NEUROLOGY = 'Neurology',
  IMMUNOLOGY = 'Immunology',
  VACCINES = 'Vaccines',
  RARE_DISEASE = 'Rare Diseases'
}

export type UserRole = 'client' | 'pharmacy' | 'support' | 'admin';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  loyaltyPoints: number;
  tier: 'Silver' | 'Gold' | 'Platinum';
  medicalRecord: {
    allergies: string[];
    chronicConditions: string[];
    lastCheckup: string;
  };
}

export interface Order {
  id: string;
  date: string;
  status: 'Pending Verification' | 'Processing' | 'Shipped' | 'Delivered';
  items: CartItem[];
  total: number;
  prescriptionUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  isOpen: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  status: 'Success' | 'Alert';
}

export interface InteractionMessage {
  id: string;
  sender: 'user' | 'assistant' | 'human';
  senderName?: string;
  content: string;
  timestamp: Date;
}
