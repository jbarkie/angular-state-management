import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

type PayInfo = {
  hourlyRate: number;
  hoursWorked: number;
};

const initialState: PayInfo = {
  hourlyRate: 25.59,
  hoursWorked: 40,
};

export const payStore = signalStore(
  withDevtools('Pay Store'),
  withState<PayInfo>(initialState),
  withHooks({
    onInit() {
      console.log('Pay Store initialized');
    },
    onDestroy() {
      console.log('Pay Store destroyed');
    },
  }),
  withMethods((store) => {
    // injection context
    // const client = inject(HttpClient);
    return {
      add: (hours: number) => {
        return patchState(store, {
          hoursWorked: store.hoursWorked() + hours,
        });
        // return {
        //   hoursWorked: store.hoursWorked() + hours,
        //   hourlyRate: store.hourlyRate(),
        // };
      },
    };
  }),
  withComputed((store) => {
    return {
      totalPay: computed(() => store.hourlyRate() * store.hoursWorked()),
    };
  }),
);

export class PayService {}
