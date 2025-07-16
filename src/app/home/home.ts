import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Toolbar } from '../toolbar/toolbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Navbar, Toolbar],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}