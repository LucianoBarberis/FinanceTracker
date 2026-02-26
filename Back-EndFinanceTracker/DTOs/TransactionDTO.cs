using Back_EndFinanceTracker.Enums;

namespace Back_EndFinanceTracker.DTOs
{
    public class TransactionDTO
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime DateTime { get; set; }
        public TransactionType Type { get; set; }
        public int CategoryId { get; set; }
    }
}
