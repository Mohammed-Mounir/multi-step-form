export interface IFormData {
  info: {
    name: string;
    email: string;
    phone: string;
    isValid: boolean;
  };
  plans: {
    list: IPlan[];
    selectedPlan: null | IPlan;
    billingCycle: 'monthly' | 'yearly';
    isValid: boolean;
  };
  addons: {
    list: AddonType[];
    isValid: boolean;
  };
}

export interface IPlan {
  id: number;
  img: string;
  title: string;
  amount: {
    monthly: number;
    yearly: number;
  };
  extra: string;
}

export type AddonType = {
  id: number;
  title: string;
  subtitle: string;
  amount: {
    monthly: number;
    yearly: number;
  };
  selected: boolean;
};
