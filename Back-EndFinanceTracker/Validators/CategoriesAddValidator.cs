using Back_EndFinanceTracker.Constants;
using Back_EndFinanceTracker.DTOs;
using FluentValidation;
using System.Text.RegularExpressions;


namespace Back_EndFinanceTracker.Validators
{
    public class CategoriesAddValidator : AbstractValidator<CategoryAddDTO>
    {
        public CategoriesAddValidator() 
        {
            RuleFor(t => t.Name)
                            .NotEmpty().WithMessage("El nombre es obligatorio")
                            .Length(3, 25).WithMessage("El nombre debe tener entre 3 y 25 caracteres.")
                            .Must(d => d == null || !Regex.IsMatch(d, "<.*?>"))
                            .WithMessage("El nombre no puede contener etiquetas HTML.");
            RuleFor(t => t.Icon)
                            .NotEmpty().WithMessage("El Icono es obligatorio")
                            .Must(d => d == null || !Regex.IsMatch(d, "<.*?>"))
                            .WithMessage("El nombre no puede contener etiquetas HTML.")
                            .Must(icon => Icons.AlowedIcons.Contains(icon))
                            .WithMessage("El Icono seleccionado no es valido");
            RuleFor(t => t.Type)
                            .IsInEnum().WithMessage("El tipo no es valido");
            RuleFor(t => t.Color)
                            .NotEmpty().WithMessage("El color es obligatorio")
                            .Length(4, 7).WithMessage("El color debe tener entre 4 y 7 caracteres")
                            .Matches(@"^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$")
                            .WithMessage("El color no cumple con el formato");
        }
    }
}
