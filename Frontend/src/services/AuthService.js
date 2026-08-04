import API from "./Api";

export const login = async (email, password) => {
  return API.post("/auth/login", { email, password });
};

export const signup = async (name, email, password) => {
  return API.post("/auth/signup", { name, email, password });
};

export const logout = async () => {
  return API.post("/auth/logout");
};

export const getProfile = async () => {
  return API.get("/auth/profile");
};
