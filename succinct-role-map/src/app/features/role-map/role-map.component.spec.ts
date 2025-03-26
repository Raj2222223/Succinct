import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMapComponent } from './role-map.component';

describe('RoleMapComponent', () => {
  let component: RoleMapComponent;
  let fixture: ComponentFixture<RoleMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
