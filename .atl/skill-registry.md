# Skill Registry

Updated: 2026-04-30

## Project Skills (.agents/skills/)

| Skill | Trigger |
|-------|----------|
| aspnet-core | ASP.NET Core, Blazor, Razor Pages, MVC, Minimal APIs, Web APIs, SignalR, gRPC, middleware, DI, auth, testing, deployment |
| containerize-aspnetcore | Containerize ASP.NET Core, Dockerfile, .dockerfile |
| aspnet-minimal-api-openapi | ASP.NET Minimal API, OpenAPI documentation |
| csharp-tunit | TUnit unit testing, data-driven tests |
| csharp-mstest | MSTest 3.x/4.x, modern assertions, data-driven tests |
| csharp-docs | C# XML documentation comments |
| csharp-nunit | NUnit unit testing, data-driven tests |
| csharp-xunit | XUnit unit testing, data-driven tests |
| csharp-async | C# async programming best practices |
| dotnet-upgrade | .NET framework upgrade analysis |
| dotnet-design-pattern-review | C#/.NET design pattern review |
| minimal-api-file-upload | File upload endpoints in ASP.NET minimal APIs (.NET 8+) |
| dotnet-best-practices | .NET/C# code best practices |
| accessibility | accessibility, a11y audit, WCAG compliance, screen reader, keyboard navigation |
| frontend-design | web components, pages, React components, HTML/CSS, UI design |
| seo | SEO, search engine optimization, meta tags, structured data |

## User Skills (~/.config/opencode/skills/)

| Skill | Trigger |
|-------|----------|
| skill-registry | update skills, skill registry, actualizar skills |
| issue-creation | GitHub issue, report bug, request feature |
| branch-pr | create PR, pull request, prepare changes |
| skill-creator | create new skill, add agent instructions, document AI patterns |
| go-testing | Go tests, Bubbletea TUI testing, teatest |
| judgment-day | judgment day, adversarial review, dual review, doble review |
| sdd-onboard | SDD onboarding, full SDD cycle walkthrough |
| sdd-archive | archive change, sync delta specs |
| sdd-verify | validate implementation, verify specs |
| sdd-apply | implement tasks, write code from specs |
| sdd-tasks | break down tasks, implementation checklist |
| sdd-design | technical design, architecture decisions |
| sdd-spec | write specifications, requirements, scenarios |
| sdd-propose | create proposal, change proposal |
| sdd-explore | explore ideas, investigate codebase |
| sdd-init | initialize SDD, sdd init, iniciar sdd |
| _shared | Internal SDD shared references (not invokable) |

## Notes

- Project-level skills override user-level skills with same name
- sdd-*, _shared, and skill-registry are internal (not user-invokable)
- Frontend stack: React 19 + Vite → use frontend-design when building UI
- Backend stack: ASP.NET Core 10 Minimal API → use aspnet-core + aspnet-minimal-api-openapi
- NO test framework detected → csharp-xunit/csharp-nunit/etc are available but not configured
