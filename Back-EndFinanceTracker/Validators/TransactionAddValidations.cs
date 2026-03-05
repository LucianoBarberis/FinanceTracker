using Back_EndFinanceTracker.DTOs;
using FluentValidation;
using System.Text.RegularExpressions;

namespace Back_EndFinanceTracker.Validators
{
    public class TransactionAddValidations : AbstractValidator<TransactionAddDTO>
    {
        public TransactionAddValidations() 
        {
            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("La descripción es obligatoria.")
                .Length(3, 40).WithMessage("La descripción debe tener entre 3 y 40 caracteres.")
                .Must(d => d == null || !Regex.IsMatch(d, "<.*?>"))
                    .WithMessage("La descripción no puede contener etiquetas HTML.");

            RuleFor(x => x.Amount)
                .NotEmpty().WithMessage("El importe es obligatorio.")
                .GreaterThan(0).WithMessage("El importe debe ser mayor a 0.");

            RuleFor(x => x.CategoryId)
                .GreaterThan(0).WithMessage("Debes seleccionar una categoría válida.");

            RuleFor(x => x.Type)
                .IsInEnum().WithMessage("El tipo de transacción no es válido.");

            RuleFor(x => x.DateTime)
                .NotEmpty().WithMessage("La fecha es obligatoria.")
                .LessThanOrEqualTo(DateTime.Now).WithMessage("No puedes registrar una transacción con fecha futura.");
        }
    }
}
