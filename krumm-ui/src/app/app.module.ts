import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StatblockComponent } from './statblock.component';
import { CreepService } from './creep.service';
import { EditCreepComponent } from './edit-creep.component';
import { CreepDisplayComponent } from './creep-display.component';
import { CreepSearchComponent } from './creep-search.component';

@NgModule({
  declarations: [
    AppComponent,
    StatblockComponent,
    EditCreepComponent,
    CreepDisplayComponent,
    CreepSearchComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [CreepService],
  bootstrap: [AppComponent]
})
export class AppModule { }
