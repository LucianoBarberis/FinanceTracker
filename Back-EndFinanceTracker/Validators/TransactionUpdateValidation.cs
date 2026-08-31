using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;
using Back_EndFinanceTracker.Repository;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Back_EndFinanceTracker.Validators
{
    public class TransactionUpdateValidation : AbstractValidator<TransactionUpdateDTO>
    {
        private readonly IRepository<Category> _categoryRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TransactionUpdateValidation(IRepository<Category> repository, IHttpContextAccessor httpContextAccessor)
        {
            _categoryRepository = repository;
            _httpContextAccessor = httpContextAccessor;

            RuleFor(x => x.Amount)
                .NotEmpty().WithMessage("El monto es obligatorio.")
                .GreaterThan(0).WithMessage("El monto debe ser un número positivo mayor a 0.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("La descripción no puede estar vacía.")
                .Length(3, 40).WithMessage("La descripción debe tener entre 3 y 40 caracteres.");

            RuleFor(x => x.DateTime)
                .NotEmpty().WithMessage("La fecha es obligatoria.")
                .Must(d => d <= DateTime.UtcNow)
                    .WithMessage("No puedes registrar una transacción con fecha futura.");

            RuleFor(x => x.Type)
                .IsInEnum().WithMessage("El tipo de transacción seleccionado no es válido.");
                
            RuleFor(x => x.CategoryId)
                .GreaterThan(0).WithMessage("Debes seleccionar una categoría válida.");

            RuleFor(x => x)
                .MustAsync(async (dto, cancellationToken) =>
                {
                    var userIdClaim = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
                    if (string.IsNullOrEmpty(userIdClaim)) return false;

                    var userId = int.Parse(userIdClaim);
                    var category = await _categoryRepository.GetById(dto.CategoryId, userId);
                    
                    if (category == null) return false;
                    return dto.Type == category.Type;
                })
                .WithMessage("La categoría seleccionada no existe o no corresponde a la transacción (Ingreso/Egreso).");
        }
    }
}