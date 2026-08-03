import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './wizard.html',
  styleUrl: './wizard.css',
})
export class Wizard {


  paso: number = 1;
  wizardForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.wizardForm = this.fb.group({
      // Paso 1: Datos Personales
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // Paso 2: Dirección
      ciudad: ['', Validators.required],
      pais: ['', Validators.required]
    });
  }


  siguiente() {
    if (this.paso === 1 && (this.wizardForm.get('nombre')?.invalid || this.wizardForm.get('email')?.invalid)) {
      return; // No avanza si el paso 1 es inválido
    }
    this.paso++;
  }

  anterior() {
    this.paso--;
  }

  enviar() {
    if (this.wizardForm.valid) {
      console.log('Datos finales:', this.wizardForm.value);
      alert('¡Proceso completado con éxito!');
    }
  }


}
