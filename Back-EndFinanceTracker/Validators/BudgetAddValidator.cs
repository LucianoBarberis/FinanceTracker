using Back_EndFinanceTracker.DTOs;
using FluentValidation;

namespace Back_EndFinanceTracker.Validators
{
    public class BudgetAddValidator : AbstractValidator<BudgetAddDTO>
    {
        public BudgetAddValidator()
        {
            RuleFor(x => x.Amount)
                .GreaterThan(0).WithMessage("El monto del presupuesto debe ser mayor a 0.");
            
            RuleFor(x => x.CategoryId)
                .NotEmpty().WithMessage("La categoría es obligatoria para definir un presupuesto.");
        }
    }
}
