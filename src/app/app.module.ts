import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListasModule } from './listas/listas.module';
import { CadastrosModule } from './cadastros/cadastros.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ListasModule,
    CadastrosModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
