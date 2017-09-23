import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Statblock } from './statblock.component';
import { CreepService } from './creep.service';

@NgModule({
  declarations: [
    AppComponent,
    Statblock,
  ],
  imports: [
    BrowserModule
  ],
  providers: [CreepService],
  bootstrap: [AppComponent]
})
export class AppModule { }
