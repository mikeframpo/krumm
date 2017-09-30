import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    BrowserModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [CreepService],
  bootstrap: [AppComponent]
})
export class AppModule { }
