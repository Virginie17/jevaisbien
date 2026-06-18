import { demoContacts } from "./contacts";
import { FavoriteContact, SeniorProfile, SubscriptionRequest, WellnessCheck } from "./types";

const CONTACTS_KEY = "jeVaisBienContacts";
const WELLNESS_KEY = "lastWellnessCheck";
const SENIOR_PROFILE_KEY = "jeVaisBienSeniorProfile";
const SUBSCRIPTION_REQUESTS_KEY = "jeVaisBienSubscriptionRequests";

export const defaultSeniorProfile: SeniorProfile = {
  firstName: "Mamie",
  lastName: "",
  reminderTime: "09:00",
  isActive: true,
};

export function getStoredContacts(): FavoriteContact[] {
  if (typeof window === "undefined") return demoContacts;
  const stored = window.localStorage.getItem(CONTACTS_KEY);
  if (!stored) return demoContacts;

  try {
    const contacts = JSON.parse(stored) as FavoriteContact[];
    return contacts.length > 0 ? contacts : demoContacts;
  } catch {
    return demoContacts;
  }
}

export function saveStoredContacts(contacts: FavoriteContact[]) {
  window.localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
}

export function getLastWellnessCheck(): WellnessCheck | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(WELLNESS_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as WellnessCheck;
  } catch {
    return null;
  }
}

export function saveWellnessCheck(check: WellnessCheck) {
  window.localStorage.setItem(WELLNESS_KEY, JSON.stringify(check));
}

export function getSeniorProfile(): SeniorProfile {
  if (typeof window === "undefined") return defaultSeniorProfile;
  const stored = window.localStorage.getItem(SENIOR_PROFILE_KEY);
  if (!stored) return defaultSeniorProfile;

  try {
    return { ...defaultSeniorProfile, ...(JSON.parse(stored) as SeniorProfile) };
  } catch {
    return defaultSeniorProfile;
  }
}

export function saveSeniorProfile(profile: SeniorProfile) {
  window.localStorage.setItem(SENIOR_PROFILE_KEY, JSON.stringify(profile));
}

export function getSubscriptionRequests(): SubscriptionRequest[] {
  if (typeof window === "undefined") return [];
  const stored = window.localStorage.getItem(SUBSCRIPTION_REQUESTS_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as SubscriptionRequest[];
  } catch {
    return [];
  }
}

export function saveSubscriptionRequest(request: SubscriptionRequest) {
  const current = getSubscriptionRequests();
  window.localStorage.setItem(SUBSCRIPTION_REQUESTS_KEY, JSON.stringify([request, ...current]));
}
