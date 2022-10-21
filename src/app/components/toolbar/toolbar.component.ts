import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  items!: MenuItem[];
  userMenu!: MenuItem[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Páciensek',
        icon: 'pi pi-fw pi-users',
        routerLink: ['users'],
      },
      {
        label: 'Orvosok',
        icon: 'pi pi-fw pi-users',
        routerLink: ['doctors'],
      },
    ];

    this.userMenu = [
      {
        label: 'Jelszó módosítása',
        icon: 'pi pi-fw pi-lock',
        routerLink: ['change-password'],
      },
    ];
  }

  navigateToHome(): void {
    this.router.navigateByUrl('home');
  }

  onLogout() {
    this.router.navigateByUrl('login');
    this.authService.logout();
  }
}
