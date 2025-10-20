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

  deleteProveedor(): void {
    // Funcionalidad pendiente de implementar
    console.log('Eliminar proveedor - Funcionalidad pendiente');
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
