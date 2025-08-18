export interface Student {
    name: string;
    surname: string;
    age: number;
    dni: number;
    average: number;
    id: string;
    customId: string;
}

export interface StudentToAdd {
  dni: number;
  name: string;
  surname: string,
  age: number,
  average: number;
  customId: string;
}

export interface Course {
    name: string;
    code: string;
    credits: number;
    id: string;
    customId: string;
}

export interface Inscription {
    alumnoDNI: string;
    cursoCodigo: string;
    id?: string;
}

export interface CambioInscripcion {
  anterior: {
    alumnoDNI: string;
    cursoCodigo: string;
  };
  nueva: {
    alumnoDNI: string;
    cursoCodigo: string;
  };
}

export interface InscripcionDetalle {
  alumnoDNI: number;
  alumnoNombre: string;
  alumnoApellido: string;
  cursoCodigo: string;
  cursoNombre: string;
}

export interface User {
  id: string;
  nombre: string;
  rol: 'admin' | 'usuario';
}