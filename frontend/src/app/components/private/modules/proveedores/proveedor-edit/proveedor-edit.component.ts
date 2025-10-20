import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from '../../../../../services/proveedor.service';
import { Proveedor } from '../../../../../models/proveedor.model';

@Component({
  selector: 'app-proveedor-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './proveedor-edit.component.html',
  styleUrl: './proveedor-edit.component.css'
})
export class ProveedorEditComponent implements OnInit {
  proveedorForm!: FormGroup;
  error: string | null = null;
  successMessage: string | null = null;
  isSubmitting: boolean = false;
  isLoading: boolean = true;
  cif: string = '';
  proveedorOriginal: Proveedor | null = null;

  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadProveedor();
  }

  initForm(): void {
    this.proveedorForm = this.fb.group({
      cif: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(9)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      actividad: [''],
      direccion: [''],
      localidad: [''],
      codigoPostal: ['', [Validators.pattern(/^\d{5}$/)]],
      telefono: ['', [Validators.pattern(/^\d{9}$/)]]
    });
  }

  loadProveedor(): void {
    this.cif = this.route.snapshot.paramMap.get('cif') || '';

    if (!this.cif) {
      this.error = 'CIF no proporcionado';
      this.isLoading = false;
      return;
    }

    this.proveedorService.getProveedor(this.cif).subscribe({
      next: (proveedor) => {
        this.proveedorOriginal = proveedor;
        this.proveedorForm.patchValue(proveedor);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al cargar el proveedor. Por favor, inténtelo de nuevo.';
        this.isLoading = false;
        console.error('Error al cargar proveedor:', err);
      }
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

    // Obtenemos los valores del formulario, pero mantenemos el CIF original
    const proveedorActualizado: Proveedor = {
      ...this.proveedorForm.getRawValue(),
      cif: this.cif // Aseguramos que el CIF no cambie
    };

    this.proveedorService.updateProveedor(this.cif, proveedorActualizado).subscribe({
      next: (proveedor) => {
        this.successMessage = `Proveedor "${proveedor.nombre}" actualizado correctamente.`;
        this.isSubmitting = false;

        // Redirigir a la lista después de 1.5 segundos
        setTimeout(() => {
          this.router.navigate(['/dashboard/proveedores']);
        }, 1500);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al actualizar el proveedor. Por favor, inténtelo de nuevo.';
        this.isSubmitting = false;
        console.error('Error al actualizar proveedor:', err);

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
