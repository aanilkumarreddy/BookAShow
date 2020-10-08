import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PastBookingComponent } from './components/past-booking/past-booking.component';
import { PastBookingCardComponent } from './components/past-booking/past-booking-card/past-booking-card.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordService } from './services/reset-password/reset-password.service';
import { MaterialModule } from './../../core/material-module/material.module';

@NgModule({
  declarations: [
    UserProfileComponent,
    ForgotPasswordComponent,
    PastBookingComponent,
    PastBookingCardComponent,
    ResetPasswordComponent,
  ],
  imports: [CommonModule, UserProfileRoutingModule, MaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule],
  providers: [ResetPasswordService],
})
export class UserProfileModule {}
