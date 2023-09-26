import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ListagemContaComponent } from './listagem-conta/listagem-conta.component';
import { CadastroContaComponent } from './cadastro-conta/cadastro-conta.component';
import { DepositoContaComponent } from './deposito-conta/deposito-conta.component';
import { SaqueContaComponent } from './saque-conta/saque-conta.component';
import { TransferenciaContaComponent } from './transferencia-conta/transferencia-conta.component';



@NgModule({
  declarations: [
    CadastroContaComponent,
    ListagemContaComponent,
    DepositoContaComponent,
    SaqueContaComponent,
    TransferenciaContaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [provideNgxMask()],
  exports: [
    CadastroContaComponent, 
    ListagemContaComponent,
    SaqueContaComponent,
    TransferenciaContaComponent
  ]
})
export class ContaModule { }
