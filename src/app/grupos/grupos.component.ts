import { Component, OnInit } from '@angular/core';

import { Grupo } from 'src/app/models/Grupo';
import { GruposService } from './grupos.service';
@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss'],
})
export class GruposComponent implements OnInit {
  constructor(private grupoService: GruposService) {}

  grupos: Grupo[];

  ngOnInit(): void {
    this.grupos = this.grupoService.getGrupos();
  }
}
