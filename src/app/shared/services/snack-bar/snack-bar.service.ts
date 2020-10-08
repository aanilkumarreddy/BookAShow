import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private matSnackBar: MatSnackBar) {}

  openSnack(message, css): void {
    this.matSnackBar.dismiss();
    this.matSnackBar.open(message, ' ', {
      panelClass: css,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 3000,
    });
  }

  error(message): void {
    this.openSnack(message, 'error-color');
  }

  success(message): void {
    this.openSnack(message, 'success-color');
  }

  warning(message): void {
    this.openSnack(message, 'warning-color');
  }
}
