# Estado del Proyecto FinanceTracker

## 1. Resumen de Seguridad Aplicada

### 🔴 Crítico - Resuelto
- **Credenciales expuestas**: Connection string y JWT Key removidos de `appsettings.json`. Ahora se leen de variables de entorno (`DB_*`, `JWT_KEY`).
- **JWT en localStorage**: Eliminado de `redux-persist`. El token ahora vive solo en memoria (Redux state).
- **Excepciones en controllers**: `BalanceController.cs` ya no expone stack traces.
- **Archivos sensibles en git**: Creado `Back-EndFinanceTracker/.gitignore` excluyendo `appsettings.json`, `*.user`, `*.tmp`, `.env`.
- **Docker secrets**: `.dockerignore` actualizado para excluir archivos de configuración.

---

## 2. Cambios Funcionales Implementados

### Refresh Token System
| Archivo | Cambio |
|---------|--------|
| `Models/User.cs` | Agregados `RefreshToken` y `RefreshTokenExpiry` |
| `Services/JwtAuthService.cs` | Método `generateRefreshToken()` |
| `Services/UserService.cs` | Método `RefreshToken()` + generación en Login/Register |
| `Controllers/UserController.cs` | Endpoint `POST /api/User/refresh` |
| `DTOs/RefreshTokenDTO.cs` | Nuevo DTO |
| Migración EF | `AddRefreshTokenFields` (aplicada a Neon DB) |

### Frontend - Refresh Token + Interceptor
| Archivo | Cambio |
|---------|--------|
| `src/utils/apiFetch.js` | Centraliza fetches, maneja refresh automático ante 401 |
| `src/redux/store.js` | Inicializa `apiFetch` para romper dependencia circular |
| `src/redux/validationReducer.js` | Agrega `refreshToken` al estado y casos de refresh |
| Todos los `*Action.js` | Reemplazado `fetch` directo por `apiFetch` |

### Configuración de Entornos
- **Backend**: `DotNetEnv` agregado. Lee `.env` local + variables de entorno del sistema.
- **Frontend**: `apiFetch` usa patrón de inicialización para evitar dependencia circular.

---

## 3. Errores Conocidos

### Error 1: libgssapi_krb5.so.2 - Docker
```
Error: libgssapi_krb5.so.2: cannot open shared object file: No such file or directory
```
**Causa:** La imagen `mcr.microsoft.com/dotnet/aspnet:10.0` no incluye las librerías nativas requeridas por Npgsql (conector PostgreSQL).

**Fix aplicado en `Dockerfile`:**
```dockerfile
RUN apt-get update && apt-get install -y --no-install-recommends libgssapi-krb5-2 && rm -rf /var/lib/apt/lists/*
```

### Error 2: Application exited early - Render
**Causa:** La app no leía la variable de entorno `PORT` que Render asigna dinámicamente.

**Fix aplicado en `Program.cs`:**
```csharp
var port = Environment.GetEnvironmentVariable("PORT") ?? "10000";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
```

### Error 3: Dependencia circular frontend
```
Uncaught ReferenceError: Cannot access '_z' before initialization
```
**Causa:** `store.js` → `validationReducer.js` → `refreshTokenAction.js` → `apiFetch.js` → `store.js`

**Fix aplicado en `apiFetch.js` + `store.js`:**
- `apiFetch.js` ya no importa `store` al inicio. Usa `initApiFetch(store)` que se llama al final de `store.js`.

---

## 4. Estado del Deploy

### Git
- **Último push exitoso:** Pendiente (hubo error `cannot lock ref`)
- **Commits locales sin pushear:** Fix de Dockerfile + Program.cs + Frontend fixes
- **Acción requerida:** Resolver conflicto git y pushear

### Variables de Entorno en Render (Backend)
Configurar en el panel de Render → Environment Variables:
```
DB_HOST=ep-hidden-tooth-anviyhw2.c-6.us-east-1.aws.neon.tech
DB_NAME=neondb
DB_USER=neondb_owner
DB_PASSWORD=npg_J0ytpK3xleiY
JWT_KEY=hQ8pZ2fW9rX5mN1vL0bK7jT4sC3aE6yG9uI2oP5dS8fG1hJ4kL7
```

### Variables de Entorno en Vercel (Frontend)
```
VITE_API_URL=https://financetracker-mbt7.onrender.com/api
```

---

## 5. Tareas Pendientes

### Prioridad Media
- [ ] Vulnerabilidad enumeración de usuarios: `UserController.cs:37` devuelve "Usuario no registrado" (404) en lugar de mensaje genérico

### Prioridad Baja
- [ ] Roles dinámicos: `JwtAuthService.cs:22` hardcodea rol "user"

### Post-Deploy
- [ ] Verificar que el deploy backend funcione tras pushear fixes
- [ ] Verificar que el deploy frontend funcione tras pushear fixes
- [ ] Testear flujo completo de login → refresh automático → logout
- [ ] Rotar credenciales de Neon y JWT Key (las anteriores quedaron expuestas en historial de git)

---

## 6. Comandos Útiles

### Backend
```bash
# Aplicar migraciones a la DB
dotnet ef database update -p Back-EndFinanceTracker

# Crear nueva migración
dotnet ef migrations add <Nombre> -p Back-EndFinanceTracker

# Ver user secrets
dotnet user-secrets list -p Back-EndFinanceTracker

# Build local
dotnet build Back-EndFinanceTracker
```

### Frontend
```bash
# Build production
cd Front-EndFinanceTracker && npm run build

# Dev server
cd Front-EndFinanceTracker && npm run dev
```

### Git (resolver push fallido)
```bash
git pull --rebase origin main
git push origin main
# Si persiste el conflicto:
git push --force origin main
```

---

## 7. Notas Importantes
- La migración `AddRefreshTokenFields` YA está aplicada en Neon DB
- Los `user-secrets` locales apuntan a Neon (para desarrollo local)
- El archivo `.env` del backend tiene las credenciales (ignorado por git)
- **IMPORTANTE:** Rotar credenciales de Neon y JWT Key antes de considerar en producción

---

*Última actualización: 29/04/2026*
