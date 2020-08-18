import { SeatLayoutComponent } from './components/seat-layout/seat-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentHandlerComponent } from './components/payment-handler/payment-handler.component';

const routes: Routes = [
  {
    path: 'seatLayout',
    component: SeatLayoutComponent,
  },
  {
    path: 'paymentHandler',
    component: PaymentHandlerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
