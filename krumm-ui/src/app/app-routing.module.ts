
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreepDisplayComponent } from './creep-display.component';
import { CreepListComponent } from './creep-list.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'creep/id/:id', component: CreepDisplayComponent },
  { path: 'creep/list', component: CreepListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
