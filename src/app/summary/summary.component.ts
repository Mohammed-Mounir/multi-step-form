import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFormData } from '../shared/models/formData.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  @Input() data!: IFormData;
  @Output() goToPlanStep = new EventEmitter<void>();

  getSelectedAddons() {
    return this.data.addons.list.filter((addon) => addon.selected);
  }

  getTotalAmount() {
    const planAmount =
    this.data.plans.selectedPlan!.amount[this.data.plans.billingCycle];
    const addonsAmount = this.data.addons.list.reduce(
      (acc, addon) =>
        addon.selected ? acc + addon.amount[this.data.plans.billingCycle] : acc,
      0
    );
    return planAmount + addonsAmount;
  }

  getBillingCycleText() {
    return this.data.plans.billingCycle === 'monthly' ? 'mo' : 'yr';
  }

  onGoToPlanStep() {
    this.goToPlanStep.emit();
  }

}
