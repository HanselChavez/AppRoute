  import React, { createContext, useState, useEffect, useContext } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { login as apiLogin, register as apiRegister } from "../services/apiService";
  import Toast from "react-native-toast-message";
 

  // Tipo del usuario
  interface User {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;   // opcional
  foto?: string;       // url de avatar, opcional
  role?: string;       // ej. "student" / "admin"
  confirmed?: boolean; // si la cuenta está verificada
  // puedes añadir más campos que el backend envíe en el futuro
}

  interface AuthContextProps {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (nombre: string, email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
  }

  // Ya no pongo todos las propiedades porque igual las mando en el props
  const AuthContext = createContext<AuthContextProps | undefined>(undefined);

  export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    //  Al iniciar la app, carga la sesión del AsyncStorage
    useEffect(() => {
    const loadSession = async () => {
      try {
        const raw = await AsyncStorage.getItem("user_session");
        if (raw) {
          const session = JSON.parse(raw);

          if (session?.token && session?.user?.email) {
            setUser(session.user);
            setToken(session.token);
          } else {
            await AsyncStorage.removeItem("user_session"); // limpia sesión inválida
          }
        }
      } catch (error) {
        console.log("Error cargando sesión:", error);
      } finally {
        setLoading(false);
      }
    };
    loadSession();
  }, []);

    // LOGIN
    const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin(email, password);

      if (
        !response ||
        !response.token ||
        !response.user ||
        !response.user.email
      ) {
        console.log("Login fallido:", response);
        return false;
      }

      await AsyncStorage.setItem(
        "user_session",
        JSON.stringify({ token: response.token, user: response.user })
      );

      setToken(response.token);
      Toast.show({
      type: "success",
      text1: "Inicio de sesión exitoso 🎉",
      text2: JSON.stringify(response, null, 2),
      });
      setUser(response.user);
      return true;
    } catch (error) {
      console.log("Error en login:", error);
      return false;
    }
  };
  // l

    // REGISTER
      const register = async (nombre: string, email: string, password: string) => {
      try {
          const response = await apiRegister({ nombre, email, password });
          console.log("DEBUG register response:", response);
          if (response?.user && response?.token) {
          const userData = {
              id: response.user.id,
              nombre: response.user.nombre,
              email: response.user.email,
          };

          await AsyncStorage.setItem(
              "user_session",
              JSON.stringify({ token: response.token, user: userData })
          );
          setUser(userData);
          setToken(response.token);
          return true;
          }
          return false;
      } catch (error) {
          console.log("Error en registro:", error);
          return false;
      }
      };



    // 🔹 LOGOUT
    const logout = async () => {
      try {
        await AsyncStorage.removeItem("user_session");
        setUser(null);
        setToken(null);
      } catch (error) {
        console.log("Error cerrando sesión:", error);
      }
    };

    return (
      <AuthContext.Provider
        value={{ user, token, loading, login, register, logout }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  // Hook para usar el contexto
  // Ahora con verificación de undefined pa que no ocurra lo de la otra vez
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
  }
