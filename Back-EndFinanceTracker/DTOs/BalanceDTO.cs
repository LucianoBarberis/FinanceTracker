using Back_EndFinanceTracker.Enums;

namespace Back_EndFinanceTracker.DTOs
{
    public class BalanceDTO
    {
        public decimal Total { get; set; }
        public TransactionType Type { get; set; }
    }
}
