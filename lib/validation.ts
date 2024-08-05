import { z } from "zod";

export const UserFormValidation = z.object({
    name: z.string()
        .min(5, "Ime mora sadržati najmanje 5 karaktera.")
        .max(50, "Ime ne sme sadržati više od 50 karaktera"),
    email: z.string().email("Email adresa nije validna."),
    phone: z.string().refine((phone) => /^\+\d{11,12}$/.test(phone), 'Broj telefona nije validan.')
    })
