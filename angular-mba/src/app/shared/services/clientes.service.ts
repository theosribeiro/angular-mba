import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroment/enviroment'; 
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  api = `${enviroment.api}/clientes`;
  constructor(private httpClient: HttpClient) { }

  listar() : Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.api);
  }
}
