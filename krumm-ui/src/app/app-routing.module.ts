
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreepDisplayComponent } from './creep-display.component';
import { CreepSearchComponent } from './creep-search.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'creep/id/:id', component: CreepDisplayComponent },
  { path: 'creep/search', component: CreepSearchComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
