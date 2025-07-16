import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Student } from '../student/student';
import { Toolbar } from '../toolbar/toolbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Navbar, Student, Toolbar],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}