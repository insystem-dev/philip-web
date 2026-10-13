import axiosInstance from "./index";

let nextVisitUpdateAt: string | null = null;

export function checkTodayVisit() {
  return axiosInstance.get("/app").then((response) => response.data);
}

export function getVisitCount() {
  return axiosInstance.get<number>("/app/visit").then((response) => {
    nextVisitUpdateAt =
      (response.headers["x-visit-next-update-at"] as string | undefined) ??
      null;
    return response.data;
  });
}

export function getNextVisitUpdateAt() {
  return nextVisitUpdateAt;
}
