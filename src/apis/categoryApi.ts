import axiosInstance from "./index";

/** GET nav 카테고리 목록 불러오기 */
export function getCategoryNavApi() {
  return axiosInstance.get("/category").then((res) => res.data);
}

/** GET City 카테고리 목록 불러오기 */
export function getCityListApi() {
  return axiosInstance.get("/category/city").then((res) => res.data);
}
