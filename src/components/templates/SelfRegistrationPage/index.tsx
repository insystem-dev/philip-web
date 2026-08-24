import { FormEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
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
  location: "",
  oneLineIntro: "",
  servicesPrices: "",
  promotion: "",
  photoDeliveryAgreed: false,
  privacyAgreed: false,
  website: "",
};

const getErrorMessage = (error: any) =>
  error?.response?.data?.message ||
  "신청서를 전송하지 못했습니다. 잠시 후 다시 시도해 주세요.";

export const SelfRegistrationPage = () => {
  const [form, setForm] = useState<BusinessRegistrationPayload>(EMPTY_FORM);
  const [receipt, setReceipt] = useState<BusinessRegistrationReceipt | null>(
    null
  );
  const [validation, setValidation] = useState("");
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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidation("");

    if (!form.phone?.trim() && !form.kakaoId?.trim()) {
      setValidation("전화번호 또는 카카오톡 ID 중 하나를 입력해 주세요.");
      document.getElementById("contact-section")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }
    if (!form.photoDeliveryAgreed) {
      setValidation("사진 자료 전송 안내를 확인해 주세요.");
      return;
    }
    if (!form.privacyAgreed) {
      setValidation("개인정보 수집 및 이용에 동의해 주세요.");
      return;
    }

    mutation.mutate({
      ...form,
      businessName: form.businessName.trim(),
      category: form.category.trim(),
      businessHours: form.businessHours.trim(),
      holiday: form.holiday?.trim(),
      phone: form.phone?.trim(),
      kakaoId: form.kakaoId?.trim(),
      location: form.location.trim(),
      oneLineIntro: form.oneLineIntro.trim(),
      servicesPrices: form.servicesPrices.trim(),
      promotion: form.promotion?.trim(),
    });
  };

  const copyKakaoId = async () => {
    try {
      await navigator.clipboard.writeText(contactKakaoId);
      alert(`카카오톡 ID ${contactKakaoId}가 복사되었습니다.`);
    } catch {
      window.prompt("카카오톡 ID를 복사해 주세요.", contactKakaoId);
    }
  };

  return (
    <S.Page>
      <S.FlagGlow aria-hidden="true" />
      <S.Shell>
        <S.Hero>
          <S.Eyebrow>PHILIP69 × LOCAL BUSINESS</S.Eyebrow>
          <S.Deadline>9월 30일까지</S.Deadline>
          <S.HeroTitle>
            무료 등록
            <br />및 홍보 신청서
          </S.HeroTitle>
          <S.HeroCopy>
            양식을 보내주시면 확인 후 <strong>48시간 이내</strong>에 등록해
            드립니다.
          </S.HeroCopy>
          <S.HeroNote>
            광고비와 수수료 없이 관광객과 업주님을 직접 연결합니다.
          </S.HeroNote>
          <S.Sun aria-hidden="true">
            <span />
          </S.Sun>
        </S.Hero>

        <S.Form onSubmit={onSubmit} noValidate={false}>
          <S.FormIntro>
            <span>필립69 무료 등록 신청</span>
            <strong>모바일에서 약 3분이면 작성할 수 있어요.</strong>
            <p>
              <i>*</i> 표시 항목은 필수입니다.
            </p>
          </S.FormIntro>

          <S.Section>
            <S.SectionHead>
              <S.Step>01</S.Step>
              <div>
                <h2>업소 기본 정보</h2>
                <p>고객에게 보여줄 기본 정보를 알려주세요.</p>
              </div>
            </S.SectionHead>
            <S.FieldGrid>
              <S.Field $wide>
                <label htmlFor="businessName">
                  업소명 (한글/영문) <b>*</b>
                </label>
                <input
                  id="businessName"
                  required
                  maxLength={200}
                  autoComplete="organization"
                  placeholder="예: 필립 식당 / Philip Restaurant"
                  value={form.businessName}
                  onChange={(event) =>
                    setValue("businessName", event.target.value)
                  }
                />
              </S.Field>
              <S.Field>
                <label htmlFor="category">
                  카테고리 <b>*</b>
                </label>
                <input
                  id="category"
                  required
                  maxLength={100}
                  placeholder="예: 식당, 마사지, 호텔"
                  value={form.category}
                  onChange={(event) => setValue("category", event.target.value)}
                />
              </S.Field>
              <S.Field>
                <label htmlFor="businessHours">
                  영업 시간 <b>*</b>
                </label>
                <input
                  id="businessHours"
                  required
                  maxLength={200}
                  placeholder="예: 매일 10:00–22:00"
                  value={form.businessHours}
                  onChange={(event) =>
                    setValue("businessHours", event.target.value)
                  }
                />
              </S.Field>
              <S.Field $wide>
                <label htmlFor="holiday">휴무일</label>
                <input
                  id="holiday"
                  maxLength={200}
                  placeholder="예: 매주 월요일 / 연중무휴"
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
                <h2>연락처 및 위치</h2>
                <p>전화번호와 카카오톡 ID 중 하나는 꼭 입력해 주세요.</p>
              </div>
            </S.SectionHead>
            <S.FieldGrid>
              <S.Field>
                <label htmlFor="phone">전화번호</label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  maxLength={50}
                  autoComplete="tel"
                  placeholder="예: 0917-000-0000"
                  value={form.phone}
                  onChange={(event) => setValue("phone", event.target.value)}
                />
              </S.Field>
              <S.Field>
                <label htmlFor="kakaoId">카카오톡 ID</label>
                <input
                  id="kakaoId"
                  maxLength={100}
                  placeholder="연락 가능한 카카오톡 ID"
                  value={form.kakaoId}
                  onChange={(event) => setValue("kakaoId", event.target.value)}
                />
              </S.Field>
              <S.Field $wide>
                <label htmlFor="location">
                  구글맵 위치 또는 주소 <b>*</b>
                </label>
                <textarea
                  id="location"
                  required
                  maxLength={1000}
                  rows={3}
                  placeholder="구글맵 공유 링크 또는 상세 주소를 입력해 주세요."
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
                <h2>홍보 내용</h2>
                <p>업소의 매력을 실제 고객에게 소개해 주세요.</p>
              </div>
            </S.SectionHead>
            <S.FieldGrid>
              <S.Field $wide>
                <label htmlFor="oneLineIntro">
                  우리 업소 한줄 소개 <b>*</b>
                </label>
                <input
                  id="oneLineIntro"
                  required
                  maxLength={500}
                  placeholder="예: 마닐라에서 만나는 정통 한국의 맛"
                  value={form.oneLineIntro}
                  onChange={(event) =>
                    setValue("oneLineIntro", event.target.value)
                  }
                />
              </S.Field>
              <S.Field $wide>
                <label htmlFor="servicesPrices">
                  주요 메뉴/서비스 및 가격 <b>*</b>
                </label>
                <textarea
                  id="servicesPrices"
                  required
                  maxLength={3000}
                  rows={5}
                  placeholder={"대표 메뉴와 가격을 줄바꿈으로 적어주세요.\n예: 삼겹살 1인분 ₱450"}
                  value={form.servicesPrices}
                  onChange={(event) =>
                    setValue("servicesPrices", event.target.value)
                  }
                />
              </S.Field>
              <S.Field $wide>
                <label htmlFor="promotion">현재 진행 중인 프로모션</label>
                <textarea
                  id="promotion"
                  maxLength={2000}
                  rows={3}
                  placeholder="없을 경우 비워두셔도 됩니다."
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
                <h2>사진 자료 전송</h2>
                <p>신청 완료 후 필립69 카카오 채팅방으로 보내주세요.</p>
              </div>
            </S.SectionHead>
            <S.PhotoGuide>
              <S.PhotoItem>
                <span>1</span>
                <div>
                  <strong>업소 간판/외부 사진</strong>
                  <p>1장</p>
                </div>
              </S.PhotoItem>
              <S.PhotoItem>
                <span>2</span>
                <div>
                  <strong>내부 전경 사진</strong>
                  <p>최대 5장</p>
                </div>
              </S.PhotoItem>
              <S.PhotoItem>
                <span>3</span>
                <div>
                  <strong>선명한 메뉴판 사진</strong>
                  <p>최대 5장</p>
                </div>
              </S.PhotoItem>
            </S.PhotoGuide>
            <S.Caution>
              <strong>촬영이 필요하신가요?</strong>
              <span>촬영 요청 시 최소한의 인건비가 청구될 수 있습니다.</span>
            </S.Caution>
            <S.CheckLabel>
              <input
                type="checkbox"
                checked={form.photoDeliveryAgreed}
                onChange={(event) =>
                  setValue("photoDeliveryAgreed", event.target.checked)
                }
              />
              <span aria-hidden="true" />
              신청 후 사진 자료를 카카오 채팅방으로 별도 전송하겠습니다.
            </S.CheckLabel>
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
              <b>[필수]</b> 등록 처리와 연락을 위한 개인정보 수집 및 이용에
              동의합니다.
            </S.CheckLabel>
            <p>
              수집 항목: 업소 정보, 전화번호, 카카오톡 ID, 위치 · 이용 목적:
              업소 등록 검토 및 연락
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
              <span>{mutation.isLoading ? "신청서 전송 중" : "무료 등록 신청하기"}</span>
              <i aria-hidden="true">→</i>
            </S.SubmitButton>
            <p>제출하신 정보는 등록 검토 목적으로만 사용합니다.</p>
          </S.SubmitDock>
        </S.Form>
      </S.Shell>

      {receipt && (
        <S.SuccessBackdrop role="presentation">
          <S.SuccessModal role="dialog" aria-modal="true" aria-labelledby="success-title">
            <S.SuccessMark aria-hidden="true">✓</S.SuccessMark>
            <S.SuccessKicker>APPLICATION RECEIVED</S.SuccessKicker>
            <h2 id="success-title">신청이 접수되었습니다!</h2>
            <p>
              보내주신 내용을 확인해 48시간 이내에 연락드리겠습니다. 이제 사진
              자료를 카카오 채팅방으로 보내주세요.
            </p>
            <S.Receipt>
              <span>접수번호</span>
              <strong>{receiptCode}</strong>
            </S.Receipt>
            <S.KakaoButton type="button" onClick={copyKakaoId}>
              카카오톡 ID 복사 · {contactKakaoId}
            </S.KakaoButton>
            <S.DoneButton
              type="button"
              onClick={() => {
                setReceipt(null);
                setForm(EMPTY_FORM);
              }}
            >
              확인
            </S.DoneButton>
          </S.SuccessModal>
        </S.SuccessBackdrop>
      )}
    </S.Page>
  );
};
