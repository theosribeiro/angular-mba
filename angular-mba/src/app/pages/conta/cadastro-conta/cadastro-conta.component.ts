import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente';
import { Conta } from 'src/app/shared/models/conta';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { ContaService } from 'src/app/shared/services/conta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-conta',
  templateUrl: './cadastro-conta.component.html',
  styleUrls: ['./cadastro-conta.component.scss']
})
export class CadastroContaComponent implements OnInit{
  
  editar;
  formGroup: FormGroup;
  clientes: Cliente[];

  constructor(
    private _clienteService: ClientesService,
    private _contaService: ContaService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.editar = false;
    
    this.formGroup = new FormGroup({
      id: new FormControl(null),
      numero: new FormControl('', Validators.required),
      agencia: new FormControl('', Validators.required),
      saldo: new FormControl('', Validators.required),
      cliente: new FormControl('', Validators.required)
    });

    this.clientes = [];
  }

  ngOnInit(): void {
      if (this._route.snapshot.params["id"]) {
        this.editar = true;
        this._contaService.pesquisarPorId(this._route.snapshot.params["id"]).subscribe(
          cliente => {
            this.formGroup.patchValue(cliente);
          }
        );
      }
      this.listarClientes();
  }

  listarClientes(): void {
    this._clienteService.listar().subscribe(values => {
      this.clientes = values;
    });
  }

  cadastrar() {
    const conta: Conta = this.formGroup.value;

    if (this.editar) {
      this._contaService.atualizar(conta).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Conta atualizada com sucesso!',
            showConfirmButton: false,
            timer: 1500
          });
          this._router.navigate(['/conta']);
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao atualizar conta!'
          });
        }
      });
    } else {
      this._contaService.inserir(conta).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Conta cadastrada com sucesso!',
            showConfirmButton: false,
            timer: 1500
          });
          this._router.navigate(['/conta']);
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao cadastrar conta!'
          });
        }
      });
    }
  }

}
