import api from "@/lib/axios";

export const aiAgent = async (message: string) => {
  const response = await api.post(
    "/agent/chat",
    {
      message,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};
