import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemUsuarioComponent } from './listagem-usuario/listagem-usuario.component';
import { ListagemClientesComponent } from './listagem-clientes/listagem-clientes.component';



@NgModule({
  declarations: [
    ListagemUsuarioComponent,
    ListagemClientesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ClientesModule { }
