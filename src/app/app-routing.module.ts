import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  // { path: 'login', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  clicked = false;
}

