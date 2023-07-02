import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './Auth/auth-guard.service';
import { MainComponent } from './main.component';

const routes: Routes = [

  {
    path: '', component: MainComponent, canActivate: [AuthGuardService], children: [
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
