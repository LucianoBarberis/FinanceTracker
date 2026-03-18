using Back_EndFinanceTracker.DTOs;
using FluentValidation;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Back_EndFinanceTracker.Validators
{
    public class LoginValidator : AbstractValidator<LoginDTO>
    {
        public LoginValidator() 
        {
            RuleFor(t => t.UserIdentify)
                .NotEmpty().WithMessage("El usuario o correo no puede estar vacio")
                .Must((dto, identificador) => isValidEmail(identificador) || isValidUserName(identificador))
                    .WithMessage("El Username debe tener entre 3 y 40 caracteres o debe ingresa un correo valido")
                .Must(d => d == null || !Regex.IsMatch(d, "<.*?>"))
                .WithMessage("El nombre no puede contener etiquetas HTML.");
            RuleFor(t => t.Password)
                .NotEmpty().WithMessage("la contraseña no puede estar vacia")
                .MinimumLength(8).WithMessage("La contraseña debe tener mas de 8 caracteres")
                .Must(d => d == null || !Regex.IsMatch(d, "<.*?>"))
                .WithMessage("La contraseña no puede contener etiquetas HTML.");

        }

        private bool isValidEmail(string email)
        {
            return new EmailAddressAttribute().IsValid(email);
        }

        private bool isValidUserName(string userName) 
        {
            return userName.Length >= 3 && userName.Length <= 40;
        }
    }
}
