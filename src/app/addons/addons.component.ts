import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IFormData } from '../shared/models/formData.model';

@Component({
  selector: 'app-addons',
  imports: [CommonModule, FormsModule],
  templateUrl: './addons.component.html',
  styleUrl: './addons.component.scss',
})
export class AddonsComponent {
  @Input() data: Partial<IFormData['addons']> = {};
  @Input() billingCycle = '' as 'monthly' | 'yearly';
  @Output() formUpdate = new EventEmitter<number>();

  toggleAddon(id: number) {
    this.formUpdate.emit(id);
  }

  onItemKeyDown(event: KeyboardEvent, id: number, index: number) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.toggleAddon(id);
    }
  }
}
