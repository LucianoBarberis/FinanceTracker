import { z } from 'zod';

const htmlRegex = /<.*?>/;

export const registerSchema = z.object({
    userName: z
        .string()
        .min(1, "El nombre no puede estar vacio")
        .min(3, "El nombre debe tener entre 3 y 40 caracteres")
        .max(40, "El nombre debe tener entre 3 y 40 caracteres")
        .regex(/^[a-zA-Z0-9]*$/, "El nombre no puede tener caracteres extraños")
        .refine((val) => !htmlRegex.test(val), "El nombre no puede contener etiquetas HTML."),

    email: z
        .string()
        .min(1, "El Email no puede estar vacio")
        .email("El Email debe ser valido")
        .refine((val) => !htmlRegex.test(val), "El correo no puede contener etiquetas HTML."),

    password: z
        .string()
        .min(1, "la contraseña no puede estar vacia")
        .min(8, "La contraseña debe tener mas de 8 caracteres")
        // Regex: 2 Mayus, 3 minus, 2 números
        .regex(
            /^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/,
            "Contraseña insegura (2 mayúsculas, 3 minúsculas y 2 números)"
        )
        .refine((val) => !htmlRegex.test(val), "La contraseña no puede contener etiquetas HTML."),

    confirmPassword: z
        .string()
        .min(1, "Debes confirmar tu contraseña"),

})