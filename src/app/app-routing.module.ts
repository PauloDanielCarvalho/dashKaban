import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { AuthGuard } from './helpers/auth.guard';
import { PrjectsComponent } from './views/home/prjects/prjects.component';
import { DashboardComponent } from './views/home/dashboard/dashboard.component';
import { SignupComponent } from './views/signup/signup.component';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: PrjectsComponent
    },
    {
      path: 'dashboard/:projectId',
      component: DashboardComponent
    }
  ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
