import axios, {AxiosError} from "axios";
import { RutaResponse } from "../models/RutaResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const API = axios.create({
  //baseURL: "https://approute.free.beeceptor.com", // AQUI CAMBIAMOS LA URL
  baseURL: "https://approutebackend.onrender.com",
  //baseURL: "http://192.168.1.7:3000", // Cambiar a la IP de la computadora
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

//VER FUNCIONAMIENTO SI SE PUEDE USAR EN CONJUNTO cON EL DE ARRIBA
API.interceptors.request.use(async (config) => {
  const raw = await AsyncStorage.getItem("user_session");
  if (raw) {
    try {
      const session = JSON.parse(raw);
      if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`;
      }
    } catch (error) {
      console.log("Error leyendo token del storage:", error);
    }
  }
  return config;
});




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

export const getAllNodos = async () => {
  const response = await API.get("/nodes");
  return response.data;
};

export const buscarRuta = async (
  origen: string,
  destino: string
): Promise<RutaResponse> => {
  try { 
    const response = await API.post("rutas/calcular_ruta", { origen, destino });
    return response.data;
  } catch (error: any) {
    console.error("Error al calcular ruta:", error.message);
    throw error;
  }
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
/*
export const ukpdatePerfil = async (perfilData: any) => {
  const response = await API.put("/perfil", perfilData);
  return response.data;
};*/

export const updatePerfil = async (perfilData: {
  nombre: string;
  telefono: string;
  imagen?: any; // puede ser { uri, type, name }
}) => {
  const formData = new FormData();

  formData.append("nombre", perfilData.nombre);
  formData.append("telefono", perfilData.telefono);

  if (perfilData.imagen) {
    formData.append("imagen", {
      uri: perfilData.imagen.uri,
      type: perfilData.imagen.type,
      name: perfilData.imagen.name,
    }as any);
  }

  const response = await API.put("/perfil", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
