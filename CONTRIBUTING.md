# Contributing

Thanks for improving `dominican-republic-geodata`.

## Development

```bash
npm ci
npm run typecheck
npm test
npm run build
```

## Data Quality

- Keep province, region, and metadata exports stable and typed.
- Preserve deterministic ordering when changing datasets.
- Add or update tests for data corrections.
- Document any source or shape change in the README.

## Release Readiness

Before publishing, run:

```bash
npm run typecheck
npm test
npm run build
npm pack --dry-run
```

The package should remain small, dependency-free at runtime, and easy to use in Node, browsers, and TypeScript projects.
