
import AsyncStorage from "@react-native-async-storage/async-storage";
const SESSION_KEY = "user_session";

export type SessionData = {
  token: string;
  user?: any; // cambia por tu modelo User si lo tienes
};

export const saveSession = async (session: SessionData) => {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const getSession = async (): Promise<SessionData | null> => {
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const clearSession = async () => {
  await AsyncStorage.removeItem(SESSION_KEY);
};

export const getToken = async (): Promise<string | null> => {
  const s = await getSession();
  return s?.token ?? null;
};
