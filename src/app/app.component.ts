import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { StepsComponent } from './steps/steps.component';
import { PlanComponent } from './plan/plan.component';
import { AddonsComponent } from './addons/addons.component';
import { CommonModule } from '@angular/common';
import { IFormData } from './shared/models/formData.model';
import { SummaryComponent } from './summary/summary.component';
import { ThanksComponent } from './thanks/thanks.component';

const INFO_DATA = {
  name: '',
  email: '',
  phone: '',
  isValid: false,
};

const PLANS_DATA = {
  list: [
    {
      id: 1,
      img: '/images/icon-arcade.svg',
      title: 'Arcade',
      amount: {
        monthly: 9,
        yearly: 90,
      },
      extra: '2 months free',
    },
    {
      id: 2,
      img: '/images/icon-advanced.svg',
      title: 'Advanced',
      amount: {
        monthly: 12,
        yearly: 120,
      },
      extra: '2 months free',
    },
    {
      id: 3,
      img: '/images/icon-pro.svg',
      title: 'Pro',
      amount: {
        monthly: 15,
        yearly: 150,
      },
      extra: '2 months free',
    },
  ],
  selectedPlan: null,
  billingCycle: 'monthly' as IFormData['plans']['billingCycle'],
  isValid: false,
};

const ADDONS_DATA = {
  list: [
    {
      id: 1,
      title: 'Online service',
      subtitle: 'Access to multiplayer games',
      amount: {
        monthly: 1,
        yearly: 10,
      },
      selected: false,
    },
    {
      id: 2,
      title: 'Larger storage',
      subtitle: 'Extra 1TB of cloud save',
      amount: {
        monthly: 2,
        yearly: 20,
      },
      selected: false,
    },
    {
      id: 3,
      title: 'Customizable profile',
      subtitle: 'Custom theme on your profile',
      amount: {
        monthly: 2,
        yearly: 20,
      },
      selected: false,
    },
  ],
  isValid: false,
};

const INITIAL_DATA = {
  info: INFO_DATA,
  plans: PLANS_DATA,
  addons: ADDONS_DATA,
};

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    StepsComponent,
    InfoComponent,
    PlanComponent,
    AddonsComponent,
    SummaryComponent,
    ThanksComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  steps = 4;
  currentStep = 1;
  formData: IFormData = INITIAL_DATA;
  done = false;

  onInfoUpdate(data: Partial<IFormData['info']>) {
    this.formData.info = { ...this.formData.info, ...data };
  }

  onPlansUpdate(data: Partial<IFormData['plans']>) {
    this.formData.plans = { ...this.formData.plans, ...data };
  }

  onAddonsUpdate(id: number) {
    const updatedList = this.formData.addons.list.map((addon) =>
      addon.id === id ? { ...addon, selected: !addon.selected } : addon
    );
    const hasSelectedAddon = updatedList.some((addon) => addon.selected);
    this.formData.addons = {
      ...this.formData.addons,
      list: updatedList,
      isValid: hasSelectedAddon,
    };
  }

  onNextStep() {
    switch (this.currentStep) {
      case 1:
        if (this.formData.info.isValid) this.goNextStep();
        break;
      case 2:
        if (this.formData.plans.isValid) this.goNextStep();
        break;
      case 3:
        if (this.formData.addons.isValid) this.goNextStep();
        break;
      case 4:
        this.done = true;
        break;
    }
  }

  goNextStep() {
    this.currentStep = this.currentStep + 1;
  }

  onPrevStep() {
    if (this.currentStep > 1) {
      this.currentStep = this.currentStep - 1;
    }
  }

  goToPlanStep() {
    this.currentStep = 2;
  }
}
