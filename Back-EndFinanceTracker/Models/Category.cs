using Back_EndFinanceTracker.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_EndFinanceTracker.Models
{
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Color { get; set; } = "#FFFFFF";

        public string Icon { get; set; } = "default-icon";

        [Required]
        public TransactionType Type { get; set; }
    }
}
