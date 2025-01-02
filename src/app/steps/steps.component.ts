import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-steps',
  imports: [CommonModule],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss',
})
export class StepsComponent {
  @Input() steps = 0;
  @Input() currentStep = 0;

  counter(i: number) {
    return new Array(i);
  }

  getTitle(i: number) {
    switch (i) {
      case 1:
        return 'Your Info';
      case 2:
        return 'Select Plan';
      case 3:
        return 'Add-ons';
      case 4:
        return 'Summary';
      default:
        return '';
    }
  }
}
