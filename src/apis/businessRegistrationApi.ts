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
  location: string;
  oneLineIntro: string;
  servicesPrices: string;
  promotion?: string;
  photoDeliveryAgreed: boolean;
  privacyAgreed: boolean;
  website?: string;
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
  location: string;
  oneLineIntro: string;
  servicesPrices: string;
  promotion: string | null;
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

export type BusinessRegistrationUpdate = Pick<
  BusinessRegistrationItem,
  | "businessName"
  | "category"
  | "businessHours"
  | "holiday"
  | "phone"
  | "kakaoId"
  | "location"
  | "oneLineIntro"
  | "servicesPrices"
  | "promotion"
  | "photosReceivedYn"
  | "adminMemo"
>;

export function createBusinessRegistrationApi(
  data: BusinessRegistrationPayload
) {
  return axiosInstance
    .post<BusinessRegistrationReceipt>("/business-registrations", data)
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
