import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCheckComponent } from './menu-check.component';

describe('MenuCheckComponent', () => {
  let component: MenuCheckComponent;
  let fixture: ComponentFixture<MenuCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
