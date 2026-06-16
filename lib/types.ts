export interface User {
  id: string;
  name: string;
  email: string;
  role: 'senior' | 'family' | 'caregiver';
  profilePicture?: string;
}

export interface Call {
  id: string;
  contactId: string;
  timestamp: Date;
  duration?: number;
  status: 'completed' | 'missed' | 'cancelled';
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'info' | 'warning' | 'emergency';
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  priority: number;
}

export interface MedicationReminder {
  id: string;
  name: string;
  dosage: string;
  time: string;
  frequency: string;
  taken: boolean;
}

export type FavoriteContact = {
  id: string;
  firstName: string;
  relationship: string;
  phoneNumber: string;
  photoUrl?: string;
  isPrimary?: boolean;
  displayOrder?: number;
};

export type WellnessCheck = {
  checkedAt: string;
  status: "ok";
  message: string;
};
