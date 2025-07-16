import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  imports: [],
  templateUrl: './perfil-usuario.html',
  styleUrl: './perfil-usuario.scss'
})
export class PerfilUsuario {
  nombre = "Juan";
  edad = 26;
  ocupacion = "Desarrollador FrontEnd";
}
