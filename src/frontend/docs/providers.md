# Providing services

## Components

If you provide it on the `providers: []` for a component, it will create a new instance of that service for that component and it will live as long as the component lives.

Any children components will be provided that same instance.

> Note: this is true, even if it is registered "higher" or has "provided in root".

- Fetch as late as possible, and as frequently as possible
