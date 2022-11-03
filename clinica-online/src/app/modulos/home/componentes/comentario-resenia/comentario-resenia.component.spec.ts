import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioReseniaComponent } from './comentario-resenia.component';

describe('ComentarioReseniaComponent', () => {
  let component: ComentarioReseniaComponent;
  let fixture: ComponentFixture<ComentarioReseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentarioReseniaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentarioReseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
