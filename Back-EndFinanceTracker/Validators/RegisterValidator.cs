using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Repository;
using FluentValidation;
using System.Text.RegularExpressions;

namespace Back_EndFinanceTracker.Validators
{
    public class RegisterValidator : AbstractValidator<RegisterDTO>
    {
        private IUserRepository _repository;
        public RegisterValidator(IUserRepository userRepository) 
        {
            _repository = userRepository;

            RuleFor(t => t.UserName)
                .NotEmpty().WithMessage("El nombre no puede estar vacio")
                .Length(3, 40).WithMessage("El nombre debe tener entre 3 y 40 catacteres")
                .Must(d => d == null || !Regex.IsMatch(d, "<.*?>"))
                .WithMessage("El nombre no puede contener etiquetas HTML.")
                .Matches(@"^[a-zA-Z0-9]*$").WithMessage("El nombre no puede tener caracteres extraños")
                .MustAsync(async (userName, cancelation) => !await _repository.UserNameExists(userName))
                .WithMessage("El nombre de usuario ya existe");
            RuleFor(t => t.Password)
                .NotEmpty().WithMessage("la contraseña no puede estar vacia")
                .Equal(x => x.ConfirmPassword).WithMessage("Las contraseñas no son iguales")
                .MinimumLength(8).WithMessage("La contraseña debe tener mas de 8")
                .Matches(@"^(?=.*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$").WithMessage("La contraseña no es segura. Debe tener 1 caracter en Mayuscula, 3 en minuscula, 2 numeros y mas de 8 caracteres")
                .Must(d => d == null || !Regex.IsMatch(d, "<.*?>"))
                .WithMessage("La contraseña no puede contener etiquetas HTML.");
            RuleFor(t => t.Email)
                .NotEmpty().WithMessage("El Email no puede estar vacio")
                .EmailAddress().WithMessage("El Email debe ser valido")
                .Must(d => d == null || !Regex.IsMatch(d, "<.*?>"))
                .WithMessage("El Email no puede contener etiquetas HTML.")
                .MustAsync(async (email, cancelation) => !await _repository.EmailExists(email))
                .WithMessage("El correo ya esta registrado");
        }
    }
}
