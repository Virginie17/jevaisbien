import { FavoriteContact } from "./types";

export const demoContacts: FavoriteContact[] = [
  {
    id: "1",
    firstName: "Marie",
    relationship: "Fille",
    phoneNumber: "+33612345678",
    isPrimary: true,
    displayOrder: 1,
  },
  {
    id: "2",
    firstName: "Sophie",
    relationship: "Petite-fille",
    phoneNumber: "+33655667788",
    isPrimary: false,
    displayOrder: 2,
  },
  {
    id: "3",
    firstName: "Pierre",
    relationship: "Fils",
    phoneNumber: "+33698765432",
    isPrimary: false,
    displayOrder: 3,
  },
  {
    id: "4",
    firstName: "Médecin",
    relationship: "Contact utile",
    phoneNumber: "+33611223344",
    isPrimary: false,
    isEmergency: true,
    displayOrder: 4,
  },
];
