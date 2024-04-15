import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { TeamComponent } from './team/team.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { RegistrationComponent } from './registration/registration.component';
import { authguardGuard } from './shared/authguard.guard';
import { AddTeamComponent } from './add-team/add-team.component';
import { AddPlayerComponent } from './add-player/add-player.component';

const routes: Routes = [
  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', component: DashboardComponent, canActivate: [authguardGuard] },
  { path: 'teams', component: TeamComponent, canActivate: [authguardGuard] },
  { path: 'teams/:name', component: TeamDetailsComponent, canActivate: [authguardGuard] },
  { path: 'add-team', component: AddTeamComponent, canActivate: [authguardGuard] },
  { path: 'add-team/:name', component: AddTeamComponent, canActivate: [authguardGuard] },
  { path: 'add-player', component: AddPlayerComponent, canActivate: [authguardGuard] },
  { path: 'add-player/:teamId/:playerName', component: AddPlayerComponent, canActivate: [authguardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
