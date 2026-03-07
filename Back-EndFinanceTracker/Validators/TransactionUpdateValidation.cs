using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;
using Back_EndFinanceTracker.Repository;
using FluentValidation;

namespace Back_EndFinanceTracker.Validators
{
    public class TransactionUpdateValidation : AbstractValidator<TransactionUpdateDTO>
    {
        private readonly IRepository<Category> _categoryRepository;
        public TransactionUpdateValidation(IRepository<Category> repository)
        {
            _categoryRepository = repository;

            RuleFor(x => x.Amount)
                .NotEmpty().WithMessage("El monto es obligatorio.")
                .GreaterThan(0).WithMessage("El monto debe ser un número positivo mayor a 0.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("La descripción no puede estar vacía.")
                .Length(3, 40).WithMessage("La descripción debe tener entre 3 y 40 caracteres.");

            RuleFor(x => x.DateTime)
                .NotEmpty().WithMessage("La fecha es obligatoria.")
                .LessThanOrEqualTo(DateTime.Now).WithMessage("No puedes registrar una transacción con fecha futura.");

            RuleFor(x => x.Type)
                .IsInEnum().WithMessage("El tipo de transacción seleccionado no es válido.");
                
            RuleFor(x => x.CategoryId)
                .GreaterThan(0).WithMessage("Debes seleccionar una categoría válida.");

            RuleFor(x => x)
                .MustAsync(async (dto, cancellationToken) =>
                {
                    var category = await _categoryRepository.GetById(dto.CategoryId);
                    if (category == null) return true;
                    return dto.Type == category.Type;
                })
                .WithMessage("El tipo de la transacción (Ingreso/Egreso) no coincide con el tipo de la categoría seleccionada.");
        }
    }
}