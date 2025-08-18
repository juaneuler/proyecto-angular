import { Component, OnInit } from '@angular/core';
import { UsersTable } from '../../components/users-table/users-table';
import { UsuariosState } from '../../usuarios-estado';
import { User } from '../../../../../shared/entities';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutes } from '../../../../../shared/enums/routes';
import { Bigtitle } from '../../../../../shared/directives/bigtitle';

@Component({
  selector: 'app-usuarios',
  imports: [UsersTable, AsyncPipe, CommonModule, RouterModule, Bigtitle],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios implements OnInit {
  users$: Observable<User[]>;
  readonly AppRoutes = AppRoutes;

  constructor(private usuariosState: UsuariosState) {
    this.users$ = this.usuariosState.users$;
  }

  ngOnInit(): void {
    this.usuariosState.loadUsers().subscribe();
  }
}