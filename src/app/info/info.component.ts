import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { phoneValidator } from '../../utils/phoneValidator';
import { CommonModule } from '@angular/common';
import { IFormData } from '../shared/models/formData.model';

@Component({
  selector: 'app-info',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent implements OnInit, OnChanges {
  @Input() data: Partial<IFormData['info']> = {};
  @Output() formUpdate = new EventEmitter<Partial<IFormData['info']>>();

  infoForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, phoneValidator()]),
  });

  ngOnInit(): void {
    this.infoForm.statusChanges.subscribe((status) => {
      const value = this.infoForm.value;

      this.formUpdate.emit({
        name: value.name ?? '',
        email: value.email ?? '',
        phone: value.phone ?? '',
        isValid: status === 'VALID',
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { isValid, ...values } = changes['data']?.currentValue || {};
    if (changes['data']?.currentValue) {
      this.infoForm.patchValue(values);
    }
  }
}
