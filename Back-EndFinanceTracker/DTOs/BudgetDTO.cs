namespace Back_EndFinanceTracker.DTOs
{
    public class BudgetDTO
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public int CategoryId { get; set; }
        public int UserId { get; set; }
        public decimal SpentAmount { get; set; }
    }
}
