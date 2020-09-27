import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Cliente } from 'src/app/models/Cliente';

// import { Grupo } from 'src/app/models/Grupo';
// import { GruposService } from '../grupos.service';

@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.scss'],
})
export class GrupoFormComponent implements OnInit {
  formCliente: FormGroup;

  constructor() {}

  createForm(cliente: Cliente) {
    this.formCliente = new FormGroup({
      nome: new FormControl(cliente.nome),
      cpf: new FormControl(cliente.cpf),
      telefone: new FormControl(cliente.telefone),
    });
  }
  ngOnInit(): void {
    this.createForm(new Cliente());
  }
  onSubmit() {}
}
