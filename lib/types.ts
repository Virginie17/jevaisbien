export type WellnessStatus = "bien" | "besoin_aide";

export type SeniorProfile = {
  id?: string;
  lastName?: string;
  firstName: string;
  reminderTime: string;
  isActive: boolean;
};

export type CaregiverProfile = {
  id?: string;
  lastName?: string;
  firstName: string;
  email: string;
  phone?: string;
  seniorId?: string;
};

export type FavoriteContact = {
  id: string;
  seniorId?: string;
  firstName: string;
  relationship: string;
  phoneNumber: string;
  photoUrl?: string;
  isPrimary?: boolean;
  displayOrder?: number;
};

export type WellnessCheck = {
  id?: string;
  seniorId?: string;
  checkedAt: string;
  status: WellnessStatus;
  message?: string;
};

export type SubscriptionPlan = "Famille" | "Sérénité";
export type SubscriptionStatus = "active" | "cancelled" | "expired";

export type Subscription = {
  id?: string;
  userEmail: string;
  planName: SubscriptionPlan;
  status: SubscriptionStatus;
  stripeSessionId?: string;
  amount?: number;
  startedAt?: string;
};

export type SubscriptionRequest = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedPlan: "Découverte" | SubscriptionPlan;
  message?: string;
  status: "pending" | "active";
  createdAt: string;
};
