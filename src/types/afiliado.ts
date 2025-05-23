// ✅ /types/afiliado.ts
export interface Afiliado {
  id: string;
  nombre: string;
  apellido: string;
  sexo: "M" | "F" | "X";
  esTitular: boolean;
  numeroAfiliado: string;
  dni: string;
  cuil: string;
  dniFamiliar?: string;
  cuilFamiliar?: string;
  fechaNacimiento: string;
  fechaIngreso: string;
  direccion: string;
  piso?: string;
  departamento?: string;
  telefono: string;
  email: string;
  estado?: string;
  observaciones?: string;
}

export type AfiliadoInput = Omit<Afiliado, "id">;
