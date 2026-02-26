using Back_EndFinanceTracker.Enums;
using Back_EndFinanceTracker.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace Back_EndFinanceTracker.Data
{
    public class FinanceContext : DbContext
    {
        public FinanceContext(DbContextOptions<FinanceContext> options) : base(options) { }

        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 1. Configurar precisión para el dinero
            modelBuilder.Entity<Transaction>()
                .Property(t => t.Amount)
                .HasPrecision(18, 2);

            // 2. Sembrar categorías iniciales (Seed Data)
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Sueldo", Icon = "💰", Type = TransactionType.Ingreso },
                new Category { Id = 2, Name = "Venta", Icon = "📈", Type = TransactionType.Ingreso },
                new Category { Id = 3, Name = "Alimentación", Icon = "🍔", Type = TransactionType.Egreso },
                // El Id debe ser manual aquí porque estamos forzando el sembrado
                new Category { Id = 4, Name = "Transporte", Icon = "🚗", Type = TransactionType.Egreso },
                new Category { Id = 5, Name = "Ocio", Icon = "🎮", Type = TransactionType.Egreso }
            );

            base.OnModelCreating(modelBuilder);
        }
    }
}
