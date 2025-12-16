import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { List } from './lists/list';
import { ApiMovie } from './lists/types';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-movies-pages-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, DatePipe, List],
  template: `
    <ui-feature-page pageName="The Movies">
      @if (movies.hasValue()) {
        <app-movie-list [movies]="movies.value()"></app-movie-list>
      } @else {
        @if (movies.isLoading()) {
          <p>Loading movies...</p>
        }
      }
    </ui-feature-page>
  `,
  styles: ``,
})
export class HomePage {
  // type safety - late bound call (no build error, maybe runtime error)
  movies = httpResource<ApiMovie[]>(() => '/api/movies');
}
