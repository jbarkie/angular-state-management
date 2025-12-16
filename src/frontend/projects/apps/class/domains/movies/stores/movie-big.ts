import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject, isDevMode } from '@angular/core';
import { mapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe } from 'rxjs';
import { ApiMovie, movieRatingsList } from '../pages/lists/types';
import { MovieService } from './movie-service';

const storeRatingFilters = [...movieRatingsList, 'all'] as const;
type FilterSelections = (typeof storeRatingFilters)[number];
type MovieStoreState = {
  filterByStarRating: FilterSelections;
};

export const bigMovieStore = signalStore(
  withDevtools('BigMovieStore'),
  withEntities<ApiMovie>(),
  withProps(() => ({
    developing: isDevMode(),
    filterByOptions: storeRatingFilters,
  })),
  withState<MovieStoreState>({
    filterByStarRating: 'all',
  }),
  withMethods((store) => {
    const service = inject(MovieService);
    return {
      _load: rxMethod<void>(
        pipe(
          exhaustMap(() =>
            service.getAllMovies().pipe(
              mapResponse({
                next: (movies) => patchState(store, setEntities(movies)),
                error: (error) => console.error('Error loading movies', error), // TODO: change state - dislay error or something
              }),
            ),
          ),
        ),
      ),
      //load: async () => fetch('/api/movies').then((m) => m.json() as unknown as ApiMovie[]),
      setFilter: (filterByStarRating: FilterSelections) =>
        patchState(store, { filterByStarRating }),
    };
  }),
  withHooks({
    onInit(store) {
      store._load(); // initialize data whenever store is created
      // but I don' want more than one of these at a time
    },
  }),
);
