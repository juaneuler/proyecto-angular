import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Student } from '../../shared/entities';
import { Bigtitle } from '../../shared/directives/bigtitle';

@Component({
  selector: 'app-add-form',
  imports: [CommonModule, ReactiveFormsModule, Bigtitle],
  templateUrl: './add-form.html',
  styleUrl: './add-form.scss',
})
export class AddForm implements OnInit {
  studentForm!: FormGroup;
  @Output() studentAdded = new EventEmitter<Student>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.studentForm = this.fb.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      average: [
        '',
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
    });
  }

  onSubmit() {
    console.log('Formulario enviado!');
    this.studentAdded.emit(this.studentForm.value as Student);
  }

  onReset() {
    this.studentForm.reset();
  }
}
