export interface Proveedor {
  cif: string;          // CIF único del proveedor (identificador principal)
  nombre: string;       // Nombre comercial o razón social
  actividad: string;    // Descripción de la actividad o sector
  direccion: string;    // Dirección fiscal o principal
  localidad: string;    // Municipio o ciudad
  codigoPostal: string; // Código postal
  telefono: string;     // Teléfono de contacto
}
