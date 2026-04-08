import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsExplore } from './models-explore';

describe('ModelsExplore', () => {
  let component: ModelsExplore;
  let fixture: ComponentFixture<ModelsExplore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelsExplore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelsExplore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
