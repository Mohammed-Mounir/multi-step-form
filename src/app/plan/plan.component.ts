import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IFormData, IPlan } from '../shared/models/formData.model';

@Component({
  selector: 'app-plan',
  imports: [CommonModule],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss',
})
export class PlanComponent {
  @Input() data!: IFormData['plans'];
  @Output() formUpdate = new EventEmitter<Partial<IFormData['plans']>>();

  onBillingCycle() {
    this.formUpdate.emit({
      ...this.data,
      billingCycle: this.data.billingCycle === 'monthly' ? 'yearly' : 'monthly',
    });
  }

  onPlanSelect(plan: IPlan) {
    this.formUpdate.emit({
      ...this.data,
      selectedPlan: plan,
      isValid: true,
    });
  }
}
