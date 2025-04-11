import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';

import { EstadosService } from './services/estado/estados.service';
import { PaisService } from './services/Pais/pais.service';
import { PersonaService } from './services/Personas/persona.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  personaForm!: FormGroup;
  paises: any;
  estados: any;

  title = 'ProyectoAngularPersonal';

  constructor(
    public fb: FormBuilder,
    public estadosService: EstadosService,
    public paisService: PaisService,
    public personaService: PersonaService

  ) {
  }


  ngOnInit(): void {
    this.personaForm = this.fb.group({

      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required]
    });;

    this.paisService.getAllPaises().subscribe(resp => {
      this.paises = resp;

    },
      error => { console.error(error) }
    )


  }
  guardar(): void {

  }

    cargarEstadosPorPaisesId(event) {
      console.log(event.target.value);
    this.estadosService.getAllEstadosByPais(event.target.value ).subscribe(resp => {
      this.estados = resp;
    },
      error => {console.error(error)}
  );

}
  
/*
cargarEstadosPorPaisesId(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const idPais = Number(selectElement.value); 

  this.estadosService.getAllEstadoByPais(idPais).subscribe(
    resp => {
      this.estados = resp;
    },
    error => {
      console.error(error);
    }
  );
}
*/
    
  
   
  }

