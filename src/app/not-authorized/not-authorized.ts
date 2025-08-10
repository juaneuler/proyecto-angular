import { Component } from '@angular/core';
import { Bigtitle } from '../../shared/directives/bigtitle';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../../shared/enums/routes';

@Component({
  selector: 'app-not-authorized',
  imports: [Bigtitle, RouterModule],
  templateUrl: './not-authorized.html',
  styleUrl: './not-authorized.scss',
})
export class NotAuthorized {
  readonly routes = AppRoutes;
}
