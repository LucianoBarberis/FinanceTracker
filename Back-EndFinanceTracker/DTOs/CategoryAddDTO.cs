using Back_EndFinanceTracker.Enums;
namespace Back_EndFinanceTracker.DTOs
{
    public class CategoryAddDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public TransactionType Type { get; set; }
    }
}
