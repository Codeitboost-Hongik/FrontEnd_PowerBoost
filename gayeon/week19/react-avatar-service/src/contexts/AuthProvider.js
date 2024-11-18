import { createContext, useContext, useState, useEffect } from "react";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  user: null,
  avatar: null,
  login: () => {},
  logout: () => {},
  updateMe: () => {},
  updateAvatar: () => {},
});

export const AuthProvider = ({ children }) => {
  const [values, setValues] = useState({
    user: null,
    avatar: null,
    isPending: true,
  });

  async function getMe() {
    setValues((prev) => ({
      ...prev,
      isPending: true,
    }));
    let nextUser = null;
    try {
      const res = await axios.get("/users/me");
      nextUser = res.data;
    } finally {
      setValues((prev) => ({
        ...prev,
        user: nextUser,
        isPending: false,
      }));
    }
  }

  async function getMyAvatar() {
    const res = await axios.get("/users/me/avatar");
    const avatar = res.data;
    setValues((prev) => ({ ...prev, avatar }));
  }

  async function login({ email, password }) {
    await axios.post("/auth/login", { email, password });
    await getMe();
    await getMyAvatar();
  }

  async function logout() {
    await axios.delete("/auth/logout");
    setValues((prevValues) => ({
      ...prevValues,
      user: null,
      avatar: null,
    }));
  }

  async function updateMe({ name, email }) {
    const res = await axios.patch("/users/me", { name, email });
    const nextUser = res.data;
    setValues((prev) => ({ ...prev, user: nextUser }));
  }

  async function updateAvatar(values) {
    const res = await axios.patch("/users/me/avatar", values);
    const nextAvatar = res.data;
    setValues((prev) => ({ ...prev, avatar: nextAvatar }));
  }

  useEffect(() => {
    getMe();
    getMyAvatar();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        avatar: values.avatar,
        isPending: values.isPending,
        login,
        logout,
        updateMe,
        updateAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(required) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  useEffect(() => {
    if (required && !context.user && !context.isPending) {
      navigate("/login");
    }
  }, [context.user, context.isPending, required, navigate]);

  return context;
}
