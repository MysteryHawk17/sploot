import { loginUser, registerUser } from "../api";
import { useAppStore } from "../store";

export const useLoginHook = () => {
  const setUser = useAppStore((state) => state.setUser);
  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);

      setUser(response);
      localStorage.setItem("token", JSON.stringify(response.token));
    } catch (error) {
      console.error("Failed to login:", error);
      throw error;
    }
  };

  return { login };
};

export const useRegisterHook = () => {
  const setUser = useAppStore((state) => state.setUser);

  const register = async (name: string, email: string, password: string, profilePic: File | null) => {
    try {
      const response = await registerUser(name, email, password,profilePic);
      setUser(response);
      localStorage.setItem("token", JSON.stringify(response.token));
    } catch (error) {
      console.error("Failed to register:", error);
      throw error;
    }
  };

  return { register };
};
