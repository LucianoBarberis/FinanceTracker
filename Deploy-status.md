# Deploy Status - FinanceTracker Backend

## Estado Actual: ❌ FALLO EN DESPLIEGUE

**Fecha:** 2026-04-30  
**Último commit intentado:** `0806f6c` - Remove hardcoded port from Dockerfile  
**Servicio Render:** `srv-d7jqljtckfvc73dvfmh0`  
**URL:** https://financetracker-mbt7.onrender.com

---

## Problema Identificado

### Síntoma
- La aplicación inicia escuchando en puerto **7277** (hardcodeado)
- Se cae inmediatamente después de iniciar (`Application exited early`)
- Render reporta: `Port scan timeout reached, no open ports detected`

### Evidencia en Logs
```
Overriding HTTP_PORTS '8080' and HTTPS_PORTS ''. 
Binding to values defined by URLS instead 'http://0.0.0.0:7277'.
Now listening on: http://0.0.0.0:7277
Application is shutting down...
```

---

## Cambios Realizados

### 1. Fix Connection String (COMPLETADO)
**Problema:** Connection string tenía parámetros de SQL Server (`Trust Server Certificate=true`, `SSL Mode=Require`)  
**Solución:** Cambiado a formato Npgsql válido:
```
Host=ep-hidden-tooth-anviyhw2.c-6.us-east-1.aws.neon.tech;Database=neondb;Username=neondb_owner;Password=npg_J0ytpK3xleiY;sslmode=require
```

### 2. Fix Puerto Dinámico en Program.cs (COMPLETADO)
**Archivo:** `Back-EndFinanceTracker/Program.cs:27-28`  
**Cambio:**
```csharp
// Antes (hardcodeado)
builder.WebHost.UseUrls("http://0.0.0.0:7277");

// Después (dinámico)
var port = Environment.GetEnvironmentVariable("PORT") ?? "10000";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
```

### 3. Fix Dockerfile (COMPLETADO)
**Archivo:** `Back-EndFinanceTracker/Dockerfile`  
**Cambio:** Removida la línea que sobrescribía el puerto:
```dockerfile
# ELIMINADO (tenía prioridad sobre Program.cs):
ENV ASPNETCORE_URLS=http://+:7277
EXPOSE 7277
```

### 4. Fix Sintaxis CORS (COMPLETADO)
**Archivo:** `Back-EndFinanceTracker/Program.cs:63-75`  
**Problema:** Doble declaración `options.AddDefaultPolicy`  
**Estado:** Corregido

---

## Problema Persistente

**El puerto 7277 sigue apareciendo en los logs**, lo que indica que:

1. **Caché de Docker en Render:** El build anterior con `ENV ASPNETCORE_URLS=http://+:7277` puede estar cacheado
2. **Variable de entorno en Render:** Puede haber una variable `ASPNETCORE_URLS` configurada en el dashboard de Render
3. **Archivo no actualizado:** El Dockerfile en el repositorio podría no estar sincronizado

---

## Próximos Pasos Recomendados

### Inmediato (Crítico)
1. **Verificar variables de entorno en Render Dashboard:**
   - Ir a: https://dashboard.render.com/web/srv-d7jqljtckfvc73dvfmh0
   - Sección: Environment
   - Buscar y eliminar cualquier variable `ASPNETCORE_URLS` o `PORT` manual
   - Render asigna `PORT` automáticamente

2. **Limpiar caché y redeployar:**
   - En el dashboard de Render: Manual Deploy → Clear build cache & deploy
   - Esto fuerza a reconstruir la imagen desde cero

3. **Verificar el Dockerfile en el repo:**
   ```bash
   git show HEAD:Back-EndFinanceTracker/Dockerfile
   ```
   Debe mostrar que las líneas `ENV ASPNETCORE_URLS` y `EXPOSE 7277` NO están presentes

### Si el problema persiste
1. **Forzar puerto via variable de entorno en Render:**
   - Agregar variable: `ASPNETCORE_URLS=http://+:$PORT`
   
2. **Simplificar Program.cs:**
   Eliminar la configuración manual de URLs y dejar que Kestrel use la variable `ASPNETCORE_URLS` automáticamente

---

## Commits Relacionados

| Commit | Descripción | Estado |
|--------|-------------|--------|
| `86b8f30` | Fix CORS syntax error and configure dynamic PORT | ✅ En producción |
| `0806f6c` | Remove hardcoded port from Dockerfile | ⚠️ Pendiente de deploy limpio |

---

## Variables de Entorno Requeridas en Render

```
ConnectionStrings__DefaultConnection = Host=ep-hidden-tooth-anviyhw2.c-6.us-east-1.aws.neon.tech;Database=neondb;Username=neondb_owner;Password=npg_J0ytpK3xleiY;sslmode=require
Jwt__Key = [tu_jwt_key]
Jwt__Issuer = FinTrackAPI
Jwt__Audience = FinTrackWebApp
```

**NO configurar manualmente:** `PORT`, `ASPNETCORE_URLS`

---

## Notas Adicionales

- El error original de CORS era un efecto secundario del crash por connection string inválida
- La app funciona localmente pero falla en producción por configuración de puerto
- Render free tier puede tener cold starts que afecten el primer request
