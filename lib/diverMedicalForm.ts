// lib/diverMedicalForm.ts
// import axiosInstance from "./axiosInstance";

// const api = axiosInstance;

// export async function diverMedicalForm(
//   id: string,
//   token: string,
//   file: File
// ) {
//   try {
    // console.log("📦 API function called:", {
    //   id,
    //   tokenExists: !!token,
    //   file: {
    //     name: file.name,
    //     size: file.size,
    //     type: file.type,
    //     isFile: file instanceof File
    //   }
    // });

    // const formData = new FormData();
    // formData.append("documents", file, file.name);

    // // Verify FormData
    // // console.log("📋 FormData entries:");
    // for (const [key, value] of formData.entries()) {
    //   if (value instanceof File) {
    //     // console.log(`  ${key}:`, value.name, `(${value.size} bytes)`);
    //   } else {
    //     // console.log(`  ${key}:`, value);
    //   }
    // }

    // console.log("🌐 Sending PATCH to:", `/class/bookings/${id}/submit-form`);

  //   const res = await api.patch(
  //     `/class/bookings/${id}/submit-form`,
  //     formData,
  //     {
  //       headers: {
  //         // 🔥 Let Axios set Content-Type automatically
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );

  //   console.log("✅ API Response:", res.data);
  //   return res.data;
  // } catch (error) {
  //   console.error("❌ API Error:", error);
    
    // Log more error details
    // if (error.response) {
    //   console.error("Response error:", {
    //     status: error.response.status,
    //     data: error.response.data
    //   });
    // }
    
    // throw error;
//   }
// }