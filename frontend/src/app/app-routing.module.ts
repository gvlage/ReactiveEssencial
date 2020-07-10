import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { IncrementalSearchComponent } from './views/incremental-search/incremental.search/incremental.search.component';
import { RetryErrorComponent } from './views/retry-errors/retry-error/retry-error.component';
import { CombineResultsComponent } from './views/combine-results/combine-results.component';


const routes: Routes = [
  { path:'', redirectTo: 'home', pathMatch: 'full'},
  { path:'home', component: HomeComponent},
  { path:'incremental-search', component: IncrementalSearchComponent},
  { path:'retry-errors', component: RetryErrorComponent},
  { path:'combine-results', component: CombineResultsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
