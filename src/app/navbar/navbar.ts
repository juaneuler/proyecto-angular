import { Component, EventEmitter, Output } from '@angular/core';
import { Bigtitle } from '../../shared/directives/bigtitle';

@Component({
  selector: 'app-navbar',
  imports: [Bigtitle],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  @Output() activeSection = new EventEmitter<string>();

  navigate(section: string) {
    this.activeSection.emit(section);
  }
}
