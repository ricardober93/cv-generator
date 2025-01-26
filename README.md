# app-template

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.29. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## generar migraciones

para que se generen las migraciones desde los archivos de esquemas

```bash
bunx drizzle-kit generate
```

para ejecutar las migraciones
```bash
bunx drizzle-kit migrate
```