
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreepDisplayComponent } from './creep-display.component';
import { CreepSearchComponent } from './creep-search.component';
import { EditCreepComponent } from './edit-creep.component';

const routes: Routes = [
  { path: 'creep/id/:id', component: CreepDisplayComponent },
  { path: 'creep/search', component: CreepSearchComponent },
  { path: 'creep/newcreep', component: EditCreepComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
