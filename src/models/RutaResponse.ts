export interface RutaResponse {
  metadata: {
    fecha: string;
    hora: string;
    [key: string]: any; // PARA MAS CAMPITOS
  };
  nodos: Array<{
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string; // URL o base64
    mensaje: string;
    lat: number;
    lng: number;
  }>;
}
