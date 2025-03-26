import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleMapComponent } from './features/role-map/role-map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RoleMapComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}