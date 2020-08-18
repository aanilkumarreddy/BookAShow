import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateTo(path: string): void {
    this.router.navigateByUrl('/home/search');
  }
}
