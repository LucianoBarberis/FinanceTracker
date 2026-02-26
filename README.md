# Finance Tracker - Fullstack Project

Este es un proyecto personal desarrollado con el objetivo de practicar y mejorar habilidades en el desarrollo de aplicaciones web fullstack, enfocándose principalmente en **ASP.NET Core Web API** para el backend y **React** para el frontend.

## 🚀 Tecnologías Utilizadas

### Backend (`Back-EndFinanceTracker`)
- **Framework:** .NET 10.0 (ASP.NET Core Web API).
- **ORM:** Entity Framework Core (SQL Server).
- **Validación:** FluentValidation para asegurar la integridad de los datos de entrada.
- **Documentación:** OpenAPI con Scalar para una interfaz de pruebas interactiva.
- **Arquitectura:** Patrón de Repositorio y Capa de Servicio para una separación de responsabilidades clara.

### Frontend (`Front-EndFinanceTracker`)
- **Framework:** React 19.
- **Herramienta de Construcción:** Vite.
- **Estado Global:** Redux Toolkit para una gestión centralizada y eficiente del estado.
- **Enrutamiento:** React Router.
- **Gráficos:** Recharts para la visualización de datos financieros.
- **Validación:** Zod para validaciones en el lado del cliente.
- **Estilos:** CSS Vanilla (enfocado en flexibilidad y aprendizaje).

## 📁 Estructura del Proyecto

### Backend
- **Controllers:** Manejan las peticiones HTTP y delegan la lógica a los servicios.
- **Services:** Contienen la lógica de negocio principal.
- **Repository:** Encargados de la comunicación directa con la base de datos a través de EF Core.
- **DTOs (Data Transfer Objects):** Objetos específicos para el envío y recepción de datos, evitando exponer las entidades del modelo directamente.
- **Validators:** Reglas de validación desacopladas de los modelos mediante FluentValidation.

### Frontend
- **src/redux:** Configuración del store, reducers y acciones globales.
- **src/features:** Módulos específicos de la aplicación (ej. Transacciones, Categorías).
- **src/hooks:** Hooks personalizados para reutilizar lógica de componentes (ej. `useForm`).
- **src/services:** Funciones para interactuar con la API del backend.

## 🛠️ Configuración y Ejecución

### Requisitos Previos
- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Node.js](https://nodejs.org/) (v18 o superior)
- [SQL Server](https://www.microsoft.com/sql-server)

### Ejecución del Backend
1. Navega a la carpeta `Back-EndFinanceTracker`.
2. Configura tu cadena de conexión en `appsettings.json`.
3. Ejecuta las migraciones para crear la base de datos:
   ```bash
   dotnet ef database update
   ```
4. Inicia el servidor:
   ```bash
   dotnet run
   ```
5. Accede a la documentación en `https://localhost:PORT/scalar/v1`.

### Ejecución del Frontend
1. Navega a la carpeta `Front-EndFinanceTracker`.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## 🎓 Enfoque Educativo
Este proyecto se ha construido siguiendo principios de código limpio y separación de capas. El backend está diseñado para ser escalable, permitiendo cambiar el motor de base de datos o la lógica de negocio con un impacto mínimo en los controladores. El frontend aprovecha las últimas características de React 19 y Redux para mantener un flujo de datos predecible y una interfaz reactiva.
