import axiosInstance from "./index";

export function addAdsApi(data: Object) {
  return axiosInstance
    .post("/admin/ads", data)
    .then((response) => response.data);
}

export function getAdsData() {
  return axiosInstance.get("/admin/ads").then((response) => response.data);
}

export function deleteAllAdsApi() {
  return axiosInstance.delete("/admin/ads");
}

export function deleteOneAdsApi(id: string) {
  return axiosInstance.delete(`/admin/ads/${id}`);
}
