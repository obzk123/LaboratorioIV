import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarEspecialistasComponent } from './mostrar-especialistas.component';

describe('MostrarEspecialistasComponent', () => {
  let component: MostrarEspecialistasComponent;
  let fixture: ComponentFixture<MostrarEspecialistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarEspecialistasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
