import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { signalStore, type, withHooks } from '@ngrx/signals';
import { addEntity, removeEntity, withEntities } from '@ngrx/signals/entities';
import { eventGroup, injectDispatch, on, withReducer } from '@ngrx/signals/events';
import { withListenerState } from './listener-state.feature';

// this is going to keep a list of all the ratings we get from the SSE,
// and have a way to see them and delete one if we've seen it

export const ratingsCommands = eventGroup({
  source: 'Ratings SSE Commands',
  events: {
    startListening: type<void>(),
    stopListening: type<void>(),
  },
});

export const ratingsEvents = eventGroup({
  source: 'Ratings SSE Events',
  events: {
    newRating: type<MovieRatingInfo>(),
    ratingRemoved: type<string>(),
  },
});

export type MovieRatingInfo = {
  id: string;
  movie: {
    id: string;
    version: number;
  };
  rating: number;
};

export const ratingsStore = signalStore(
  withDevtools('RatingsStore'),
  withEntities<MovieRatingInfo>(),
  withReducer(
    on(ratingsEvents.newRating, (event) => addEntity(event.payload)),
    on(ratingsEvents.ratingRemoved, (event) => removeEntity(event.payload)),
  ),
  withListenerState(),
  withHooks({
    onInit() {
      const events = injectDispatch(ratingsCommands);
      events.startListening();
    },
    onDestroy() {
      const events = injectDispatch(ratingsCommands);
      events.stopListening();
    },
  }),
);
