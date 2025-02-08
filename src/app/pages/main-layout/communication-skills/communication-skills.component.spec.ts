import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationSkillsComponent } from './communication-skills.component';

describe('CommunicationSkillsComponent', () => {
  let component: CommunicationSkillsComponent;
  let fixture: ComponentFixture<CommunicationSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunicationSkillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunicationSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
