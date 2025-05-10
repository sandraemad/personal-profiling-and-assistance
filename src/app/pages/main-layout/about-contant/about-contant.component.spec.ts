import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutContantComponent } from './about-contant.component';

describe('AboutContantComponent', () => {
  let component: AboutContantComponent;
  let fixture: ComponentFixture<AboutContantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutContantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutContantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
