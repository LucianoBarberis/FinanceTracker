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

// Load .env file if it exists
DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();

// Configuraciones de JWT

var jwtSettings = builder.Configuration.GetSection("Jwt");
var secretKey = jwtSettings.GetValue<string>("Key");
if (string.IsNullOrEmpty(secretKey))
{
    var jwtKeyEnv = Environment.GetEnvironmentVariable("JWT_KEY");
    if (string.IsNullOrEmpty(jwtKeyEnv))
        throw new InvalidOperationException("JWT Key is missing");
    secretKey = jwtKeyEnv;
}

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
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings.GetValue<string>("Issuer"),
            ValidAudience = jwtSettings.GetValue<string>("Audience"),
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
        };
    });

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
                "https://yourfintracker.vercel.app",
                "http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithExposedHeaders("X-Total-Count", "X-Page-Size", "X-Current-Page");
    });
});

// Security Headers
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.AddServerHeader = false;
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
if (string.IsNullOrEmpty(connectionString))
{
    var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
    var dbName = Environment.GetEnvironmentVariable("DB_NAME");
    var dbUser = Environment.GetEnvironmentVariable("DB_USER");
    var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");
    if (string.IsNullOrEmpty(dbHost) || string.IsNullOrEmpty(dbName))
        throw new InvalidOperationException("Database connection string is missing");
    connectionString = $"Host={dbHost};Database={dbName};Username={dbUser};Password={dbPassword};sslmode=require";
}
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

// Usar la política de CORS por defecto
app.UseCors();

// Security Headers Middleware
app.Use(async (context, next) =>
{
    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Append("X-Frame-Options", "DENY");
    context.Response.Headers.Append("X-XSS-Protection", "0");
    context.Response.Headers.Append("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");
    context.Response.Headers.Append("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    await next();
});


if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/", () => Results.Ok(new { Message = "Finance Tracker API is running", Status = "Healthy" }));

app.MapControllers();
app.Run();
