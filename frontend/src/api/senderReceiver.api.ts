import api from "./axios";

export const senderReceiverApi = {
  getAll: (type: "SENDER" | "RECEIVER") =>
    api.get(`/sender-receivers?type=${type}`),

  create: (data: any) => api.post("/sender-receivers", data),

  update: (id: string, data: any) => api.put(`/sender-receivers/${id}`, data),

  deactivate: (id: string) => api.delete(`/sender-receivers/${id}`),
};
