import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheBienComponent } from './recherche-bien.component';

describe('NavBarComponent', () => {
  let component: RechercheBienComponent;
  let fixture: ComponentFixture<RechercheBienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheBienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
