import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seat-layout',
  templateUrl: './seat-layout.component.html',
  styleUrls: ['./seat-layout.component.scss'],
})
export class SeatLayoutComponent implements OnInit {
  seatsLayout = {
    totalRows: 9,
    seatsPerRow: 16,
    seatNaming: 'rowType',
    booked: [],
    disabled: ['2B'],
  };
  typeOfSeats: any;
  rows = [];
  newRows = [];
  constructor(private router: Router) {
    // this.seatForm = this.fB.group({});
  }

  ngOnInit(): void {
    const rows = [];
    let seatsInARow = [];
    let seatChar;
    if (
      this.seatsLayout !== undefined &&
      this.seatsLayout.hasOwnProperty('totalRows')
    ) {
      if (this.seatsLayout.seatNaming === 'rowType') {
        for (let row = 0; row < this.seatsLayout.totalRows; row++) {
          for (let seats = 0; seats < this.seatsLayout.seatsPerRow; seats++) {
            seatChar = String.fromCharCode(65 + seats);
            seatsInARow.push((row + 1).toString() + seatChar);
          }
          rows.push(seatsInARow);
          seatsInARow = [];
        }
      }
    }
    this.rows = rows;
  }

  seatAction(seat): void {
    // this.seatsLayout.booked = [seat];
    if (this.seatsLayout.booked.indexOf(seat) >= 0) {
      this.seatsLayout.booked = this.seatsLayout.booked.filter((bookedSeat) => {
        return bookedSeat !== seat;
      });
    } else {
      this.seatsLayout.booked.push(seat);
    }
  }

  bookSeats(): void {
    this.router.navigateByUrl('/booking/paymentHandler');
  }

  // seatConfig: any = null;
  // seatmap = [];
  // seatChartConfig = {
  //   showRowsLabel: true,
  //   showRowWisePricing: true,
  //   newSeatNoForRow: true,
  // };
  // cart = {
  //   selectedSeats: [],
  //   seatstoStore: [],
  //   totalamount: 0,
  //   cartId: '',
  //   eventId: 0,
  // };

  // constructor() {}

  // ngOnInit(): void {
  //   this.seatConfig = [
  //     {
  //       seat_price: 300,
  //       seat_map: [
  //         {
  //           seat_label: 'N',
  //           layout: '__cccccccccccc__ccccccccccccc__',
  //         },
  //         {
  //           seat_label: 'M',
  //           layout: '__cccccccccccc__ccccccccccccc__',
  //         },
  //         {
  //           seat_label: 'L',
  //           layout: '__cccccccccccc__ccccccccccccc__',
  //         },
  //         {
  //           seat_label: 'K',
  //           layout: '__cccccccccccc__ccccccccccccc__',
  //         },
  //         {
  //           seat_label: 'J',
  //           layout: '__cccccccccccc__ccccccccccccc__',
  //         },
  //         {
  //           seat_label: 'I',
  //           layout: '__cccccccccccc__ccccccccccccc__',
  //         },
  //         {
  //           seat_label: 'H',
  //           layout: '__cccccccccccc__ccccccccccccc__',
  //         },
  //         {
  //           seat_label: ' ',
  //           layout: '',
  //         },
  //       ],
  //     },
  //     {
  //       seat_price: 500,
  //       seat_map: [
  //         {
  //           seat_label: 'G',
  //           layout: '__cccccccccccc__ccccccccccccc__',
  //         },
  //         {
  //           seat_label: 'F',
  //           layout: '__cccccccccccc__ccccccccccccc__',
  //         },
  //         {
  //           seat_label: 'E',
  //           layout: '__cccccccccccc__ccccccccccccc__',
  //         },
  //         {
  //           seat_label: 'D',
  //           layout: '__cccccccccccc__ccccccccccccc__',
  //         },
  //         {
  //           seat_label: 'C',
  //           layout: '__cccccccccccc__ccccccccccccc__',
  //         },
  //         {
  //           seat_label: 'B',
  //           layout: '__cccccccccccc__ccccccccccccc__',
  //         },
  //         {
  //           seat_label: 'A',
  //           layout: '__cccccccccccc__ccccccccccccc__',
  //         },
  //         {
  //           seat_label: ' ',
  //           layout: '',
  //         },
  //       ],
  //     },
  //   ];

  //   this.processSeatChart(this.seatConfig);
  // }

  // processSeatChart(mapData: any[]): void {
  //   if (mapData.length > 0) {
  //     let seatNoCounter = 1;
  //     // for (let __counter = 0; __counter < mapData.length; __counter++) {

  //     mapData.forEach((data, index) => {
  //       let rowLabel = '';
  //       const itemMap = data.seat_map;

  //       // Get the label name and price
  //       rowLabel = 'Row ' + itemMap[0].seat_label + ' - ';
  //       if (itemMap[itemMap.length - 1].seat_label != ' ') {
  //         rowLabel += itemMap[itemMap.length - 1].seat_label;
  //       } else {
  //         rowLabel += itemMap[itemMap.length - 2].seat_label;
  //       }
  //       rowLabel += ' : Rs. ' + data.seat_price;

  //       itemMap.forEach((mapElement) => {
  //         const mapObj = {
  //           seatRowLabel: mapElement.seat_label,
  //           seats: [],
  //           seatPricingInformation: rowLabel,
  //         };
  //         rowLabel = '';
  //         const seatValArr = mapElement.layout.split('');
  //         if (this.seatChartConfig.newSeatNoForRow) {
  //           seatNoCounter = 1; // Reset the seat label counter for new row
  //         }
  //         let totalItemCounter = 1;
  //         seatValArr.forEach((item) => {
  //           const seatObj = {
  //             key: mapElement.seat_label + '_' + totalItemCounter,
  //             price: data['seat_price'],
  //             status: 'available',
  //           };

  //           if (item != '_') {
  //             seatObj['seatLabel'] =
  //               mapElement.seat_label + ' ' + seatNoCounter;
  //             if (seatNoCounter < 10) {
  //               seatObj['seatNo'] = '0' + seatNoCounter;
  //             } else {
  //               seatObj['seatNo'] = '' + seatNoCounter;
  //             }

  //             seatNoCounter++;
  //           } else {
  //             seatObj['seatLabel'] = '';
  //           }
  //           totalItemCounter++;
  //           mapObj['seats'].push(seatObj);
  //         });
  //         console.log(' \n\n\n Seat Objects ', mapObj);
  //         this.seatmap.push(mapObj);
  //       });
  //     });

  //     // }
  //   }
  // }

  // public selectSeat(seatObject: any): void {
  //   console.log('Seat to block: ', seatObject);
  //   if (seatObject.status === 'available') {
  //     seatObject.status = 'booked';
  //     this.cart.selectedSeats.push(seatObject.seatLabel);
  //     this.cart.seatstoStore.push(seatObject.key);
  //     this.cart.totalamount += seatObject.price;
  //   } else if (seatObject.status === 'booked') {
  //     seatObject.status = 'available';
  //     const seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
  //     if (seatIndex > -1) {
  //       this.cart.selectedSeats.splice(seatIndex, 1);
  //       this.cart.seatstoStore.splice(seatIndex, 1);
  //       this.cart.totalamount -= seatObject.price;
  //     }
  //   }
  // }

  // public blockSeats(seatsToBlock: string): void {
  //   if (seatsToBlock !== '') {
  //     const seatsToBlockArr = seatsToBlock.split(',');

  //     seatsToBlockArr.forEach((seat, index) => {
  //       const seatSplitArr = seat.split('_');
  //       console.log('Split seat: ', seatSplitArr);
  //       this.seatmap.forEach((element, index2) => {
  //         if (element.seatRowLabel === seatSplitArr[0]) {
  //           const seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
  //           if (seatObj) {
  //             seatObj['status'] = 'unavailable';
  //             this.seatmap[index2]['seats'][
  //               parseInt(seatSplitArr[1]) - 1
  //             ] = seatObj;

  //             return;
  //           }
  //         }
  //       });
  //     });

  //     // for (let index = 0; index < seatsToBlockArr.length; index++) {
  //     //   const seat = seatsToBlockArr[index] + '';
  //     //   var seatSplitArr = seat.split('_');
  //     //   console.log('Split seat: ', seatSplitArr);
  //     //   for (let index2 = 0; index2 < this.seatmap.length; index2++) {
  //     //     const element = this.seatmap[index2];
  //     //     if (element.seatRowLabel == seatSplitArr[0]) {
  //     //       var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
  //     //       if (seatObj) {

  //     //         seatObj['status'] = 'unavailable';
  //     //         this.seatmap[index2]['seats'][
  //     //           parseInt(seatSplitArr[1]) - 1
  //     //         ] = seatObj;

  //     //         break;
  //     //       }
  //     //     }
  //     //   }
  //     // }
  //   }
  // }
  // // processBooking() {}
}
