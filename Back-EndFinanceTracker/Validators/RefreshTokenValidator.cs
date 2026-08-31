using Back_EndFinanceTracker.DTOs;
using FluentValidation;

namespace Back_EndFinanceTracker.Validators
{
    public class RefreshTokenValidator : AbstractValidator<RefreshTokenDTO>
    {
        public RefreshTokenValidator()
        {
            RuleFor(t => t.Token)
                .NotEmpty().WithMessage("El token es obligatorio.");

            RuleFor(t => t.RefreshToken)
                .NotEmpty().WithMessage("El refresh token es obligatorio.");
        }
    }
}
