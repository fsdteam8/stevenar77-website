import axiosInstance from "./axiosInstance";

const api = axiosInstance;

export async function quickreview(id: string, token: string, file: File) {
  try {
    const documents = new FormData();
    documents.append("documents", file);
    // console.log(documents.append("test...........", file));

    const res = await api.patch(
      `/class/bookings/${id}/submit-form`,
      documents,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Upload error:", error);
  }
}
