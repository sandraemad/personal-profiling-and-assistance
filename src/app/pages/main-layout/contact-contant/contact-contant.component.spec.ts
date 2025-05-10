import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactContantComponent } from './contact-contant.component';

describe('ContactContantComponent', () => {
  let component: ContactContantComponent;
  let fixture: ComponentFixture<ContactContantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactContantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactContantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
