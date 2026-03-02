import api from "@/lib/axios";
import type {
  LoginUserFormData,
  RegisterUserFormData,
} from "@/schemas/auth.schema";

export const registerUser = async (data: RegisterUserFormData) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("password", data.password);

  const response = await api.post("/users/register", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const loginUser = async (data: LoginUserFormData) => {
  const formData = new FormData();

  formData.append("email", data.email);
  formData.append("password", data.password);

  const response = await api.post("/users/login", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const logoutUser = async () => {
  const response = await api.get("/users/logout");
  return response.data;
};
