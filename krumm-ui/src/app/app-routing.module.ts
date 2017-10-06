
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreepDisplayComponent } from './creep-display.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'creep/id/:id', component: CreepDisplayComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
