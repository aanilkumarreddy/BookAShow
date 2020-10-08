import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MaterialModule } from './../../core/material-module/material.module';
import { SharedModule } from './../../shared/shared.module';
import { BookingRoutingModule } from './booking-routing.module';
import { SeatLayoutComponent } from './components/seat-layout/seat-layout.component';
import { PaymentHandlerComponent } from './components/payment-handler/payment-handler.component';
import { PaymentService } from './services/payment-service/payment.service';
import { BookingInfoService } from './services/booking-info/booking-info.service';
@NgModule({
  declarations: [SeatLayoutComponent, PaymentHandlerComponent],
  imports: [CommonModule, BookingRoutingModule, SharedModule, MaterialModule, FormsModule, ReactiveFormsModule],
  providers: [DatePipe, PaymentService, BookingInfoService],
})
export class BookingModule {}
