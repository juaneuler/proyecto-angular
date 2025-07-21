import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Bigtitle } from '../../shared/directives/bigtitle';

@Component({
  selector: 'app-delete-form',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, Bigtitle],
  templateUrl: './delete-form.html',
  styleUrl: './delete-form.scss',
})
export class DeleteForm implements OnInit {

  @Output() studentDeleted = new EventEmitter<string>();

  studentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      dni: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d{6,7}$/),]),
      descripcion: new FormControl('', Validators.required),
    });
  }

  onDelete() {
    if (this.studentForm.valid) {
      const { dni } = this.studentForm.value;
      this.studentDeleted.emit(dni);
      this.onReset();
    }
  }

  onReset() {
    this.studentForm.reset();
  }
}
