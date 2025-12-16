## Bundling

- Domains - features :
  - new "chunk" to be downloaded

- the "app" is `main.ts` - make it as small as possible

- index.html - links to what you need to run the app (i.e., JavaScript, CSS, etc.)
  - browser has to download all those before the application can start (if it doesn't already have them)

- loadChildren in routes files does "lazy loading" by default
  - don't load it until it's needed
  - `preloadAllModules`
