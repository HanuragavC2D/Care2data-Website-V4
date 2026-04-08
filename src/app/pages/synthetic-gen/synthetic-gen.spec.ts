import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyntheticGen } from './synthetic-gen';

describe('SyntheticGen', () => {
  let component: SyntheticGen;
  let fixture: ComponentFixture<SyntheticGen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SyntheticGen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyntheticGen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
