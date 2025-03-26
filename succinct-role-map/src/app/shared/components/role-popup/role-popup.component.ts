import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Role } from '../../../core/models/role.model';

@Component({
  selector: 'app-role-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-popup.component.html',
  styleUrls: ['./role-popup.component.css']
})
export class RolePopupComponent {
  @Input() role!: Role;
  @Output() close = new EventEmitter<void>();
}