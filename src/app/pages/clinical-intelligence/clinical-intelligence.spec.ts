import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalIntelligence } from './clinical-intelligence';

describe('ClinicalIntelligence', () => {
  let component: ClinicalIntelligence;
  let fixture: ComponentFixture<ClinicalIntelligence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalIntelligence]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalIntelligence);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
