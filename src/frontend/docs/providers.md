# Providing services

## Components

If you provide it on the `providers: []` for a component, it will create a new instance of that service for that component and it will live as long as the component lives.

Any children components will be provided that same instance.

> Note: this is true, even if it is registered "higher" or has "provided in root".

- Fetch as late as possible, and as frequently as possible

## When you provide in a routes `providers: []`

- It is created and available for that route and all children routes
- It is created when the first `inject` is used
- But it doesn't go away, until they close the app.

## If you provide in the app's providers

- lazily created by default (not until injected) and provided globally
- available to anything in that app that needs it, and won't be destroyed (until app is closed)
- it should only be provided here
- at this level, they almost should never be "stateful" (reference data, stores, etc.)
- these are not necessarily "singletons" - even if you use `{ providedIn: 'root' }`

## If you need a "true" singleton service

- It should only be injected in `app.config`
