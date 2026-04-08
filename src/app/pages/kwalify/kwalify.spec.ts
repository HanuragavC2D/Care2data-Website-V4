import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kwalify } from './kwalify';

describe('Kwalify', () => {
  let component: Kwalify;
  let fixture: ComponentFixture<Kwalify>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kwalify]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Kwalify);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
