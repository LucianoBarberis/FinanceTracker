using Back_EndFinanceTracker.Enums;

namespace Back_EndFinanceTracker.DTOs
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public string Color {  get; set; } = string.Empty;
        public decimal Total { get; set; } = 0;
        public decimal Percentaje { get; set; } = decimal.Zero;
        public TransactionType Type { get; set; }
    }
}
