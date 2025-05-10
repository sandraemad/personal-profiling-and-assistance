import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnixityComponent } from './anixity.component';

describe('AnixityComponent', () => {
  let component: AnixityComponent;
  let fixture: ComponentFixture<AnixityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnixityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnixityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
