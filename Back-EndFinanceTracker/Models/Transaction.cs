using Back_EndFinanceTracker.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_EndFinanceTracker.Models
{
    public class Transaction
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Description { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;

        [Required]
        public TransactionType Type { get; set; }

        [Required]
        public int CategoryId { get; set; }
        
        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }
    }
}
