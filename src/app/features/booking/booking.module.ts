import { MaterialModule } from './../../core/material-module/material.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { SeatLayoutComponent } from './components/seat-layout/seat-layout.component';
import { PaymentHandlerComponent } from './components/payment-handler/payment-handler.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SeatLayoutComponent, PaymentHandlerComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class BookingModule {}
