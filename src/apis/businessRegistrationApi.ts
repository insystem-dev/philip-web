import axiosInstance from "./index";

export type BusinessRegistrationStatus = "RECEIVED" | "COMPLETED";
export type BusinessRegistrationListStatus =
  | BusinessRegistrationStatus
  | "ALL";

export interface BusinessRegistrationPayload {
  businessName: string;
  category: string;
  businessHours: string;
  holiday?: string;
  phone?: string;
  kakaoId?: string;
  facebookId?: string;
  location: string;
  oneLineIntro: string;
  servicesPrices: string;
  promotion?: string;
  privacyAgreed: boolean;
  website?: string;
}

export interface BusinessRegistrationPhotoFiles {
  exteriorPhotos: File[];
  interiorPhotos: File[];
  menuPhotos: File[];
}

export interface BusinessRegistrationSubmission {
  data: BusinessRegistrationPayload;
  photos: BusinessRegistrationPhotoFiles;
}

export interface BusinessRegistrationReceipt {
  oid: string;
  status: BusinessRegistrationStatus;
  createdAt: string;
}

export interface BusinessRegistrationItem {
  oid: string;
  businessName: string;
  category: string;
  businessHours: string;
  holiday: string | null;
  phone: string | null;
  kakaoId: string | null;
  facebookId: string | null;
  location: string;
  oneLineIntro: string;
  servicesPrices: string;
  promotion: string | null;
  photos: BusinessRegistrationPhoto[];
  photosReceivedYn: boolean;
  status: BusinessRegistrationStatus;
  adminMemo: string | null;
  postOid: string | null;
  registeredAt: string | null;
  registeredBy: string | null;
  privacyAgreedAt: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string | null;
}

export type BusinessRegistrationPhotoType = "EXTERIOR" | "INTERIOR" | "MENU";

export interface BusinessRegistrationPhoto {
  type: BusinessRegistrationPhotoType;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  fileExtension: string;
}

export type BusinessRegistrationUpdate = Pick<
  BusinessRegistrationItem,
  | "businessName"
  | "category"
  | "businessHours"
  | "holiday"
  | "phone"
  | "kakaoId"
  | "facebookId"
  | "location"
  | "oneLineIntro"
  | "servicesPrices"
  | "promotion"
  | "photosReceivedYn"
  | "adminMemo"
>;

export function createBusinessRegistrationApi({
  data,
  photos,
}: BusinessRegistrationSubmission) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    formData.append(key, typeof value === "boolean" ? String(value) : value);
  });
  photos.exteriorPhotos.forEach((file) =>
    formData.append("exteriorPhotos", file)
  );
  photos.interiorPhotos.forEach((file) =>
    formData.append("interiorPhotos", file)
  );
  photos.menuPhotos.forEach((file) => formData.append("menuPhotos", file));

  return axiosInstance
    .post<BusinessRegistrationReceipt>("/business-registrations", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => response.data);
}

export function getBusinessRegistrationsApi(params?: {
  search?: string;
  status?: BusinessRegistrationListStatus;
}) {
  return axiosInstance
    .get<BusinessRegistrationItem[]>("/admin/business-registrations", {
      params: {
        ...(params?.search ? { search: params.search } : {}),
        ...(params?.status ? { status: params.status } : {}),
      },
    })
    .then((response) => response.data);
}

export function registerBusinessRegistrationApi(
  oid: string,
  data: { cityOid: string; categoryOid: string }
) {
  return axiosInstance
    .post<BusinessRegistrationItem>(
      `/admin/business-registrations/${oid}/register`,
      data
    )
    .then((response) => response.data);
}

export function updateBusinessRegistrationApi(
  oid: string,
  data: BusinessRegistrationUpdate
) {
  return axiosInstance
    .put<BusinessRegistrationItem>(
      `/admin/business-registrations/${oid}`,
      data
    )
    .then((response) => response.data);
}
