import { demoContacts } from "./contacts";
import { supabase } from "./supabase";
import { FavoriteContact, SeniorProfile, SubscriptionRequest, WellnessCheck } from "./types";

const profileIdStorageKey = "jeVaisBienSeniorProfileId";

export async function fetchFavoriteContacts(): Promise<FavoriteContact[] | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("favorite_contacts")
    .select("id, first_name, relationship, phone_number, photo_url, is_primary, is_emergency, display_order")
    .order("display_order", { ascending: true });

  if (error) {
    console.error(error);
    return null;
  }

  if (!data || data.length === 0) return demoContacts;

  return data.map((contact) => ({
    id: contact.id,
    firstName: contact.first_name,
    relationship: contact.relationship,
    phoneNumber: contact.phone_number,
    photoUrl: contact.photo_url ?? undefined,
    isPrimary: contact.is_primary,
    isEmergency: contact.is_emergency,
    displayOrder: contact.display_order,
  }));
}

export async function upsertFavoriteContact(contact: FavoriteContact): Promise<FavoriteContact | null> {
  if (!supabase) return null;

  const payload = {
    id: contact.id || undefined,
    first_name: contact.firstName,
    relationship: contact.relationship,
    phone_number: contact.phoneNumber,
    photo_url: contact.photoUrl ?? null,
    is_primary: !!contact.isPrimary,
    is_emergency: !!contact.isEmergency,
    display_order: contact.displayOrder ?? 1,
  };

  const { data, error } = await supabase
    .from("favorite_contacts")
    .upsert(payload)
    .select("id, first_name, relationship, phone_number, photo_url, is_primary, is_emergency, display_order")
    .single();

  if (error || !data) {
    console.error(error);
    return null;
  }

  return {
    id: data.id,
    firstName: data.first_name,
    relationship: data.relationship,
    phoneNumber: data.phone_number,
    photoUrl: data.photo_url ?? undefined,
    isPrimary: data.is_primary,
    isEmergency: data.is_emergency,
    displayOrder: data.display_order,
  };
}

export async function deleteFavoriteContact(id: string): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from("favorite_contacts").delete().eq("id", id);
  if (error) console.error(error);
  return !error;
}

export async function fetchLastWellnessCheck(): Promise<WellnessCheck | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("wellness_checks")
    .select("checked_at, status, message")
    .order("checked_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    if (error) console.error(error);
    return null;
  }

  return {
    checkedAt: data.checked_at,
    status: "ok",
    message: data.message,
  };
}

export async function createWellnessCheck(check: WellnessCheck): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase.from("wellness_checks").insert({
    status: check.status,
    message: check.message,
    checked_at: check.checkedAt,
  });

  if (error) console.error(error);
  return !error;
}

export async function fetchSeniorProfile(): Promise<SeniorProfile | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("senior_profiles")
    .select("id, first_name, reminder_time, message")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  if (!data) return null;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(profileIdStorageKey, data.id);
  }

  return {
    firstName: data.first_name,
    reminderTime: data.reminder_time,
    message: data.message,
  };
}

export async function saveRemoteSeniorProfile(profile: SeniorProfile): Promise<boolean> {
  if (!supabase) return false;

  const storedId = typeof window !== "undefined" ? window.localStorage.getItem(profileIdStorageKey) : null;

  const payload = {
    ...(storedId ? { id: storedId } : {}),
    first_name: profile.firstName,
    reminder_time: profile.reminderTime,
    message: profile.message,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("senior_profiles")
    .upsert(payload)
    .select("id")
    .single();

  if (error || !data) {
    console.error(error);
    return false;
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(profileIdStorageKey, data.id);
  }

  return true;
}

export async function fetchSubscriptionRequests(): Promise<SubscriptionRequest[] | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("subscription_requests")
    .select("id, first_name, last_name, email, phone, selected_plan, message, status, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return null;
  }

  return (data ?? []).map((request) => ({
    id: request.id,
    firstName: request.first_name,
    lastName: request.last_name,
    email: request.email,
    phone: request.phone,
    selectedPlan: request.selected_plan,
    message: request.message ?? undefined,
    status: request.status,
    createdAt: request.created_at,
  }));
}

export async function createSubscriptionRequest(request: SubscriptionRequest): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase.from("subscription_requests").insert({
    first_name: request.firstName,
    last_name: request.lastName,
    email: request.email,
    phone: request.phone,
    selected_plan: request.selectedPlan,
    message: request.message ?? null,
    status: request.status,
    created_at: request.createdAt,
  });

  if (error) console.error(error);
  return !error;
}
