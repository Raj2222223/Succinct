import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../core/services/role.service';
import { Role } from '../../core/models/role.model';
import { Path } from '../../core/models/path.model';
import { RoleNodeComponent } from '../../shared/components/role-node/role-node.component';
import { RolePopupComponent } from '../../shared/components/role-popup/role-popup.component';

@Component({
  selector: 'app-role-map',
  standalone: true,
  imports: [CommonModule, RoleNodeComponent, RolePopupComponent],
  templateUrl: './role-map.component.html',
  styleUrls: ['./role-map.component.css']
})
export class RoleMapComponent implements OnInit, AfterViewInit {
  roles: Role[] = [];
  paths: Path[] = [];
  selectedRole: Role | null = null;
  svgWidth: number = 800;
  svgHeight: number = 600;
  unlockedRoles: Set<string> = new Set(['LETS PRUV IT']);

  @ViewChild('svgElement') svgElement!: ElementRef<SVGSVGElement>;

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.roles = this.roleService.getRoles();
    this.paths = this.roleService.getPaths();
    this.adjustCoordinates();
  }

  ngAfterViewInit() {
    const lines = this.svgElement.nativeElement.querySelectorAll('.path-line') as NodeListOf<SVGLineElement>;
    lines.forEach((line: SVGLineElement) => {
      const length = Math.sqrt(
        Math.pow(Number(line.getAttribute('x2')) - Number(line.getAttribute('x1')), 2) +
        Math.pow(Number(line.getAttribute('y2')) - Number(line.getAttribute('y1')), 2)
      );
      line.setAttribute('stroke-dasharray', `${length}`);
      line.setAttribute('stroke-dashoffset', `${length}`);
    });
  }

  selectRole(role: Role) {
    this.selectedRole = role;
    this.unlockRoles(role);
  }

  isRoleUnlocked(roleName: string): boolean {
    return this.unlockedRoles.has(roleName);
  }

  isPathUnlocked(path: Path): boolean {
    const sourceRole = this.roles.find(r => r.x === path.x1 && r.y === path.y1);
    const targetRole = this.roles.find(r => r.x === path.x2 && r.y === path.y2);
    // If either role is not found, return false
    if (!sourceRole || !targetRole) {
      return false;
    }
    return this.unlockedRoles.has(sourceRole.name) && this.unlockedRoles.has(targetRole.name);
  }

  private unlockRoles(role: Role) {
    if (role.name === 'LETS PRUV IT') {
      this.unlockedRoles.add('PROOF VERIFIED');
    } else if (role.name === 'PROOF VERIFIED') {
      this.roles.forEach(r => {
        if (r.name !== 'LETS PRUV IT' && r.name !== 'PROOF VERIFIED') {
          this.unlockedRoles.add(r.name);
        }
      });
    }
  }

  private adjustCoordinates() {
    const padding = 50;
    const minX = Math.min(...this.roles.map(role => role.x));
    const minY = Math.min(...this.roles.map(role => role.y));
    const maxX = Math.max(...this.roles.map(role => role.x));
    const maxY = Math.max(...this.roles.map(role => role.y));

    const scaleX = (this.svgWidth - 2 * padding) / (maxX - minX);
    const scaleY = (this.svgHeight - 2 * padding) / (maxY - minY);
    const scale = Math.min(scaleX, scaleY);

    this.roles = this.roles.map(role => ({
      ...role,
      x: padding + (role.x - minX) * scale,
      y: padding + (role.y - minY) * scale
    }));

    this.paths = this.paths.map(path => ({
      x1: padding + (path.x1 - minX) * scale,
      y1: padding + (path.y1 - minY) * scale,
      x2: padding + (path.x2 - minX) * scale,
      y2: padding + (path.y2 - minY) * scale
    }));
  }
}

