import z from "zod";

const allowedIcons = [
    "wallet",
    "chart-line",
    "hamburger",
    "car",
    "gamepad",
    "shopping-cart",
    "hospital",
    "education",
    "gift",
    "home",
    "airplane",
    "electricity",
    "water",
    "internet",
    "gym"
]

export const categorySchema = z.object({
    id: z.any().optional(),
    name: z
        .string()
        .min(1, "El nombre es obligatorio.")
        .min(3, "Mínimo 3 caracteres.")
        .max(25, "Máximo 25 caracteres.")
        .refine((val) => !/<.*?>/.test(val), "No se permite HTML."),
    icon: z.string()
        .min(1, "El icono es obligatorio.")
        .refine((val) => allowedIcons.includes(val), "El Icono seleccionado no es valido")
        .refine((val) => !/<.*?>/.test(val), "No se permite HTML."),
        
    color: z.string()
        .regex(/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/, "El color seleccionado no es valido")
        .min(4, "Selecciona un color valido. Muy corto")
        .max(7, "Selecciona un color valido. Muy largo"),
        
    type: z.coerce
        .number()
        .refine((val) => [0, 1].includes(val), "Seleccione un tipo de transacción válido."),
});