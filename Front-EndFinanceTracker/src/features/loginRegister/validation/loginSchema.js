import { z } from 'zod';

// Regex para detectar etiquetas HTML (igual que tu lógica en C#)
const htmlRegex = /<.*?>/;

export const loginSchema = z.object({
    userIdentify: z
        .string()
        .min(1, "El usuario o correo no puede estar vacio")
        .refine((val) => !htmlRegex.test(val), {
            message: "El nombre no puede contener etiquetas HTML.",
        })
        .refine((val) => {
            const isEmail = z.string().email().safeParse(val).success;
            const isUsername = val.length >= 3 && val.length <= 40;
            return isEmail || isUsername;
        }, {
            message: "Ingresa un nombre o un correo valido",
        }),

    password: z
        .string()
        .min(1, "la contraseña no puede estar vacia")
        .min(8, "La contraseña debe tener mas de 8 caracteres")
        .refine((val) => !htmlRegex.test(val), {
            message: "La contraseña no puede contener etiquetas HTML.",
        }),
});