import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilingPersonalComponent } from './profiling-personal.component';

describe('ProfilingPersonalComponent', () => {
  let component: ProfilingPersonalComponent;
  let fixture: ComponentFixture<ProfilingPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilingPersonalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilingPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
