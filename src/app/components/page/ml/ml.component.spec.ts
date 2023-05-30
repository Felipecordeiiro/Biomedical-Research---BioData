import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MLComponent } from './ml.component';

describe('MLComponent', () => {
  let component: MLComponent;
  let fixture: ComponentFixture<MLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MLComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
