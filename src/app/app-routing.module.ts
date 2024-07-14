import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityDetailComponent } from './components/city-detail/city-detail.component';
import { cityGuard } from './core/guards/city-guard.guard';
const routes: Routes = [
  { path: 'city-list', component: CityListComponent},
  { path: 'weather/:city', component: CityDetailComponent, canActivate: [cityGuard]},
  { path: '**', redirectTo: '/city-list' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
