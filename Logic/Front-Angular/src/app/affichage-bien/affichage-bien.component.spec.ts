import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageBienComponent } from './affichage-bien.component';

describe('AffichageBienComponent', () => {
  let component: AffichageBienComponent;
  let fixture: ComponentFixture<AffichageBienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichageBienComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichageBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
