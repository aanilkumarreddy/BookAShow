import { Injectable, ElementRef } from '@angular/core';
//cdk
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';

//rxjs
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ManualSpinnyService {
  spinnerTopRef = this.cdkSpinnerCreate();

  spin$: Subject<boolean> = new Subject();

  constructor(private overlay: Overlay) {
    this.spin$.subscribe((res) => {
      if (res) {
        // tslint:disable-next-line: no-unused-expression
        this.spinnerTopRef.hasAttached() ? this.stopSpinner() : null;
        this.showSpinner();
      } else {
        this.stopSpinner();
      }
    });
    // this.spin$
    //   .asObservable()
    //   .pipe(
    //     map((val) => (val ? 1 : -1)),
    //     scan((acc, one) => (acc + one >= 0 ? acc + one : 0), 0)
    //   )
    //   .subscribe((res) => {
    //     if (res === 1) {
    //       this.showSpinner();
    //     } else if (res === 0) {
    //       // tslint:disable-next-line: no-unused-expression
    //       this.spinnerTopRef.hasAttached() ? this.stopSpinner() : null;
    //     }
    //   });
  }

  private cdkSpinnerCreate(): any {
    // this.overlay.
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      // panelClass: 'custom-overlay',
    });
  }

  showSpinner(): void {
    this.spinnerTopRef.attach(new ComponentPortal(MatSpinner));
  }

  stopSpinner(): void {
    this.spinnerTopRef.detach();
  }
}
