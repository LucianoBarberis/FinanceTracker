using Back_EndFinanceTracker.Data;
using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;
using Back_EndFinanceTracker.Repository;
using Back_EndFinanceTracker.Services;
using Back_EndFinanceTracker.Validators;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Servicios
builder.Services.AddCors(options =>
{
    options.AddPolicy("useCors", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Services.AddScoped<ITrasactionService, TransactionService>();
builder.Services.AddScoped<IBalanceService, BalanceService>();

// Validators
builder.Services.AddScoped<IValidator<TransactionAddDTO>, TransactionAddValidations>();
builder.Services.AddScoped<IValidator<TransactionUpdateDTO>, TransactionUpdateValidation>();

// Entity Framework
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<FinanceContext>(options =>
{
    options.UseSqlServer(connectionString);
});

builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Repository's
builder.Services.AddScoped<IRepository<Transaction>, TransactionsRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}
app.UseCors("useCors");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
