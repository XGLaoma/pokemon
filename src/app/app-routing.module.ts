import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCardsComponent } from '../app/components/list-cards/list-cards.component';

const routes: Routes = [
  { path: 'inicio',            pathMatch: 'full',  component: ListCardsComponent },
  { path: '**',                pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
