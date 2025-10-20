import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProveedorService } from '../../../../../services/proveedor.service';
import { Proveedor } from '../../../../../models/proveedor.model';

@Component({
  selector: 'app-proveedor-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './proveedor-create.component.html',
  styleUrl: './proveedor-create.component.css'
})
export class ProveedorCreateComponent implements OnInit {
  proveedorForm!: FormGroup;
  error: string | null = null;
  successMessage: string | null = null;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.proveedorForm = this.fb.group({
      cif: ['', [Validators.required, Validators.minLength(9)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      actividad: [''],
      direccion: [''],
      localidad: [''],
      codigoPostal: ['', [Validators.pattern(/^\d{5}$/)]],
      telefono: ['', [Validators.pattern(/^\d{9}$/)]]
    });
  }

  onSubmit(): void {
    if (this.proveedorForm.invalid) {
      this.markFormGroupTouched(this.proveedorForm);
      return;
    }

    this.isSubmitting = true;
    this.error = null;
    this.successMessage = null;

    const nuevoProveedor: Proveedor = this.proveedorForm.value;

    this.proveedorService.createProveedor(nuevoProveedor).subscribe({
      next: (proveedor) => {
        this.successMessage = `Proveedor "${proveedor.nombre}" creado correctamente.`;
        this.isSubmitting = false;

        // Redirigir a la lista después de 1.5 segundos
        setTimeout(() => {
          this.router.navigate(['/dashboard/proveedores']);
        }, 1500);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al crear el proveedor. Por favor, inténtelo de nuevo.';
        this.isSubmitting = false;
        console.error('Error al crear proveedor:', err);

        // Limpiar mensaje de error después de 5 segundos
        setTimeout(() => {
          this.error = null;
        }, 5000);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/proveedores']);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Helpers para validación en el template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.proveedorForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.proveedorForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return 'Este campo es obligatorio';
      }
      if (field.errors['minlength']) {
        return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      }
      if (field.errors['pattern']) {
        if (fieldName === 'codigoPostal') {
          return 'Debe tener 5 dígitos';
        }
        if (fieldName === 'telefono') {
          return 'Debe tener 9 dígitos';
        }
      }
    }
    return '';
  }
}
