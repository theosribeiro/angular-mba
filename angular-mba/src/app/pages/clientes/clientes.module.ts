import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemClientesComponent } from './listagem-clientes/listagem-clientes.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ListagemClientesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    ListagemClientesComponent
  ]
})
export class ClientesModule { }
