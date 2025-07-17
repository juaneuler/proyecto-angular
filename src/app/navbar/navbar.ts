import { Component } from '@angular/core';
import { Bigtitle } from '../../shared/directives/bigtitle';

@Component({
  selector: 'app-navbar',
  imports: [Bigtitle],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

}
