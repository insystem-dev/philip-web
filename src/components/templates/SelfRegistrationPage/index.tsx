import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMutation, useQuery } from "react-query";
import {
  BusinessRegistrationPhotoFiles,
  BusinessRegistrationPayload,
  BusinessRegistrationReceipt,
  createBusinessRegistrationApi,
} from "@/apis/businessRegistrationApi";
import { getContactKakaoApi } from "@/apis/categoryApi";
import * as S from "./selfRegistrationPage.style";

const EMPTY_FORM: BusinessRegistrationPayload = {
  businessName: "",
  category: "",
  businessHours: "",
  holiday: "",
  phone: "",
  kakaoId: "",
  facebookId: "",
  location: "",
  oneLineIntro: "",
  servicesPrices: "",
  promotion: "",
  privacyAgreed: false,
  website: "",
};

type PhotoField = keyof BusinessRegistrationPhotoFiles;

interface SelectedPhoto {
  id: string;
  file: File;
  previewUrl: string;
}

const EMPTY_PHOTOS: Record<PhotoField, SelectedPhoto[]> = {
  exteriorPhotos: [],
  interiorPhotos: [],
  menuPhotos: [],
};

const PHOTO_CONFIGS: Array<{
  field: PhotoField;
  title: string;
  englishTitle: string;
  description: string;
  englishDescription: string;
  limit: number;
}> = [
  {
    field: "exteriorPhotos",
    title: "업소 간판/외부 사진",
    englishTitle: "Store Sign or Exterior",
    description: "대표로 보일 사진",
    englishDescription: "Main business photo",
    limit: 1,
  },
  {
    field: "interiorPhotos",
    title: "내부 전경 사진",
    englishTitle: "Interior Photos",
    description: "공간과 분위기를 보여주세요",
    englishDescription: "Show your space and atmosphere",
    limit: 5,
  },
  {
    field: "menuPhotos",
    title: "선명한 메뉴판 사진",
    englishTitle: "Clear Menu Photos",
    description: "가격이 잘 보이는 사진",
    englishDescription: "Make sure prices are readable",
    limit: 5,
  },
];

const MAX_PHOTO_SIZE = 16 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/heif",
]);
const ALLOWED_PHOTO_EXTENSION = /\.(jpe?g|png|heic|heif)$/i;

const isAllowedPhotoFile = (file: File) =>
  ALLOWED_PHOTO_TYPES.has(file.type.toLowerCase()) ||
  ALLOWED_PHOTO_EXTENSION.test(file.name);

const getErrorMessage = (error: any) => {
  const responseMessage = error?.response?.data?.message;
  const koreanMessage = Array.isArray(responseMessage)
    ? responseMessage.join(" ")
    : responseMessage ||
      "신청서를 전송하지 못했습니다. 잠시 후 다시 시도해 주세요.";
  return `${koreanMessage}\nWe couldn't submit your application. Please check the form and try again.`;
};

export const SelfRegistrationPage = () => {
  const [form, setForm] = useState<BusinessRegistrationPayload>(EMPTY_FORM);
  const [photoFiles, setPhotoFiles] =
    useState<Record<PhotoField, SelectedPhoto[]>>(EMPTY_PHOTOS);
  const [receipt, setReceipt] = useState<BusinessRegistrationReceipt | null>(
    null
  );
  const [validation, setValidation] = useState("");
  const previewUrlsRef = useRef(new Set<string>());
  const { data: contactKakaoId = "philip69" } = useQuery(
    ["getContactKakaoApi"],
    getContactKakaoApi,
    { staleTime: 1000 * 60 * 30 }
  );

  const mutation = useMutation(createBusinessRegistrationApi, {
    onSuccess: (data) => {
      setReceipt(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });

  const receiptCode = useMemo(
    () => receipt?.oid.replace(/-/g, "").slice(0, 8).toUpperCase(),
    [receipt]
  );

  const setValue = <K extends keyof BusinessRegistrationPayload>(
    key: K,
    value: BusinessRegistrationPayload[K]
  ) => setForm((current) => ({ ...current, [key]: value }));

  useEffect(
    () => () => {
      previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      previewUrlsRef.current.clear();
    },
    []
  );

  const clearPhotos = () => {
    previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    previewUrlsRef.current.clear();
    setPhotoFiles(EMPTY_PHOTOS);
  };

  const addPhotos = (
    field: PhotoField,
    limit: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (selectedFiles.length === 0) return;

    const available = limit - photoFiles[field].length;
    if (selectedFiles.length > available) {
      setValidation(
        `사진은 이 항목에 최대 ${limit}장까지 등록할 수 있습니다.\nYou can upload up to ${limit} photo${limit > 1 ? "s" : ""} in this section.`
      );
      return;
    }
    if (selectedFiles.some((file) => !isAllowedPhotoFile(file))) {
      setValidation(
        "JPG, PNG, HEIC 또는 HEIF 형식의 사진만 등록할 수 있습니다.\nOnly JPG, PNG, HEIC, or HEIF images can be uploaded."
      );
      return;
    }
    if (selectedFiles.some((file) => file.size > MAX_PHOTO_SIZE)) {
      setValidation(
        "사진 한 장의 용량은 16MB를 넘을 수 없습니다.\nEach photo must be 16MB or smaller."
      );
      return;
    }

    const nextPhotos = selectedFiles.map((file) => {
      const previewUrl = URL.createObjectURL(file);
      previewUrlsRef.current.add(previewUrl);
      return {
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file,
        previewUrl,
      };
    });
    setPhotoFiles((current) => ({
      ...current,
      [field]: [...current[field], ...nextPhotos],
    }));
    setValidation("");
  };

  const removePhoto = (field: PhotoField, photo: SelectedPhoto) => {
    URL.revokeObjectURL(photo.previewUrl);
    previewUrlsRef.current.delete(photo.previewUrl);
    setPhotoFiles((current) => ({
      ...current,
      [field]: current[field].filter((item) => item.id !== photo.id),
    }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidation("");

    const requiredFields = [
      {
        id: "businessName",
        value: form.businessName,
        message: "업소명을 입력해 주세요.\nPlease enter the store name.",
      },
      {
        id: "category",
        value: form.category,
        message:
          "카테고리를 입력해 주세요.\nPlease enter the business category.",
      },
      {
        id: "businessHours",
        value: form.businessHours,
        message: "영업 시간을 입력해 주세요.\nPlease enter the business hours.",
      },
      {
        id: "location",
        value: form.location,
        message:
          "구글맵 위치 또는 주소를 입력해 주세요.\nPlease enter a Google Maps link or address.",
      },
      {
        id: "oneLineIntro",
        value: form.oneLineIntro,
        message:
          "업소 한줄 소개를 입력해 주세요.\nPlease enter a short business introduction.",
      },
      {
        id: "servicesPrices",
        value: form.servicesPrices,
        message:
          "주요 메뉴/서비스 및 가격을 입력해 주세요.\nPlease enter the main menu, services and prices.",
      },
    ];
    const missingField = requiredFields.find(({ value }) => !value.trim());
    if (missingField) {
      setValidation(missingField.message);
      document.getElementById(missingField.id)?.focus();
      return;
    }

    if (!form.phone?.trim() && !form.kakaoId?.trim()) {
      setValidation(
        "전화번호 또는 카카오톡 ID 중 하나를 입력해 주세요.\nPlease enter either a phone number or KakaoTalk ID."
      );
      document.getElementById("contact-section")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }
    if (!form.privacyAgreed) {
      setValidation(
        "개인정보 수집 및 이용에 동의해 주세요.\nPlease agree to the collection and use of personal information."
      );
      return;
    }

    mutation.mutate({
      data: {
        ...form,
        businessName: form.businessName.trim(),
        category: form.category.trim(),
        businessHours: form.businessHours.trim(),
        holiday: form.holiday?.trim(),
        phone: form.phone?.trim(),
        kakaoId: form.kakaoId?.trim(),
        facebookId: form.facebookId?.trim(),
        location: form.location.trim(),
        oneLineIntro: form.oneLineIntro.trim(),
        servicesPrices: form.servicesPrices.trim(),
        promotion: form.promotion?.trim(),
      },
      photos: {
        exteriorPhotos: photoFiles.exteriorPhotos.map((photo) => photo.file),
        interiorPhotos: photoFiles.interiorPhotos.map((photo) => photo.file),
        menuPhotos: photoFiles.menuPhotos.map((photo) => photo.file),
      },
    });
  };

  const copyKakaoId = async () => {
    try {
      await navigator.clipboard.writeText(contactKakaoId);
      alert(
        `카카오톡 ID ${contactKakaoId}가 복사되었습니다.\nKakaoTalk ID ${contactKakaoId} has been copied.`
      );
    } catch {
      window.prompt(
        "카카오톡 ID를 복사해 주세요. / Please copy the KakaoTalk ID.",
        contactKakaoId
      );
    }
  };

  return (
    <S.Page>
      <S.FlagGlow aria-hidden="true" />
      <S.Shell>
        <S.Hero>
          <S.Eyebrow>PHILIP69 × LOCAL BUSINESS</S.Eyebrow>
          <S.Deadline>
            9월 30일까지
            <S.EnglishLine>Until September 30</S.EnglishLine>
          </S.Deadline>
          <S.HeroTitle>
            무료 등록
            <br />및 홍보 신청서
            <S.HeroEnglishTitle>
              Free Registration &amp; Promotion Application
            </S.HeroEnglishTitle>
          </S.HeroTitle>
          <S.HeroCopy>
            양식을 보내주시면 확인 후 <strong>48시간 이내</strong>에 등록해
            드립니다.
            <S.EnglishLine>
              Submit this form and we will review and register your business
              within 48 hours.
            </S.EnglishLine>
          </S.HeroCopy>
          <S.HeroNote>
            광고비와 수수료 없이 관광객과 업주님을 직접 연결합니다.
            <S.EnglishLine>
              We connect travelers and business owners directly, with no
              advertising fees or commissions.
            </S.EnglishLine>
          </S.HeroNote>
          <S.Sun aria-hidden="true">
            <span />
          </S.Sun>
        </S.Hero>

        <S.Form onSubmit={onSubmit} noValidate>
          <S.FormIntro>
            <span>
              필립69 무료 등록 신청
              <S.EnglishLine>PHILIP69 FREE REGISTRATION</S.EnglishLine>
            </span>
            <strong>
              모바일에서 약 3분이면 작성할 수 있어요.
              <S.EnglishLine>
                It takes about three minutes to complete on mobile.
              </S.EnglishLine>
            </strong>
            <p>
              <i>*</i> 표시 항목은 필수입니다.
              <S.EnglishLine>Fields marked with * are required.</S.EnglishLine>
            </p>
          </S.FormIntro>

          <S.Section>
            <S.SectionHead>
              <S.Step>01</S.Step>
              <div>
                <h2>
                  업소 기본 정보
                  <S.EnglishLine>Business Information</S.EnglishLine>
                </h2>
                <p>
                  고객에게 보여줄 기본 정보를 알려주세요.
                  <S.EnglishLine>
                    Tell us the basic information customers should see.
                  </S.EnglishLine>
                </p>
              </div>
            </S.SectionHead>
            <S.FieldGrid>
              <S.Field $wide>
                <label htmlFor="businessName">
                  업소명 <b>*</b>
                  <S.EnglishLine>Store Name *</S.EnglishLine>
                </label>
                <input
                  id="businessName"
                  required
                  maxLength={200}
                  autoComplete="organization"
                  placeholder="예 / e.g. 필립 식당 / Philip Restaurant"
                  value={form.businessName}
                  onChange={(event) =>
                    setValue("businessName", event.target.value)
                  }
                />
              </S.Field>
              <S.Field>
                <label htmlFor="category">
                  카테고리 <b>*</b>
                  <S.EnglishLine>Category *</S.EnglishLine>
                </label>
                <input
                  id="category"
                  required
                  maxLength={100}
                  placeholder="예 / e.g. 식당, 마사지, 호텔 / Restaurant, Massage, Hotel"
                  value={form.category}
                  onChange={(event) => setValue("category", event.target.value)}
                />
              </S.Field>
              <S.Field>
                <label htmlFor="businessHours">
                  영업 시간 <b>*</b>
                  <S.EnglishLine>Business Hours *</S.EnglishLine>
                </label>
                <input
                  id="businessHours"
                  required
                  maxLength={200}
                  placeholder="예 / e.g. 매일 / Daily 10:00–22:00"
                  value={form.businessHours}
                  onChange={(event) =>
                    setValue("businessHours", event.target.value)
                  }
                />
              </S.Field>
              <S.Field $wide>
                <label htmlFor="holiday">
                  휴무일
                  <S.EnglishLine>Closed Days</S.EnglishLine>
                </label>
                <input
                  id="holiday"
                  maxLength={200}
                  placeholder="예 / e.g. 매주 월요일 / Every Monday / Open daily"
                  value={form.holiday}
                  onChange={(event) => setValue("holiday", event.target.value)}
                />
              </S.Field>
            </S.FieldGrid>
          </S.Section>

          <S.Section id="contact-section">
            <S.SectionHead>
              <S.Step>02</S.Step>
              <div>
                <h2>
                  연락처 및 위치
                  <S.EnglishLine>Contact &amp; Location</S.EnglishLine>
                </h2>
                <p>
                  전화번호와 카카오톡 ID 중 하나는 꼭 입력해 주세요.
                  <S.EnglishLine>
                    Please enter either a phone number or KakaoTalk ID.
                  </S.EnglishLine>
                </p>
              </div>
            </S.SectionHead>
            <S.FieldGrid>
              <S.Field>
                <label htmlFor="phone">
                  전화번호
                  <S.EnglishLine>Phone Number</S.EnglishLine>
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  maxLength={50}
                  autoComplete="tel"
                  placeholder="예 / e.g. 0917-000-0000"
                  value={form.phone}
                  onChange={(event) => setValue("phone", event.target.value)}
                />
              </S.Field>
              <S.Field>
                <label htmlFor="kakaoId">
                  카카오톡 ID
                  <S.EnglishLine>KakaoTalk ID</S.EnglishLine>
                </label>
                <input
                  id="kakaoId"
                  maxLength={100}
                  placeholder="연락 가능한 ID / Your KakaoTalk ID"
                  value={form.kakaoId}
                  onChange={(event) => setValue("kakaoId", event.target.value)}
                />
              </S.Field>
              <S.Field>
                <label htmlFor="facebookId">
                  페이스북 ID
                  <S.EnglishLine>Facebook ID</S.EnglishLine>
                </label>
                <input
                  id="facebookId"
                  maxLength={100}
                  autoComplete="off"
                  placeholder="선택 입력 / Optional Facebook ID"
                  value={form.facebookId}
                  onChange={(event) =>
                    setValue("facebookId", event.target.value)
                  }
                />
              </S.Field>
              <S.Field $wide>
                <label htmlFor="location">
                  구글맵 위치 또는 주소 <b>*</b>
                  <S.EnglishLine>Google Maps Link or Address *</S.EnglishLine>
                </label>
                <textarea
                  id="location"
                  required
                  maxLength={1000}
                  rows={3}
                  placeholder="구글맵 링크 또는 주소 / Google Maps link or full address"
                  value={form.location}
                  onChange={(event) => setValue("location", event.target.value)}
                />
              </S.Field>
            </S.FieldGrid>
          </S.Section>

          <S.Section>
            <S.SectionHead>
              <S.Step>03</S.Step>
              <div>
                <h2>
                  홍보 내용
                  <S.EnglishLine>Promotional Details</S.EnglishLine>
                </h2>
                <p>
                  업소의 매력을 실제 고객에게 소개해 주세요.
                  <S.EnglishLine>
                    Introduce what makes your business special to customers.
                  </S.EnglishLine>
                </p>
              </div>
            </S.SectionHead>
            <S.FieldGrid>
              <S.Field $wide>
                <label htmlFor="oneLineIntro">
                  우리 업소 한줄 소개 <b>*</b>
                  <S.EnglishLine>Short Business Introduction *</S.EnglishLine>
                </label>
                <input
                  id="oneLineIntro"
                  required
                  maxLength={500}
                  placeholder="예 / e.g. 마닐라에서 만나는 정통 한국의 맛 / Authentic Korean flavors in Manila"
                  value={form.oneLineIntro}
                  onChange={(event) =>
                    setValue("oneLineIntro", event.target.value)
                  }
                />
              </S.Field>
              <S.Field $wide>
                <label htmlFor="servicesPrices">
                  주요 메뉴/서비스 및 가격 <b>*</b>
                  <S.EnglishLine>
                    Main Menu, Services &amp; Prices *
                  </S.EnglishLine>
                </label>
                <textarea
                  id="servicesPrices"
                  required
                  maxLength={3000}
                  rows={5}
                  placeholder={
                    "대표 메뉴와 가격을 줄바꿈으로 적어주세요. / List each main item and price on a new line.\n예 / e.g. 삼겹살 1인분 / Pork belly, 1 serving ₱450"
                  }
                  value={form.servicesPrices}
                  onChange={(event) =>
                    setValue("servicesPrices", event.target.value)
                  }
                />
              </S.Field>
              <S.Field $wide>
                <label htmlFor="promotion">
                  현재 진행 중인 프로모션
                  <S.EnglishLine>Current Promotion</S.EnglishLine>
                </label>
                <textarea
                  id="promotion"
                  maxLength={2000}
                  rows={3}
                  placeholder="없으면 비워주세요. / Leave blank if none."
                  value={form.promotion}
                  onChange={(event) =>
                    setValue("promotion", event.target.value)
                  }
                />
              </S.Field>
            </S.FieldGrid>
          </S.Section>

          <S.Section>
            <S.SectionHead>
              <S.Step>04</S.Step>
              <div>
                <h2>
                  사진 자료 등록
                  <S.EnglishLine>Photo Upload</S.EnglishLine>
                </h2>
                <p>
                  사진을 선택하면 신청서와 함께 바로 등록됩니다.
                  <S.EnglishLine>
                    Selected photos will be uploaded with your application.
                  </S.EnglishLine>
                </p>
              </div>
            </S.SectionHead>
            <S.PhotoUploadList>
              {PHOTO_CONFIGS.map((config, index) => {
                const selectedPhotos = photoFiles[config.field];
                const canAdd = selectedPhotos.length < config.limit;
                return (
                  <S.PhotoUploadGroup key={config.field}>
                    <S.PhotoUploadHead>
                      <span>{index + 1}</span>
                      <div>
                        <strong>
                          {config.title}
                          <S.EnglishLine>{config.englishTitle}</S.EnglishLine>
                        </strong>
                        <p>
                          {config.description}
                          <S.EnglishLine>
                            {config.englishDescription}
                          </S.EnglishLine>
                        </p>
                      </div>
                      <S.PhotoCount $full={!canAdd}>
                        {selectedPhotos.length}/{config.limit}
                      </S.PhotoCount>
                    </S.PhotoUploadHead>
                    <S.PhotoPreviewGrid>
                      {selectedPhotos.map((photo) => (
                        <S.PhotoPreview key={photo.id}>
                          {/* 로컬 object URL 미리보기는 Next Image 최적화 대상이 아니다. */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={photo.previewUrl} alt={photo.file.name} />
                          <S.PhotoRemoveButton
                            type="button"
                            aria-label={`${photo.file.name} 삭제`}
                            onClick={() => removePhoto(config.field, photo)}
                          >
                            ×
                          </S.PhotoRemoveButton>
                        </S.PhotoPreview>
                      ))}
                      {canAdd && (
                        <S.PhotoAddLabel>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/heic,image/heif,.jpg,.jpeg,.png,.heic,.heif"
                            multiple={config.limit > 1}
                            aria-label={`${config.title} 추가`}
                            onChange={(event) =>
                              addPhotos(config.field, config.limit, event)
                            }
                          />
                          <b aria-hidden="true">+</b>
                          <span>
                            사진 추가
                            <S.EnglishLine>Add Photo</S.EnglishLine>
                          </span>
                        </S.PhotoAddLabel>
                      )}
                    </S.PhotoPreviewGrid>
                  </S.PhotoUploadGroup>
                );
              })}
            </S.PhotoUploadList>
            <S.PhotoUploadHint>
              JPG·PNG·HEIC·HEIF 파일을 지원하며 사진 한 장당 최대 16MB입니다.
              아이폰 사진은 등록 시 자동으로 변환·압축됩니다.
              <S.EnglishLine>
                JPG, PNG, HEIC, and HEIF are supported, up to 16MB each. iPhone
                photos are automatically converted and compressed when uploaded.
              </S.EnglishLine>
            </S.PhotoUploadHint>
            <S.Caution>
              <strong>
                촬영이 필요하신가요?
                <S.EnglishLine>Do you need a photo shoot?</S.EnglishLine>
              </strong>
              <span>
                촬영 요청 시 최소한의 인건비가 청구될 수 있습니다.
                <S.EnglishLine>
                  A minimal service fee may apply if you request photography.
                </S.EnglishLine>
              </span>
            </S.Caution>
          </S.Section>

          <S.Consent>
            <S.CheckLabel>
              <input
                type="checkbox"
                checked={form.privacyAgreed}
                onChange={(event) =>
                  setValue("privacyAgreed", event.target.checked)
                }
              />
              <span aria-hidden="true" />
              <S.CheckCopy>
                <span>
                  <b>[필수]</b> 등록 처리와 연락을 위한 개인정보 수집 및 이용에
                  동의합니다.
                </span>
                <S.EnglishLine>
                  <b>[Required]</b> I agree to the collection and use of my
                  personal information for registration and contact purposes.
                </S.EnglishLine>
              </S.CheckCopy>
            </S.CheckLabel>
            <p>
              수집 항목: 업소 정보, 연락처, 카카오톡·페이스북 ID, 위치, 등록
              사진 · 이용 목적: 업소 등록 검토 및 연락
              <S.EnglishLine>
                Collected information: business details, contact information,
                KakaoTalk and Facebook IDs, location and uploaded photos ·
                Purpose: registration review and contact
              </S.EnglishLine>
            </p>
          </S.Consent>

          <S.Honeypot aria-hidden="true">
            <label htmlFor="website">웹사이트</label>
            <input
              id="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(event) => setValue("website", event.target.value)}
            />
          </S.Honeypot>

          {(validation || mutation.isError) && (
            <S.FormError role="alert">
              {validation || getErrorMessage(mutation.error)}
            </S.FormError>
          )}

          <S.SubmitDock>
            <S.SubmitButton type="submit" disabled={mutation.isLoading}>
              <S.SubmitLabel>
                <span>
                  {mutation.isLoading ? "신청서 전송 중" : "무료 등록 신청하기"}
                </span>
                <S.EnglishLine>
                  {mutation.isLoading
                    ? "Submitting application..."
                    : "Submit Free Registration"}
                </S.EnglishLine>
              </S.SubmitLabel>
              <i aria-hidden="true">→</i>
            </S.SubmitButton>
            <p>
              제출하신 정보는 등록 검토 목적으로만 사용합니다.
              <S.EnglishLine>
                Your information will only be used to review this application.
              </S.EnglishLine>
            </p>
          </S.SubmitDock>
        </S.Form>
      </S.Shell>

      {receipt && (
        <S.SuccessBackdrop role="presentation">
          <S.SuccessModal
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
          >
            <S.SuccessMark aria-hidden="true">✓</S.SuccessMark>
            <S.SuccessKicker>APPLICATION RECEIVED</S.SuccessKicker>
            <h2 id="success-title">
              신청이 접수되었습니다!
              <S.EnglishLine>Your application has been received!</S.EnglishLine>
            </h2>
            <p>
              신청 내용과 등록한 사진을 확인해 48시간 이내에 연락드리겠습니다.
              <S.EnglishLine>
                We will review your application and uploaded photos, then
                contact you within 48 hours.
              </S.EnglishLine>
            </p>
            <S.Receipt>
              <span>
                접수번호
                <S.EnglishLine>Application No.</S.EnglishLine>
              </span>
              <strong>{receiptCode}</strong>
            </S.Receipt>
            <S.KakaoButton type="button" onClick={copyKakaoId}>
              <S.ButtonLabel>
                카카오톡 ID 복사 · {contactKakaoId}
                <S.EnglishLine>
                  Copy KakaoTalk ID · {contactKakaoId}
                </S.EnglishLine>
              </S.ButtonLabel>
            </S.KakaoButton>
            <S.DoneButton
              type="button"
              onClick={() => {
                setReceipt(null);
                setForm(EMPTY_FORM);
                clearPhotos();
              }}
            >
              <S.ButtonLabel>
                확인
                <S.EnglishLine>Done</S.EnglishLine>
              </S.ButtonLabel>
            </S.DoneButton>
          </S.SuccessModal>
        </S.SuccessBackdrop>
      )}
    </S.Page>
  );
};
