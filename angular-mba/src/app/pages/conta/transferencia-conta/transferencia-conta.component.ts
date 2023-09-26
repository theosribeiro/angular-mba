import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Conta } from 'src/app/shared/models/conta';
import { ContaService } from 'src/app/shared/services/conta.service';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { Transferencia } from 'src/app/shared/models/transferencia';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferencia-conta',
  templateUrl: './transferencia-conta.component.html',
  styleUrls: ['./transferencia-conta.component.scss']
})
export class TransferenciaContaComponent implements OnInit{
  
  formGroup: FormGroup;
  contas: Conta[];

  constructor(
    private _contaService: ContaService,
    private _clienteService: ClientesService,
    private _router: Router
  ) {

    this.formGroup = new FormGroup({
      valor: new FormControl('', Validators.required),
      conta_destino: new FormControl('', Validators.required),
      conta_origem: new FormControl('', Validators.required)
    });

    this.contas = [];
  }
  ngOnInit(): void {
    this.listarContas();
  }

  listarContas(): void {
    this._contaService.listar().subscribe(contas => {
      this._clienteService.listar().subscribe(clientes => {
        const contasComNomesDeClientes = contas.map(conta => {
          const cliente = clientes.find(cliente => cliente.id === conta.cliente);
          if (cliente)
            conta.nomeCliente = cliente.nome;

          return conta;
        });
        this.contas = contasComNomesDeClientes;
      });
    });
  }

  cadastrar(): void {
    const transferencia: Transferencia = this.formGroup.value;
      this._contaService.transferencia(transferencia).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Transferência realizada com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
          this._router.navigate(['/conta']);
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao realizar a transferência!',
          });
        }
      });
    }

}
