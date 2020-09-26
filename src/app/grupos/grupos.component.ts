import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

import { Grupo } from 'src/app/models/Grupo';
import { GruposService } from './grupos.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss'],
})
export class GruposComponent implements OnInit {
  constructor(private grupoService: GruposService) {}

  grupos: Observable<Grupo[]>;

  ngOnInit(): void {
    this.grupos = this.grupoService.getGrupos().pipe(
      catchError((error) => {
        console.error(error);
        return EMPTY;
      })
    );
  }
}
