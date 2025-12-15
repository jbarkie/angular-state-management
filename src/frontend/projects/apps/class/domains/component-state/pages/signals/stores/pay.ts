import { signalStore, withHooks, withState } from '@ngrx/signals';

type PayInfo = {
  hourlyRate: number;
  hoursWorked: number;
};

const initialState: PayInfo = {
  hourlyRate: 0,
  hoursWorked: 0,
};

export const payStore = signalStore(
  withState<PayInfo>(initialState),
  withHooks({
    onInit() {
      console.log('Pay Store initialized');
    },
    onDestroy() {
      console.log('Pay Store destroyed');
    },
  }),
);

export class PayService {}
