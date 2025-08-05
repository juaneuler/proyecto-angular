export interface Student {
    name: string;
    surname: string;
    age: number;
    dni: number;
    average: number;
    id: string;
}

export interface Course {
    name: string;
    code: string;
    credits: number;
    id: string;
}

export interface Inscription {
    alumnoDNI: string;
    cursoCodigo: string;
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