import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PastBookingComponent } from './components/past-booking/past-booking.component';
import { AuthGuard } from './../../core/guards/auth.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'userProfile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bookings',
    component: PastBookingComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
