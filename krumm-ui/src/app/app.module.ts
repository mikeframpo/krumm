import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StatblockComponent } from './statblock.component';
import { CreepService } from './creep.service';
import { EditCreepComponent } from './edit-creep.component';

@NgModule({
  declarations: [
    AppComponent,
    StatblockComponent,
    EditCreepComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CreepService],
  bootstrap: [AppComponent]
})
export class AppModule { }
