import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleNodeComponent } from './role-node.component';

describe('RoleNodComponent', () => {
  let component: RoleNodeComponent;
  let fixture: ComponentFixture<RoleNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
