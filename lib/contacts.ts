import { FavoriteContact } from "./types";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  avatar?: string;
  isFavorite?: boolean;
}

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Marie Dupont',
    phone: '+33 6 12 34 56 78',
    relation: 'Fille',
    isFavorite: true,
  },
  {
    id: '2',
    name: 'Jean Dupont',
    phone: '+33 6 98 76 54 32',
    relation: 'Fils',
    isFavorite: true,
  },
  {
    id: '3',
    name: 'Dr. Martin',
    phone: '+33 6 11 22 33 44',
    relation: 'Médecin',
  },
  {
    id: '4',
    name: 'Sophie Bernard',
    phone: '+33 6 55 66 77 88',
    relation: 'Voisine',
  },
];

export const demoContacts: FavoriteContact[] = [
  {
    id: '1',
    firstName: 'Marie',
    relationship: 'Fille',
    phoneNumber: '+33 6 12 34 56 78',
    isPrimary: true,
    displayOrder: 1,
  },
  {
    id: '2',
    firstName: 'Jean',
    relationship: 'Fils',
    phoneNumber: '+33 6 98 76 54 32',
    isPrimary: false,
    displayOrder: 2,
  },
  {
    id: '3',
    firstName: 'Dr. Martin',
    relationship: 'Médecin',
    phoneNumber: '+33 6 11 22 33 44',
    displayOrder: 3,
  },
  {
    id: '4',
    firstName: 'Sophie',
    relationship: 'Voisine',
    phoneNumber: '+33 6 55 66 77 88',
    displayOrder: 4,
  },
];

export function getContacts(): Contact[] {
  // In a real app, this would fetch from an API or local storage
  return mockContacts;
}

export function getContactById(id: string): Contact | undefined {
  return mockContacts.find(contact => contact.id === id);
}

export function addContact(contact: Omit<Contact, 'id'>): Contact {
  const newContact: Contact = {
    ...contact,
    id: Date.now().toString(),
  };
  mockContacts.push(newContact);
  return newContact;
}

export function updateContact(id: string, updates: Partial<Contact>): Contact | null {
  const index = mockContacts.findIndex(contact => contact.id === id);
  if (index === -1) return null;
  
  mockContacts[index] = { ...mockContacts[index], ...updates };
  return mockContacts[index];
}

export function deleteContact(id: string): boolean {
  const index = mockContacts.findIndex(contact => contact.id === id);
  if (index === -1) return false;
  
  mockContacts.splice(index, 1);
  return true;
}
