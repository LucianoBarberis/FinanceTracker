using Back_EndFinanceTracker.Constants;
using Back_EndFinanceTracker.DTOs;
using FluentValidation;
using System.Text.RegularExpressions;

namespace Back_EndFinanceTracker.Validators
{
    public class CategoriesUpdateValidator : AbstractValidator<CategoryDto>
    {
        public CategoriesUpdateValidator()
        {
            // Validamos el ID (debe ser mayor a 0)
            RuleFor(t => t.Id)
                .GreaterThan(0).WithMessage("El ID de la categoría no es válido.");

            RuleFor(t => t.Name)
                .NotEmpty().WithMessage("El nombre es obligatorio")
                .Length(3, 25).WithMessage("El nombre debe tener entre 3 y 40 caracteres.")
                .Must(d => d == null || !Regex.IsMatch(d, "<.*?>"))
                .WithMessage("El nombre no puede contener etiquetas HTML.");

            RuleFor(t => t.Icon)
                .NotEmpty().WithMessage("El Icono es obligatorio")
                .Must(d => d == null || !Regex.IsMatch(d, "<.*?>"))
                .WithMessage("El nombre no puede contener etiquetas HTML.")
                .Must(icon => Icons.AlowedIcons.Contains(icon))
                .WithMessage("El Icono seleccionado no es válido");

            RuleFor(t => t.Type)
                .NotEmpty().WithMessage("El tipo es obligatorio")
                .IsInEnum().WithMessage("El tipo no es válido");
        }
    }
}
