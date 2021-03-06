import { ManualSpinnyService } from './core/services/manual-spinny/manual-spinny.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, AfterViewInit, HostListener, Inject, PLATFORM_ID, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  isDarkTheme = false;
  isShow = false;

  constructor(private overlay: OverlayContainer, private manualSpinnyService: ManualSpinnyService) {
    this.manualSpinnyService.spin$.next(true);
  }

  ngOnInit(): void {
    if (localStorage.getItem('isDarkTheme') === 'true') {
      this.toggleTheme({});
    }
  }

  ngAfterViewInit(): void {
    this.manualSpinnyService.spin$.next(false);
  }

  @HostListener('window:scroll')
  checkScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= 100) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  toggleTheme(event): void {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      this.overlay.getContainerElement().classList.add('dark-theme');
      localStorage.setItem('isDarkTheme', 'true');
    } else {
      this.overlay.getContainerElement().classList.remove('dark-theme');
      localStorage.setItem('isDarkTheme', 'false');
    }
  }

  gotoTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
