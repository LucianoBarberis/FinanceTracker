using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;
using Back_EndFinanceTracker.Repository;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace Back_EndFinanceTracker.Validators
{
    public class TransactionAddValidations : AbstractValidator<TransactionAddDTO>
    {
        private readonly IRepository<Category> _categoryRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TransactionAddValidations(IRepository<Category> repository, IHttpContextAccessor httpContextAccessor) 
        {
            _categoryRepository = repository;
            _httpContextAccessor = httpContextAccessor;

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

            RuleFor(x => x)
                .MustAsync(async (dto, cancellationToken) =>
                {
                    var userIdClaim = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
                    if (string.IsNullOrEmpty(userIdClaim)) return false;

                    var userId = int.Parse(userIdClaim);
                    var category = await _categoryRepository.GetById(dto.CategoryId, userId);

                    if (category == null) return true;
                    return dto.Type == category.Type;
                })
                .WithMessage("El tipo de la transacción (Ingreso/Egreso) no coincide con el tipo de la categoría seleccionada.");
        }
    }
}
