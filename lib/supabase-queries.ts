import { demoContacts } from "./contacts";
import { supabase } from "./supabase";
import { FavoriteContact, SeniorProfile, Subscription, SubscriptionRequest, WellnessCheck } from "./types";

const profileIdStorageKey = "jeVaisBienSeniorProfileId";

function logSupabaseError(context: string, error: unknown) {
  if (!error) return;

  const readableError = error instanceof Error
    ? error.message
    : typeof error === "object"
      ? JSON.stringify(error, null, 2)
      : String(error);

  console.warn(`[Supabase] ${context} : ${readableError}`);
}

export async function fetchFavoriteContacts(): Promise<FavoriteContact[] | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("favorite_contacts")
    .select("id, senior_id, first_name, relationship, phone_number, photo_url, is_primary, display_order")
    .order("display_order", { ascending: true });

  if (error) {
    logSupabaseError("lecture des contacts", error);
    return null;
  }

  if (!data || data.length === 0) return demoContacts;

  return data.map((contact) => ({
    id: contact.id,
    seniorId: contact.senior_id ?? undefined,
    firstName: contact.first_name,
    relationship: contact.relationship,
    phoneNumber: contact.phone_number,
    photoUrl: contact.photo_url ?? undefined,
    isPrimary: contact.is_primary,
    displayOrder: contact.display_order,
  }));
}

export async function upsertFavoriteContact(contact: FavoriteContact): Promise<FavoriteContact | null> {
  if (!supabase) return null;

  const payload = {
    id: contact.id || undefined,
    senior_id: contact.seniorId ?? null,
    first_name: contact.firstName,
    relationship: contact.relationship,
    phone_number: contact.phoneNumber,
    photo_url: contact.photoUrl ?? null,
    is_primary: !!contact.isPrimary,
    display_order: contact.displayOrder ?? 0,
  };

  const { data, error } = await supabase
    .from("favorite_contacts")
    .upsert(payload)
    .select("id, senior_id, first_name, relationship, phone_number, photo_url, is_primary, display_order")
    .single();

  if (error || !data) {
    logSupabaseError("enregistrement d'un contact", error);
    return null;
  }

  return {
    id: data.id,
    seniorId: data.senior_id ?? undefined,
    firstName: data.first_name,
    relationship: data.relationship,
    phoneNumber: data.phone_number,
    photoUrl: data.photo_url ?? undefined,
    isPrimary: data.is_primary,
    displayOrder: data.display_order,
  };
}

export async function deleteFavoriteContact(id: string): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from("favorite_contacts").delete().eq("id", id);
  if (error) logSupabaseError("suppression d'un contact", error);
  return !error;
}

export async function fetchLastWellnessCheck(): Promise<WellnessCheck | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("wellness_checks")
    .select("id, senior_id, checked_at, status, message")
    .order("checked_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    if (error) logSupabaseError("lecture du dernier signal", error);
    return null;
  }

  return {
    id: data.id,
    seniorId: data.senior_id ?? undefined,
    checkedAt: data.checked_at,
    status: data.status,
    message: data.message ?? undefined,
  };
}

export async function createWellnessCheck(check: WellnessCheck): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { error } = await supabase.from("wellness_checks").insert({
      senior_id: check.seniorId ?? null,
      status: check.status,
      message: check.message ?? null,
      checked_at: check.checkedAt,
    });

    if (error) {
      logSupabaseError("enregistrement du signal", error);
      return false;
    }

    return true;
  } catch (error) {
    logSupabaseError("enregistrement du signal", error);
    return false;
  }
}

export async function fetchSeniorProfile(): Promise<SeniorProfile | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("senior_profiles")
    .select("id, last_name, first_name, reminder_time, is_active")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    logSupabaseError("lecture du profil senior", error);
    return null;
  }

  if (!data) return null;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(profileIdStorageKey, data.id);
  }

  return {
    id: data.id,
    lastName: data.last_name ?? undefined,
    firstName: data.first_name,
    reminderTime: data.reminder_time ?? "09:00",
    isActive: data.is_active,
  };
}

export async function saveRemoteSeniorProfile(profile: SeniorProfile): Promise<boolean> {
  if (!supabase) return false;

  const storedId = typeof window !== "undefined" ? window.localStorage.getItem(profileIdStorageKey) : null;

  const payload = {
    ...(profile.id || storedId ? { id: profile.id ?? storedId } : {}),
    last_name: profile.lastName ?? null,
    first_name: profile.firstName,
    reminder_time: profile.reminderTime,
    is_active: profile.isActive,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("senior_profiles")
    .upsert(payload)
    .select("id")
    .single();

  if (error || !data) {
    logSupabaseError("enregistrement du profil senior", error);
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
    logSupabaseError("lecture des demandes d'activation", error);
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

  if (error) {
    logSupabaseError("enregistrement d'une demande d'activation", error);
    return false;
  }

  return true;
}

export async function fetchSubscriptions(): Promise<Subscription[] | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("subscriptions")
    .select("id, user_email, plan_name, status, stripe_session_id, amount, started_at")
    .order("started_at", { ascending: false });

  if (error) {
    logSupabaseError("lecture des abonnements", error);
    return null;
  }

  return (data ?? []).map((subscription) => ({
    id: subscription.id,
    userEmail: subscription.user_email,
    planName: subscription.plan_name,
    status: subscription.status,
    stripeSessionId: subscription.stripe_session_id ?? undefined,
    amount: subscription.amount ?? undefined,
    startedAt: subscription.started_at ?? undefined,
  }));
}
