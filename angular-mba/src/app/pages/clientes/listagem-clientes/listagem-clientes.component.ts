import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/shared/models/cliente';
import { ClientesService } from 'src/app/shared/services/clientes.service';

@Component({
  selector: 'app-listagem-clientes',
  templateUrl: './listagem-clientes.component.html',
  styleUrls: ['./listagem-clientes.component.scss']
})
export class ListagemClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private _clienteService: ClientesService) {

  }

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes() {
    this._clienteService.listar().subscribe((clientesApi: any) => {
      this.clientes = clientesApi.results;
      console.log("clientesApi: ", clientesApi)
    })
    
  }


}
