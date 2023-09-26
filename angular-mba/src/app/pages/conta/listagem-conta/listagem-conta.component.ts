import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Conta } from 'src/app/shared/models/conta';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { ContaService } from 'src/app/shared/services/conta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listagem-conta',
  templateUrl: './listagem-conta.component.html',
  styleUrls: ['./listagem-conta.component.scss']
})
export class ListagemContaComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'numero', 'agencia', 'saldo', 'cliente', 'funcoes'];
  dataSource = new MatTableDataSource<Conta>;
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _contaService: ContaService,
    private _clienteService: ClientesService
  )
  {}

  ngAfterViewInit() {
    this.listarContas(1, 5)
  }

  listarContas(page: number, pageSize: number) {
    this._contaService.listar_paginado(page, pageSize).subscribe(contas => {
      this._clienteService.listar().subscribe(clientes => {
        const contasNomesClientes = contas.map(conta => {
          const cliente = clientes.find(c => c.id === conta.cliente);

          if (cliente) 
            conta.nomeCliente = cliente.nome;

          return conta;
        });
        this.dataSource.data = contasNomesClientes;
      });
    });
  }

  onPageChange(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.listarContas(pageIndex, pageSize);
  }

  deletarConta(id: number){
    Swal.fire({
      title: 'Você tem certeza que deseja excluir?',
      text: "Não tem como reverter essa ação",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Excluir'
    }).then((result) => {
      if (result.isConfirmed) {
        this._contaService.deletar(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Sucesso',
              text: 'Conta excluida com sucesso!',
              showConfirmButton: false,
              timer: 1500
            })
            this.listarContas(1,5)
          },
          error: (error) => {
            console.error(error)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Erro ao excluir conta!',
            })
          }})
      }})}
}
