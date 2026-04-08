import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeServices } from './knowledge-services';

describe('KnowledgeServices', () => {
  let component: KnowledgeServices;
  let fixture: ComponentFixture<KnowledgeServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnowledgeServices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnowledgeServices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
