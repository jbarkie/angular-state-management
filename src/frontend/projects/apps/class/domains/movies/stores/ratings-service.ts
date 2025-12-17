// This connects to and listens to the server-side events - when it gets messages, it dispatches an action (event) to anyone who cares

import { injectDispatch } from '@ngrx/signals/events';
import { MovieRatingInfo, ratingsEvents } from './ratings';

export class RatingsListener {
  #eventSource = new EventSource('/api/movies/ratings-channel');
  #sseEvents = injectDispatch(ratingsEvents);
  // TODO: dispatcher

  start() {
    this.#eventSource.addEventListener('rating', (event: MessageEvent) => {
      // this is the code that runs when a server rings the bell
      const converted = JSON.parse(event.data) as unknown as MovieRatingInfo;
      converted.id = crypto.randomUUID(); // we need an ID for our entity store
      this.#sseEvents.newRating(converted);
      console.log(event.data);
    });
  }

  close() {
    this.#eventSource.close();
  }
}
