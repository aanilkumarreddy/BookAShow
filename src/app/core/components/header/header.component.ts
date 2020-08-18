import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleTheme: EventEmitter<any> = new EventEmitter<any>();

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {}

  changeTheme(): void {
    this.toggleTheme.emit();
  }

  login(): void {
    this.matDialog
      .open(LoginComponent, {
        width: '500px',
      })
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
      });
  }
}
