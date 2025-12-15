import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { payStore } from './stores/pay';

@Component({
  selector: 'app-computed-signals',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  providers: [payStore],
  viewProviders: [],
  template: `
    <p>Computed Signals Component</p>
    <div>
      <p>Hourly rate: {{ store.hourlyRate() }}</p>
      <p>Number of hours: {{ store.hoursWorked() }}</p>
      <button (click)="store.add(1)" class="btn btn-secondary">Add 1 hour</button>
      <p>Predicted paycheck: {{ store.totalPay() }}</p>
    </div>
  `,
  styles: ``,
})
export class ComputedSignals {
  // inside a component, always* use signals for any state
  // inputs should be signals, outputs kind of are, and any state declared should be as well
  // don't do this:
  // myName = "Joe"

  // add(hours: number) {
  //   this.info.update((payInfo) => ({
  //     ...payInfo,
  //     hoursWorked: payInfo.hoursWorked + hours,
  //   }));
  // }

  protected store = inject(payStore);

  // "don't type public, always refactor to it"
  // totalPay = computed(() => {
  //   // create variables for all the signals you are going to use here first
  //   // not required but a bit "preemptive"
  //   const pay = this.info().hourlyRate;
  //   const hours = this.info().hoursWorked;
  //   return pay * hours;
  // });
}
