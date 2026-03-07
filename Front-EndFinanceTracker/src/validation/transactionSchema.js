import z from "zod";

export const transactionSchema = z.object({
    id: z.any().optional(),

    description: z
        .string()
        .min(1, "La descripción es obligatoria.")
        .min(3, "Mínimo 3 caracteres.")
        .max(40, "Máximo 40 caracteres.")
        .refine((val) => !/<.*?>/.test(val), "No se permite HTML."),

    amount: z.coerce
        .number({ invalid_type_error: "El importe es obligatorio." })
        .gt(0, "El importe debe ser mayor a 0."),

    categoryId: z.coerce
        .number()
        .gt(0, "Selecciona una categoría válida."),

    dateTime: z.coerce
        .date({ errorMap: () => ({ message: "Fecha obligatoria." }) })
        .max(new Date(), "No puedes usar fechas futuras."),

    type: z.coerce
        .number()
        .refine((val) => [0, 1].includes(val), "Seleccione un tipo de transacción válido."),
});