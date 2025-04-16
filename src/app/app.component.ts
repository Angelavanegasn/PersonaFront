import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';

import { EstadosService } from './services/estado/estados.service';
import { PaisService } from './services/Pais/pais.service';
import { PersonaService } from './services/Personas/persona.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  personaForm!: FormGroup;
  paises: any;
  estados: any;
  personas:any;

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
    );

    this.personaService.getAllPersonas().subscribe(resp => {
      this.personas = resp;
    },
    error =>{console.error(error) 

    }
  );
    
    
    this.personaForm.get('pais').valueChanges.subscribe(value =>{
      this.estadosService.getAllEstadosByPais(value.id).subscribe(resp =>{
        this.estados = resp;
        
      },
      error => {console.error(error)}
    );
  })

  

  }
  guardar(): void {
    this.personaService.savePersona(this.personaForm.value).subscribe(resp => {
      this.personaForm.reset();
    },
      error => { console.error(error) }
    )
  }


cargarEstadosPorPaisesId(event) {
  console.log(event.target.value);
  this.estadosService.getAllEstadosByPais(event.target.value).subscribe(resp => {
    this.estados = resp;
  },
    error => { console.error(error) }
  );

}

    
   
  }

