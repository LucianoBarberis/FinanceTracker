using Back_EndFinanceTracker.Data;
using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Models;
using Back_EndFinanceTracker.Repository;
using Back_EndFinanceTracker.Repository.imlple;
using Back_EndFinanceTracker.Services;
using Back_EndFinanceTracker.Services.imple;
using Back_EndFinanceTracker.Validators;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using System.Text;
using System.Threading.RateLimiting;

// Enable legacy timestamp behavior for Npgsql to avoid DateTime UTC issues during migration
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var builder = WebApplication.CreateBuilder(args);

// Configuración de URLs para escucha en LAN
builder.WebHost.UseUrls("http://0.0.0.0:7277");

// Configuraciones de JWT

var jwtSettings = builder.Configuration.GetSection("Jwt");
var secretKey = jwtSettings.GetValue<string>("Key") ?? throw new InvalidOperationException("JWT Key is missing");

// Servicios
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true, // Rechaza tokens expirados
            ValidateIssuerSigningKey = true, // Verifica que la firma coincida con nuestra llave secreta
            ValidIssuer = jwtSettings.GetValue<string>("Issuer"),
            ValidAudience = jwtSettings.GetValue<string>("Audience"),
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("useCors", policy =>
    {
        policy.SetIsOriginAllowed(origin => true)
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowCredentials();
    });
});

// Rate Limiter Configuration
builder.Services.AddRateLimiter(options =>
{
    // Política general para la app
    options.AddFixedWindowLimiter(policyName: "fixed", options =>
    {
        options.PermitLimit = 10;
        options.Window = TimeSpan.FromSeconds(10);
        options.QueueLimit = 2;
        options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
    });

    // Política estricta para Login y Register (Anti-brute force)
    options.AddFixedWindowLimiter(policyName: "auth_strict", options =>
    {
        options.PermitLimit = 3;
        options.Window = TimeSpan.FromMinutes(1);
        options.QueueLimit = 0;
    });

    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
});

builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<IBalanceService, BalanceService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IBudgetService, BudgetService>();
builder.Services.AddScoped<IJwtAuthService, JwtAuthService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddHttpContextAccessor();

// Validators
builder.Services.AddScoped<IValidator<TransactionAddDTO>, TransactionAddValidations>();
builder.Services.AddScoped<IValidator<TransactionUpdateDTO>, TransactionUpdateValidation>();
builder.Services.AddScoped<IValidator<CategoryAddDTO>, CategoriesAddValidator>();
builder.Services.AddScoped<IValidator<CategoryDto>, CategoriesUpdateValidator>();
builder.Services.AddScoped<IValidator<LoginDTO>, LoginValidator>();
builder.Services.AddScoped<IValidator<RegisterDTO>, RegisterValidator>();
builder.Services.AddScoped<IValidator<BudgetAddDTO>, BudgetAddValidator>();

// Entity Framework
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<FinanceContext>(options =>
{
    options.UseNpgsql(connectionString);
});

builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Repository's
builder.Services.AddScoped<ITransactionRepository, TransactionsRepository>();
builder.Services.AddScoped<IRepository<Category>, CategoryRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRepository<Budget>, BudgetRepository>();

var app = builder.Build();
app.UseCors("useCors");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

// app.UseCors debe ir antes de Authentication y Authorization
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();

// Comentamos la redirección a HTTPS para facilitar el despliegue en LAN sin certificados SSL
/*
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}
*/

app.MapControllers();
app.Run();
