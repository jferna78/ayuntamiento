import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProveedorService } from '../../../../../services/proveedor.service';
import { Proveedor } from '../../../../../models/proveedor.model';

@Component({
  selector: 'app-proveedor-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proveedor-list.component.html',
  styleUrl: './proveedor-list.component.css'
})
export class ProveedorListComponent implements OnInit {
  proveedores: Proveedor[] = [];
  loading: boolean = true;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private proveedorService: ProveedorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProveedores();
  }

  loadProveedores(): void {
    this.loading = true;
    this.error = null;

    this.proveedorService.getProveedores().subscribe({
      next: (data) => {
        this.proveedores = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los proveedores. Por favor, inténtelo de nuevo.';
        this.loading = false;
        console.error('Error al cargar proveedores:', err);
      }
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/dashboard/proveedores/crear']);
  }

  navigateToEdit(cif: string): void {
    this.router.navigate(['/dashboard/proveedores/editar', cif]);
  }

  deleteProveedor(cif: string, nombre: string): void {
    const confirmacion = confirm(`¿Está seguro de que desea eliminar el proveedor "${nombre}"?\n\nEsta acción no se puede deshacer.`);

    if (confirmacion) {
      this.proveedorService.deleteProveedor(cif).subscribe({
        next: () => {
          this.successMessage = `Proveedor "${nombre}" eliminado correctamente.`;
          this.loadProveedores();

          // Limpiar mensaje de éxito después de 3 segundos
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
        },
        error: (err) => {
          this.error = err.error?.message || 'Error al eliminar el proveedor. Por favor, inténtelo de nuevo.';
          console.error('Error al eliminar proveedor:', err);

          // Limpiar mensaje de error después de 5 segundos
          setTimeout(() => {
            this.error = null;
          }, 5000);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
