import axiosInstance from "./index";

/** GET 메인화면 전체게시글, 복수쿼리( 검색, 카테고리 )  */
export function getPostsListApi({ queryKey }: any) {
  return axiosInstance
    .get(
      `/posts?city=${queryKey[1]}&category=${queryKey[2]}&search=${queryKey[3]}`
    )
    .then((res) => res.data);
}

/** GET 게시글 클릭시 상세페이지 정보 */
export function getOnePostInfoApi(data: any) {
  return axiosInstance.get(`/posts/${data}`).then((res) => res.data);
}

/** POST [관리자] 게시글 등록 */
export function addPostApi(data: Object) {
  return axiosInstance.post("/posts", data).then((response) => response.data);
}

/** PATCH 디테일 페이지 들어갈때 방문자수 카운트 */
export function fetchCountViews(oid: string) {
  return axiosInstance.patch(`/posts/${oid}`);
}

/** GET 프로모션 리스트  */
export function getPromtionListApi({ queryKey }: any) {
  return axiosInstance
    .get(`/posts/promotion?city=${queryKey[1]}&category=${queryKey[2]}`)
    .then((response) => response.data);
}

/** DELETE 게시글 삭제 */
export function deletePostAPI(oid: string) {
  return axiosInstance
    .delete(`/posts/${oid}`)
    .then((response) => response.data);
}

/** GET 관리자 페이지 업체관리 리스트 불러오기 */
export function getAdminStorePosts({ queryKey }: any) {
  return axiosInstance
    .get(
      `/posts/store?search=${queryKey[1]}&category=${queryKey[2]}&promotion=${queryKey[3]}`
    )
    .then((response) => response.data);
}

/** POST 이미지 업로드 */
export function uploadImagesAPI(data: FormData) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return axiosInstance
    .post("/posts/images", data, config)
    .then((response) => response.data);
}
/** DELETE DB에 올라가지 않은 프리뷰 이미지 삭제 */
export function deletePreviewImagesAPI(data: string) {
  return axiosInstance
    .delete(`/posts/images/preview/${data}`)
    .then((response) => response.data);
}

/** DELETE DB 이미지 삭제, 업체 수정 시 이미지 삭제 */
export function deleteImageAPI(data: string) {
  return axiosInstance
    .delete(`/posts/images/${data}`)
    .then((response) => response.data);
}

/** 게시글 수정 */
export function editPostAPI(data: Object) {
  return axiosInstance
    .put("/posts/store/edit", data)
    .then((response) => response.data);
}

/** 프로모션 체크 */
export function promotionAPI(oid: string) {
  return axiosInstance.patch(`/posts/promotion/${oid}`);
}

/** 프로모션 롤 체크 */
export function promotionRoleAPI(data: any) {
  return axiosInstance
    .put(`/posts/promotion/role/${data.oid}`, data)
    .then((response) => response.data);
}
