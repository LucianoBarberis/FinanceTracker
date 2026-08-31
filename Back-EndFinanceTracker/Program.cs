using Back_EndFinanceTracker.Data;
using Back_EndFinanceTracker.DTOs;
using Back_EndFinanceTracker.Exceptions;
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

// Configurar puerto para Render (variable de entorno PORT)
var port = Environment.GetEnvironmentVariable("PORT") ?? "10000";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

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
builder.Configuration["Jwt:Key"] = secretKey;

// Security: validate the JWT signing key is strong enough to be used in any environment.
// A weak or placeholder key would allow anyone to forge tokens.
if (Encoding.UTF8.GetByteCount(secretKey) < 32)
    throw new InvalidOperationException("JWT_KEY must be at least 32 bytes (256 bits) when encoded as UTF-8. Generate a strong key with: openssl rand -base64 48");

if (secretKey.Contains("replace-me") || secretKey.Contains("dev-secret-key") || secretKey.Contains("change-me"))
    throw new InvalidOperationException("JWT_KEY must not be a placeholder/dev key in any environment. Generate a strong key with: openssl rand -base64 48");

// Fallback for JWT Issuer
var jwtIssuer = jwtSettings.GetValue<string>("Issuer");
if (string.IsNullOrEmpty(jwtIssuer))
{
    jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "FinTrackAPI";
    builder.Configuration["Jwt:Issuer"] = jwtIssuer;
}

// Fallback for JWT Audience
var jwtAudience = jwtSettings.GetValue<string>("Audience");
if (string.IsNullOrEmpty(jwtAudience))
{
    jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "FinTrackWebApp";
    builder.Configuration["Jwt:Audience"] = jwtAudience;
}

// Fallback for JWT ExpireMinutes
var jwtExpire = jwtSettings.GetValue<string>("ExpireMinutes");
if (string.IsNullOrEmpty(jwtExpire))
{
    jwtExpire = Environment.GetEnvironmentVariable("JWT_EXPIRE_MINUTES") ?? "30";
    builder.Configuration["Jwt:ExpireMinutes"] = jwtExpire;
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

// CORS origins from configuration/env (no hardcoded placeholder domains).
// Priority: appsettings[Cors:AllowedOrigins] -> CORS_ALLOWED_ORIGINS env var -> localhost dev fallback.
var corsOrigins = builder.Configuration["Cors:AllowedOrigins"];
if (string.IsNullOrEmpty(corsOrigins))
    corsOrigins = Environment.GetEnvironmentVariable("CORS_ALLOWED_ORIGINS") ?? "http://localhost:5173";

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        var allowedOrigins = corsOrigins.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        policy.WithOrigins(allowedOrigins)
            .WithMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .WithHeaders("Content-Type", "Authorization")
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
    // Política general para la app — PermitLimit=20 allows normal UI load + interaction
    options.AddSlidingWindowLimiter(policyName: "fixed", options =>
    {
        options.PermitLimit = 20;
        options.Window = TimeSpan.FromSeconds(10);
        // 1s segments smooth the reset and avoid boundary-window bypass
        options.SegmentsPerWindow = 10;
        options.QueueLimit = 4;
        options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
    });

    // Strict policy for Login and Register (anti-brute-force)
    options.AddSlidingWindowLimiter(policyName: "auth_strict", options =>
    {
        options.PermitLimit = 5;
        options.Window = TimeSpan.FromMinutes(1);
        options.SegmentsPerWindow = 6;
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
builder.Services.AddScoped<IValidator<RefreshTokenDTO>, RefreshTokenValidator>();

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
    var sslMode = Environment.GetEnvironmentVariable("DB_SSLMODE") ?? "require";
    connectionString = $"Host={dbHost};Database={dbName};Username={dbUser};Password={dbPassword};sslmode={sslMode}";
}
builder.Services.AddDbContext<FinanceContext>(options =>
{
    options.UseNpgsql(connectionString);
});

builder.Services.AddAuthorization();
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
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

// Global exception handler — catches unhandled exceptions from controllers
// that lack their own try/catch (Budget, Categories, Transaction).
// Returns a generic ProblemDetails 500 and logs the exception server-side.
app.UseExceptionHandler();

// Security Headers Middleware
app.Use(async (context, next) =>
{
    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Append("X-Frame-Options", "DENY");
    context.Response.Headers.Append("X-XSS-Protection", "0");
    context.Response.Headers.Append("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");
    context.Response.Headers.Append("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    context.Response.Headers.Append("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'");
    await next();
});

app.UseAuthentication();
app.UseAuthorization();
app.UseRateLimiter();

app.MapControllers();

// OpenAPI + Scalar
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.Run();
