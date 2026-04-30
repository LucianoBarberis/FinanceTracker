# Imagen base del SDK para compilar
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Copiar archivos del proyecto y restaurar dependencias
COPY *.csproj ./
RUN dotnet restore

# Copiar el resto del código y compilar
COPY . ./
RUN dotnet publish -c Release -o out

# Imagen base del Runtime para ejecutar (más ligera)
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

# Instalar dependencias nativas para PostgreSQL (Npgsql)
RUN apt-get update && apt-get install -y --no-install-recommends libgssapi-krb5-2 && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/out .

# El puerto se configura dinámicamente desde Program.cs usando la variable PORT

ENTRYPOINT ["dotnet", "Back-EndFinanceTracker.dll"]
