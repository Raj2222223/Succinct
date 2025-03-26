import { Injectable } from '@angular/core';
import { Role } from '../models/role.model';
import { Path } from '../models/path.model';
import { ROLE_CONNECTIONS } from '../constants/role.connections';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roles: Role[] = [
    { name: 'LETS PRUV IT', description: 'Entry role', x: 400, y: 50 },
    { name: 'PROOF VERIFIED', description: 'Verified by role holder', x: 400, y: 150 },
    { name: 'SP1UP', description: 'Dev/technical role', x: 500, y: 250 },
    { name: 'CARGO PROVER', description: 'Dev/technical role', x: 600, y: 150 },
    { name: 'PROOFER', description: 'Loyalty & participation', x: 450, y: 350 },
    { name: 'PROVER', description: 'High quality art/video', x: 300, y: 300 }, // Adjusted
    { name: 'SUPER PROVER', description: 'Top art/video contributor', x: 200, y: 400 }, // Adjusted
    { name: 'GAMEWINNER', description: 'Win 5 games', x: 550, y: 400 },
    { name: 'ALL IN SUCCINCT', description: '100% committed', x: 400, y: 450 },
    { name: 'ZK FRENS', description: 'Friends & top contributors', x: 650, y: 250 },
    { name: 'TRUTH PROVER', description: 'Unreleased: Tweet writers', x: 200, y: 200 },
    { name: 'PROGRAMMABLE TRUTH', description: 'Unreleased: Mindshare', x: 150, y: 300 },
    { name: 'PWOOF', description: 'Unreleased: Nomination only', x: 700, y: 350 }
  ];

  getRoles(): Role[] {
    return this.roles;
  }

  getPaths(): Path[] {
    const paths: Path[] = [];
    const roleMap = new Map(this.roles.map(role => [role.name, role]));

    for (const [source, targets] of Object.entries(ROLE_CONNECTIONS)) {
      const sourceRole = roleMap.get(source);
      if (!sourceRole) continue;

      targets.forEach(target => {
        const targetRole = roleMap.get(target);
        if (!targetRole) return;

        paths.push({
          x1: sourceRole.x,
          y1: sourceRole.y,
          x2: targetRole.x,
          y2: targetRole.y
        });
      });
    }
    return paths;
  }
}