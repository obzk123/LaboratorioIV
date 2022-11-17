import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { DashboardModule } from 'src/app/VistasCompartidas/home/dashboard.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ValidarCuentaComponent } from './componentes/validar-cuenta/validar-cuenta.component';
import { HomeComponent } from './componentes/home/home.component';
import { MisTurnosComponent } from './componentes/mis-turnos/mis-turnos.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { HorariosComponent } from './componentes/horarios/horarios.component';
import { ComentarioReseniaComponent } from './componentes/comentario-resenia/comentario-resenia.component';
import { AltaTurnoComponent } from './componentes/alta-turno/alta-turno.component';
import { MostrarEspecialidadesComponent } from './componentes/mostrar-especialidades/mostrar-especialidades.component';
import { MostrarEspecialistasComponent } from './componentes/mostrar-especialistas/mostrar-especialistas.component';
import { MostrarPacientesComponent } from './componentes/mostrar-pacientes/mostrar-pacientes.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { CargarHistoriaClinicaComponent } from './componentes/cargar-historia-clinica/cargar-historia-clinica.component';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
import { NgChartsModule } from 'ng2-charts';
import { MostrarUsuariosComponent } from './componentes/mostrar-usuarios/mostrar-usuarios.component';
import { PipeEspecialidadPipe } from '../../Pipes/pipe-especialidad.pipe'
import { FiltroNombrePipe } from '../../Pipes/filtro-nombre.pipe';
import { PrimerDirectivaDirective } from './directivas/primer-directiva.directive';
import { SegundaDirectivaDirective } from './directivas/segunda-directiva.directive'

@NgModule({
  declarations: [
    PerfilComponent,
    ValidarCuentaComponent,
    HomeComponent,
    MisTurnosComponent,
    TurnosComponent,
    HorariosComponent,
    ComentarioReseniaComponent,
    AltaTurnoComponent,
    MostrarEspecialidadesComponent,
    MostrarEspecialistasComponent,
    MostrarPacientesComponent,
    PacientesComponent,
    CargarHistoriaClinicaComponent,
    EstadisticasComponent,
    MostrarUsuariosComponent,
    PipeEspecialidadPipe,
    FiltroNombrePipe,
    PrimerDirectivaDirective,
    SegundaDirectivaDirective
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    NgChartsModule
  ],
  exports:[MostrarEspecialidadesComponent]
})
export class HomeModule { }
