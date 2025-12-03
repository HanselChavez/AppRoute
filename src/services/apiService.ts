import axios, { AxiosError } from "axios";
import { RutaResponse } from "../models/RutaResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const API = axios.create({
  baseURL: "https://approutebackend.onrender.com",
  timeout: 10000,
});

/* ============================================================
   🔹 INTERCEPTOR 1: LOG DE REQUESTS
   Corregido para NO modificar FormData
============================================================ */
API.interceptors.request.use((request) => {
  // Si es FormData, NO tocar headers ni convertir content-type
  if (request.data instanceof FormData) {
    request.headers["Content-Type"] = "multipart/form-data";
  }

  console.log("📤 Request:", {
    method: request.method,
    url: request.baseURL + request.url,
    headers: request.headers,
    data: request.data,
  });

  return request;
});

/* ============================================================
   🔹 INTERCEPTOR 2: LOG DE RESPUESTAS
============================================================ */
API.interceptors.response.use(
  (response) => {
    console.log("📥 Response:", {
      method: response.config.method,
      url: response.config.baseURL + response.config.url,
      status: response.status,
      data: response.data,
    });

    return response;
  },

  (error: AxiosError) => {
    console.log("❌ Error Response Interceptor:");

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
      console.log("Headers:", error.response.headers);
    } else if (error.request) {
      console.log("Request sin respuesta:", error.request);
    } else {
      console.log("Error general:", error.message);
    }

    let mensaje = "Error inesperado. Intenta de nuevo.";

    if (error.response) {
      switch (error.response.status) {
        case 400:
          mensaje = "Solicitud inválida.";
          break;
        case 401:
          mensaje = "No autorizado. Inicia sesión de nuevo.";
          break;
        case 403:
          mensaje = "No tienes permisos para esta acción.";
          break;
        case 404:
          mensaje = "Recurso no encontrado...";
          break;
        case 500:
          mensaje = "Error del servidor. Intenta más tarde.";
          break;
      }
    } else if (error.request) {
      mensaje = "No hay conexión con el servidor..";
    } else {
      mensaje = `Error: ${error.message}`;
    }

    return Promise.reject(new Error(mensaje));
  }
);

/* ============================================================
   🔹 INTERCEPTOR 3: AGREGAR TOKEN AUTOMÁTICAMENTE
============================================================ */
API.interceptors.request.use(async (config) => {
  const raw = await AsyncStorage.getItem("user_session");

  if (raw) {
    try {
      const session = JSON.parse(raw);
      if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`;
      }
    } catch (error) {
      console.log("Error leyendo token:", error);
    }
  }

  return config;
});

/* ============================================================
                   ENDPOINTS
============================================================ */

/* ------------ AUTENTICACIÓN -------------- */
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

/* -------------- RUTAS --------------- */
export const getAllNodos = async () => {
  const response = await API.get("/nodes");
  return response.data;
};

export const buscarRuta = async (
  origen: string,
  destino: string
): Promise<RutaResponse> => {
  const response = await API.post("rutas/calcular_ruta", { origen, destino });
  return response.data;
};

export const getRutasRecientes = async () => {
  const response = await API.get("/rutas/recientes");
  return response.data;
};

/* -------------- PERFIL --------------- */
export const getPerfil = async () => {
  const response = await API.get("/perfil");
  return response.data;
};

/* ============================================================
   🔹 updatePerfil CORREGIDO (FINAL)
============================================================ */
export const updatePerfil = async (perfilData: {
  nombre: string;
  telefono: string;
  imagen?: any;
}) => {
  const formData = new FormData();

  formData.append("nombre", perfilData.nombre);
  formData.append("telefono", perfilData.telefono);

  if (perfilData.imagen) {
    formData.append(
      "foto",
      {
        uri: perfilData.imagen.uri,
        type: perfilData.imagen.type,
        name: perfilData.imagen.name,
      } as any
    );
  }

  const response = await API.put("/auth/perfil", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });

  return response.data;
};
