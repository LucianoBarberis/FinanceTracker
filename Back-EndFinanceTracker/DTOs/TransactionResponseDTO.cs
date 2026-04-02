namespace Back_EndFinanceTracker.DTOs
{
    public class TransactionResponseDTO
    {
        public TransactionDTO Transaction { get; set; } = null!;
        public string? AlertMessage { get; set; }
    }
}
