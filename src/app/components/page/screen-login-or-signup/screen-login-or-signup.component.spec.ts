import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenLoginOrSignupComponent } from './screen-login-or-signup.component';

describe('ScreenLoginOrSignupComponent', () => {
  let component: ScreenLoginOrSignupComponent;
  let fixture: ComponentFixture<ScreenLoginOrSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenLoginOrSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenLoginOrSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
