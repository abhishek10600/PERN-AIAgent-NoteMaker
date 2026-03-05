import api from "@/lib/axios";

export const getAllNotes = async () => {
  const response = await api.get("/notes/all-notes");
  return response.data;
};
