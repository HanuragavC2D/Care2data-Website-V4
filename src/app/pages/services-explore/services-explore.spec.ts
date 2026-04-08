import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesExplore } from './services-explore';

describe('ServicesExplore', () => {
  let component: ServicesExplore;
  let fixture: ComponentFixture<ServicesExplore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesExplore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesExplore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
