import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Conta } from 'src/app/shared/models/conta';
import { SaqueDeposito } from 'src/app/shared/models/saqueDeposito';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { ContaService } from 'src/app/shared/services/conta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deposito-conta',
  templateUrl: './deposito-conta.component.html',
  styleUrls: ['./deposito-conta.component.scss']
})
export class DepositoContaComponent implements OnInit{

  formGroup: FormGroup;
  contas: Conta[];

  constructor(
    private _contaService: ContaService,
    private _clienteService: ClientesService,
    private _router: Router
  ) {
    this.formGroup = new FormGroup({
      valor: new FormControl('', Validators.required),
      conta: new FormControl('', Validators.required)
    });

    this.contas = [];
  }

  ngOnInit(): void {
      this.listarContas();
  }

  listarContas(): void {
    this._contaService.listar().subscribe(contas => {
      this._clienteService.listar().subscribe(clientes => {
        const contasClientes = contas.map(conta => {
          const cliente = clientes.find(c => c.id === conta.cliente);

          if (cliente)
            conta.nomeCliente = cliente.nome;

          return conta;
        });
        this.contas = contasClientes;
      });
    });
  }

  cadastrar(): void {
    const deposito: SaqueDeposito = this.formGroup.value;
    this._contaService.deposito(deposito).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Depósito cadastrado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });
        this._router.navigate(['/conta']);
      }, error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro ao cadastrar o depósito!',
        });
      }
    });
  }
}
