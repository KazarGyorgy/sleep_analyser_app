import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  items!: MenuItem[];

  constructor(private router: Router) {}

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
  }

  navigateToHome(): void {
    this.router.navigateByUrl('home');
  }
}
