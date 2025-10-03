import axios, {AxiosError} from "axios";
import { RutaResponse } from "../models/RutaResponse";

const API = axios.create({
  baseURL: "https://approute.free.beeceptor.com", // AQUI CAMBIAMOS LA URL
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // 10s DE ESPERA POR SI SE CAE EL SERVER xd
});

// 🔹 Interceptor para respuestas
API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let mensaje = "Error inesperado. Intenta de nuevo.";

    if (error.response) {
      // ERRORES 400 o 500
      switch (error.response.status) {
        case 400:
          mensaje = "Solicitud inválida.";
          break;
        case 401:
          mensaje = "No autorizado. Inicia sesión de nuevo.";
          // MANDAR A LOGIN DENUVO
          break;
        case 403:
          mensaje = "No tienes permisos para esta acción.";
          break;
        case 404:
          mensaje = "Recurso no encontrado.";
          break;
        case 500:
          mensaje = "Error del servidor. Intenta más tarde.";
          break;
      }
    } else if (error.request) {
      // No hubo respuesta del servidor
      mensaje = "No hay conexión con el servidor.";
    } else {
      // Error en la configuración de la request
      mensaje = `Error: ${error.message}`;
    }

    // Lanzamos el mensaje procesado
    return Promise.reject(new Error(mensaje));
  }
);



/* ------------- Endpoints de Autenticación -------------*/

export const login = async (email: string, password: string) => {
  const response = await API.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (userData: {
  nombre: string;
  email: string;
  password: string;
}) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

/* -------------- Endpoints de Rutas---------------*/

export const buscarRuta = async (
  origen: string,
  destino: string
): Promise<RutaResponse> => {
  const response = await API.post("/rutas", { origen, destino });
  return response.data;
};

export const getRutasRecientes = async () => {
  const response = await API.get("/rutas/recientes");
  return response.data;
};

/* ----------------- Endpoints de Perfil ---------------*/

export const getPerfil = async () => {
  const response = await API.get("/perfil");
  return response.data;
};

export const updatePerfil = async (perfilData: any) => {
  const response = await API.put("/perfil", perfilData);
  return response.data;
};