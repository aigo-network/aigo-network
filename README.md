# AiGO

### Config environment:

- .env.development for development environment
- .env.production for production environment

### Update GraphQL

We use `codegen` and `graphql-request` to work with GraphQL API

Run GraphQL Codegen, it now loads from `https://dev.api.aigo.network`, checking `tools/codegen.ts`.

```
yarn codegen
```

After the first codegen running without update `src/api/mutation.ts` or `src/api/query.ts`, the `codegen` only update `graphql.schema` which is useful to enable IDE support like `GraphQL` extension of VSCode, help us write `mutation` and `query` with correct type checking from generated schema.

After updating mutation and query, re-run `codegen` to create new updated SDK which exposes wrapped functions for calling to GraphQL Endpoint

### Mapbox setup

Follow [this instruction](https://rnmapbox.github.io/docs/install) to setup Mapbox.

Need to setup Download secret key to be able to download Mapbox Native SDK:

- iOS: Add file `.netrc` (follow instruction) with secret key at home directory `~/.netrc`

```
machine api.mapbox.com
login mapbox
password <secret token>
```

- Android: Add `MAPBOX_DOWNLOADS_TOKEN=<secret token>` to home `~/.gradle/gradle.properties`

### Versioning
- Use `yarn versioning` command to automatically update version, buildNumber across Android, iOS and files
- `yarn versioning bump` will force version update even no changes detected.
