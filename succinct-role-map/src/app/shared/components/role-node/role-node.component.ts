import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Role } from '../../../core/models/role.model';

@Component({
  selector: 'app-role-node',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-node.component.html',
  styleUrls: ['./role-node.component.css']
})
export class RoleNodeComponent {
  @Input() role!: Role;
  @Input() isUnlocked: boolean = false;
  hover = false;

  playSound() {
    if (this.isUnlocked) {
      const audio = new Audio();
      audio.src = 'assets/sounds/click.mp3';
      audio.load();
      audio.play();
    }
  }
}