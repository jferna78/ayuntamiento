import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Proveedor } from '../models/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private apiUrl = `${environment.apiUrl}/proveedores`;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getProveedor(cif: string): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.apiUrl}/${cif}`, { headers: this.getAuthHeaders() });
  }

  createProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.apiUrl, proveedor, { headers: this.getAuthHeaders() });
  }

  updateProveedor(cif: string, proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(`${this.apiUrl}/${cif}`, proveedor, { headers: this.getAuthHeaders() });
  }

  deleteProveedor(cif: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cif}`, { headers: this.getAuthHeaders() });
  }
}
