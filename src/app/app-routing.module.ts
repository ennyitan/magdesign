import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllArticlesComponent } from './pages/all-articles/all-articles.component';

const routes: Routes = [
  {
    path: '',
    component: AllArticlesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
