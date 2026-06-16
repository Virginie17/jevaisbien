export type FavoriteContact = {
  id: string;
  firstName: string;
  relationship: string;
  phoneNumber: string;
  photoUrl?: string;
  isPrimary?: boolean;
  isEmergency?: boolean;
  displayOrder?: number;
};

export type WellnessCheck = {
  checkedAt: string;
  status: "ok";
  message: string;
};

export type SeniorProfile = {
  firstName: string;
  reminderTime: string;
  message: string;
};

export type SubscriptionPlan = "Découverte" | "Famille" | "Sérénité";

export type SubscriptionRequest = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedPlan: SubscriptionPlan;
  message?: string;
  status: "pending" | "active";
  createdAt: string;
};
