import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { payStore } from './stores/pay';

type PayInfo = {
  hourlyRate: number;
  hoursWorked: number;
};

@Component({
  selector: 'app-computed-signals',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  providers: [payStore],
  viewProviders: [],
  template: `
    <p>Computed Signals Component</p>
    <p>Your name is {{ myName() }}</p>
    <button (click)="embiggenation()" class="btn btn-primary">Click me!</button>

    <div>
      <p>Hourly rate: {{ info().hourlyRate }}</p>
      <p>Number of hours: {{ info().hoursWorked }}</p>
      <button (click)="add(1)" class="btn btn-secondary">Add 1 hour</button>
      <p>Predicted paycheck: {{ totalPay() }}</p>
    </div>
  `,
  styles: ``,
})
export class ComputedSignals {
  // inside a component, always* use signals for any state
  // inputs should be signals, outputs kind of are, and any state declared should be as well
  // don't do this:
  // myName = "Joe"

  myName = signal('Joe');

  embiggenation() {
    this.myName.update((old) => old.toUpperCase());
  }

  add(hours: number) {
    this.info.update((payInfo) => ({
      ...payInfo,
      hoursWorked: payInfo.hoursWorked + hours,
    }));
  }

  info = signal<PayInfo>({
    hourlyRate: 10.5,
    hoursWorked: 40,
  });

  protected store = inject(payStore);

  // "don't type public, always refactor to it"
  totalPay = computed(() => {
    // create variables for all the signals you are going to use here first
    // not required but a bit "preemptive"
    const pay = this.info().hourlyRate;
    const hours = this.info().hoursWorked;
    return pay * hours;
  });
}
