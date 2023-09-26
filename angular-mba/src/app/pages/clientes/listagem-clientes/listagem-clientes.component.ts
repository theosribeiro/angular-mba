import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/shared/models/cliente';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listagem-clientes',
  templateUrl: './listagem-clientes.component.html',
  styleUrls: ['./listagem-clientes.component.scss']
})
export class ListagemClientesComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'status', 'funcoes'];
  dataSource = new MatTableDataSource<Cliente>;
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private _clienteService: ClientesService){
  }

  ngAfterViewInit() {
    this.listarClientes(1, 5)
  }

  listarClientes(page: number, pageSize: number) {
    this._clienteService.listar_paginado(page, pageSize).subscribe(clientes => {
      this.dataSource.data = clientes;
    });
  }

  onPageChange(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.listarClientes(pageIndex, pageSize);
  }

  deletarCliente(id: number){
    Swal.fire({
      title: 'Você tem certeza que deseja excluir?',
      text: "Não tem como reverter essa ação",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Deletar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._clienteService.deletar(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Sucesso',
              text: 'Cliente excluido com sucesso!',
              showConfirmButton: false,
              timer: 1500
            })
            this.listarClientes(1,5)
          },
          error: (error) => {
            console.error(error)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Erro ao excluir o cliente!',
            })
          }})
      }})}
}

