import z from "zod";

export const budgetSchema = z.object({
        amount: z.coerce
                .number({ invalid_type_error: "El importe es obligatorio." })
                .gt(0, "El importe debe ser mayor a 0."),
        categoryId: z.coerce
                .number()
                .gt(0, "Selecciona una categoría válida."),
})