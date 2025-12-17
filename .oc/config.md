# Commit Message Guidelines

Generate commit messages following the Conventional Commits specification.

## Format

```
<type>: <description>

[optional body]
```

## Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

## Rules

1. Use lowercase for the type
2. No scope (e.g., use `feat:` not `feat(api):`)
3. Use imperative mood in description ("add" not "added")
4. Keep the first line under 72 characters
5. Do not end the description with a period
6. Only return the commit message, no explanations or markdown formatting
