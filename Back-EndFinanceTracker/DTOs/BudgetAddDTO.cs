namespace Back_EndFinanceTracker.DTOs
{
    public class BudgetAddDTO
    {
        public decimal Amount { get; set; }
        public int CategoryId { get; set; }
    }

    public class BudgetUpdateDTO : BudgetAddDTO
    {
        public int Id { get; set; }
    }
}
