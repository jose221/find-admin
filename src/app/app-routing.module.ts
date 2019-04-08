import { NotfoundComponent } from './error/notfound/notfound.component';
import { UserResolver } from './resolvers/user/user.resolver';
import { UserauthGuard } from './guards/auth/userauth.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { RegisterComponent } from './components/auth/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { HistorialComponent } from './niñi/historial/historial.component';

const routes: Routes = [
  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: { data: UserResolver }
  },
  { path: 'login', component: LoginComponent, canActivate: [UserauthGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [UserauthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [UserauthGuard]
  },
  {
    path: 'history',
    component: HistorialComponent,
    canActivate: [UserauthGuard]
  },
  {path:'**', component:NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
