import ApiService from "./ApiService";
import endpointConfig from "@/configs/endpoint.config";

// ✅ GET Images
export async function getImages(stockId: string) {
  return ApiService.fetchDataWithAxios({
    url: `${endpointConfig.GetImages}?Id=${stockId}`,
    method: "get",
  });
}

// ✅ POST Upload Images
// export async function uploadImages(stockId: string, userId: string, files: File[]) {
//   const formData = new FormData();
//   files.forEach((file) => formData.append("files", file));
//   formData.append("StockId", stockId);
//   formData.append("UserId", userId);

//   return ApiService.fetchDataWithAxios({
//     url: `${endpointConfig.UploadImages}`,
//     method: "post",
//     data: formData,
//     headers: { "Content-Type": "multipart/form-data" },
//   });
// }
export async function uploadImages(stockId: string, userId: string, files: File[]) {
  const formData = new FormData();

  // ✅ Append all files under 'files'
  for (const file of files) {
    formData.append("files", file);
  }

  // ✅ Append DTO-style fields
  formData.append("dto.StockId", stockId);
  formData.append("dto.UserId", userId);

  // 🔍 Debugging log — verify keys before sending
  for (const [key, val] of formData.entries()) {
    console.log("🧾 FormData:", key, val);
  }

  return ApiService.fetchDataWithAxios({
    url: `${endpointConfig.UploadImages}`, // e.g. /api/Upload/upload-images
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}





// ✅ DELETE Image by ID
export async function deleteImage(imageId: string) {
  return ApiService.fetchDataWithAxios({
    url: `${endpointConfig.DeleteImage}/${imageId}`,
    method: "delete",
  });
}
