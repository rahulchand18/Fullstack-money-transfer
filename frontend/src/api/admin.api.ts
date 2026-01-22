import api from "./axios";

export const adminApi = {
  getAll: () => api.get("/users"),

  create: (data: { email: string; full_name: string }) =>
    api.post("/users", data),

  update: (id: string, data: any) => api.put(`/users/${id}`, data),

  deactivate: (id: string) => api.delete(`/users/${id}`),
};
