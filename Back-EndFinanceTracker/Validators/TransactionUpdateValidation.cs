using Back_EndFinanceTracker.DTOs;
using FluentValidation;

namespace Back_EndFinanceTracker.Validators
{
    public class TransactionUpdateValidation : AbstractValidator<TransactionUpdateDTO>
    {
        public TransactionUpdateValidation()
        {
            // Validamos que el monto sea positivo para evitar errores en el balance
            RuleFor(x => x.Amount)
                .NotEmpty().WithMessage("El monto es obligatorio.")
                .GreaterThan(0).WithMessage("El monto debe ser un número positivo mayor a 0.");

            // Limitamos la descripción para proteger la base de datos y asegurar claridad
            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("La descripción no puede estar vacía.")
                .Length(3, 200).WithMessage("La descripción debe tener entre 3 y 200 caracteres.");

            // Evitamos que se registren fechas en el futuro
            RuleFor(x => x.DateTime)
                .NotEmpty().WithMessage("La fecha es obligatoria.")
                .LessThanOrEqualTo(DateTime.Now).WithMessage("No puedes registrar una transacción con fecha futura.");

            // Aseguramos que el tipo coincida con los valores de tu Enum (Income/Expense)
            RuleFor(x => x.Type)
                .IsInEnum().WithMessage("El tipo de transacción seleccionado no es válido.");

            // Verificamos que el ID de categoría sea un número válido
            RuleFor(x => x.CategoryId)
                .GreaterThan(0).WithMessage("Debes seleccionar una categoría válida.");
        }
    }
}