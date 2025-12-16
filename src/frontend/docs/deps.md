## "For an App' - what application devs create

- a single repo, early bound
  - npm dependencies are explicitly declared
  - early bound (the compiler can check it)
- outside - general purpose dependency (not specific like an app)
  - service call - late bound

## legacy peer deps

- must stay as close as possible to release cycle of Angular (major versions every 6 mos)
- always a tradeoff to skipping versions
  - harder to update from two versions behind
  - might miss important things that would improve app
  - often contains fixes for browser issues that've been introduced
