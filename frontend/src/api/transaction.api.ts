import api from "./axios";

export const transactionApi = {
  getAll: (params?: any) => api.get("/transactions", { params }),
  create: (data: any) => api.post("/transactions", data),
  updateStatus: (id: string, status: string) =>
    api.put(`/transactions/${id}/status`, { status }),
};
