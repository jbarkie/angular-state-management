import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { signalStoreFeature } from '@ngrx/signals';
import { Events, withEffects } from '@ngrx/signals/events';

import { ratingsCommands } from './ratings';
import { RatingsListener } from './ratings-service';

export function withListenerState() {
  return signalStoreFeature(
    withEffects((store, events = inject(Events), service = inject(RatingsListener)) => {
      return {
        start$: events.on(ratingsCommands.startListening).pipe(
          tapResponse({
            next: () => service.start(),
            error: (error) => console.error('Error starting ratings listener', error),
          }),
        ),
        stopListening$: events.on(ratingsCommands.stopListening).pipe(
          tapResponse({
            next: () => service.close(),
            error: (error) => console.error('Error stopping ratings listener', error),
          }),
        ),
      };
    }),
  );
}
