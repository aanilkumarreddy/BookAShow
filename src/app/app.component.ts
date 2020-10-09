import { isPlatformBrowser } from '@angular/common';
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
  topPosToStartShowing = 100;
  isBrowser = false;

  constructor(
    private overlay: OverlayContainer,
    private manualSpinnyService: ManualSpinnyService,
    @Inject(PLATFORM_ID) platformId: any,
  ) {
    this.manualSpinnyService.spin$.next(true);
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      if (sessionStorage.getItem('isDarkTheme') === 'true') {
        this.toggleTheme({});
      }
    }
  }

  ngAfterViewInit(): void {
    this.manualSpinnyService.spin$.next(false);
  }

  @HostListener('window:scroll')
  checkScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  toggleTheme(event): void {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme && this.isBrowser) {
      this.overlay.getContainerElement().classList.add('dark-theme');
      sessionStorage.setItem('isDarkTheme', 'true');
    } else if (this.isBrowser) {
      this.overlay.getContainerElement().classList.remove('dark-theme');
      sessionStorage.setItem('isDarkTheme', 'false');
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
