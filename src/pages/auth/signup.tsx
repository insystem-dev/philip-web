import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";
import { checkUserIdAPI, localSignupAPI } from "@/apis/kakaoApi";
import { UserSignupPage } from "@/components/templates/UserSignupPage";
import { AlertModal } from "@/components/molecules/AlertModal";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

/** 서버 DTO(LocalSignupDto)와 동일한 검증 규칙 */
interface SignupValidationMessages {
  userIdRequired: string;
  userIdFormat: string;
  userIdLength: string;
  passwordRequired: string;
  passwordLength: string;
  passwordConfirmRequired: string;
  passwordMismatch: string;
  nameRequired: string;
  phoneRequired: string;
  phoneInvalid: string;
  emailInvalid: string;
  termsRequired: string;
}

const createSignupSchema = (validation: SignupValidationMessages) => yup
  .object({
    userId: yup
      .string()
      .required(validation.userIdRequired)
      .matches(/^[a-zA-Z0-9_]+$/, validation.userIdFormat)
      .min(4, validation.userIdLength)
      .max(30, validation.userIdLength),
    password: yup
      .string()
      .required(validation.passwordRequired)
      .min(8, validation.passwordLength)
      .max(50, validation.passwordLength),
    passwordCheck: yup
      .string()
      .required(validation.passwordConfirmRequired)
      .oneOf([yup.ref("password")], validation.passwordMismatch),
    name: yup.string().required(validation.nameRequired),
    phoneNumber: yup
      .string()
      .required(validation.phoneRequired)
      .matches(/^01\d-\d{3,4}-\d{4}$/, validation.phoneInvalid),
    // 이메일은 선택 입력 — 비워두면 검증하지 않고 서버로도 보내지 않는다
    email: yup.string().email(validation.emailInvalid),
    termsAgreed: yup
      .boolean()
      .oneOf([true], validation.termsRequired),
  })
  .required();

/** 숫자만 남겨 010-0000-0000 형태로 자동 포맷 */
const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/[^0-9]/g, "").slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
};

const UserSignup = () => {
  const router = useRouter();
  const { locale, message } = usePhilipLocale();
  const schema = useMemo(
    () => createSignupSchema(message.signup.validation),
    [message.signup.validation]
  );
  const [alertModal, setAlertModal] = useState<{
    title: string;
    message: string;
    confirmLabel?: string;
    onConfirm: () => void;
  } | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    setError,
    clearErrors,
    getValues,
    trigger,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      userId: "",
      password: "",
      passwordCheck: "",
      name: "",
      phoneNumber: "",
      email: "",
      termsAgreed: false,
    },
  });

  // 아이디 중복확인 통과 여부 (통과해야 회원가입 제출 가능)
  const [isIdChecked, setIsIdChecked] = useState(false);
  const userIdValue = watch("userId");
  const phoneNumberValue = watch("phoneNumber");
  const termsAgreed = watch("termsAgreed");

  // 아이디 값이 변경되면 중복확인 상태 리셋
  useEffect(() => {
    setIsIdChecked(false);
  }, [userIdValue]);

  // 휴대폰 번호 입력 시 하이픈 자동 삽입
  useEffect(() => {
    if (!phoneNumberValue) return;
    const formatted = formatPhoneNumber(phoneNumberValue);
    if (formatted !== phoneNumberValue) setValue("phoneNumber", formatted);
  }, [phoneNumberValue, setValue]);

  /** 아이디 중복 확인 mutation */
  const checkIdMutation = useMutation(checkUserIdAPI, {
    onSuccess() {
      setIsIdChecked(true);
      clearErrors("userId");
    },
    onError: (error: any) => {
      setIsIdChecked(false);
      setError("userId", {
        type: "duplicate",
        message:
          locale === "ko"
            ? error?.response?.data?.message || message.signup.duplicateUserId
            : message.signup.duplicateUserId,
      });
    },
  });

  const onDuplicateCheck = async () => {
    // 형식이 맞을 때만 서버에 확인 요청
    const isValid = await trigger("userId");
    if (!isValid) return;
    checkIdMutation.mutate(getValues("userId"));
  };

  /** 회원가입 mutation */
  const signupMutation = useMutation(localSignupAPI, {
    onSuccess() {
      setAlertModal({
        title: message.signup.successTitle,
        message: message.signup.successMessage,
        confirmLabel: message.auth.signIn,
        onConfirm: () => router.replace("/auth/login"),
      });
    },
    onError: (error: any) => {
      const status = error?.response?.status;
      const serverMessage = error?.response?.data?.message;

      // 중복 값(409)은 해당 필드 아래에 노출
      if (status === 409) {
        const isIdDuplicated = /아이디|user\s?id/i.test(serverMessage || "");
        const isPhoneDuplicated = /휴대폰|전화|phone|mobile/i.test(
          serverMessage || ""
        );

        // 동시 가입 경합 시 서버가 "아이디 또는 휴대폰" 으로 응답 — 어느 쪽인지 알 수 없어 모달로 안내
        if (isIdDuplicated && isPhoneDuplicated) {
          setIsIdChecked(false);
          setAlertModal({
            title: message.signup.failureTitle,
            message:
              locale === "ko" && serverMessage
                ? serverMessage
                : message.signup.duplicateAccount,
            onConfirm: () => setAlertModal(null),
          });
          return;
        }
        if (isPhoneDuplicated) {
          setError("phoneNumber", {
            type: "duplicate",
            message:
              locale === "ko" && serverMessage
                ? serverMessage
                : message.signup.duplicatePhone,
          });
        } else {
          setIsIdChecked(false);
          setError("userId", {
            type: "duplicate",
            message:
              locale === "ko" && serverMessage
                ? serverMessage
                : message.signup.duplicateUserId,
          });
        }
        return;
      }

      setAlertModal({
        title: message.signup.failureTitle,
        message:
          locale === "ko" && serverMessage
            ? serverMessage
            : message.signup.failureMessage,
        onConfirm: () => setAlertModal(null),
      });
    },
  });

  const Submit = (data: any) => {
    // 아이디 중복확인을 통과하지 않으면 제출 차단
    if (!isIdChecked) {
      setError("userId", {
        type: "required",
        message: message.signup.checkUserIdFirst,
      });
      return;
    }
    // 이중 제출 방지
    if (signupMutation.isLoading) return;

    const email = data.email?.trim();
    signupMutation.mutate({
      userId: data.userId,
      password: data.password,
      // 서버 DTO(LocalSignupDto)가 요구하는 필수 필드
      passwordConfirm: data.passwordCheck,
      name: data.name,
      phoneNumber: data.phoneNumber,
      // 선택 항목 — 비워두면 서버로 보내지 않는다
      ...(email ? { email } : {}),
      termsAgreed: true,
    });
  };

  return (
    <>
      <UserSignupPage
        handleSubmit={handleSubmit}
        Submit={Submit}
        register={register}
        errors={errors}
        isIdChecked={isIdChecked}
        isIdChecking={checkIdMutation.isLoading}
        isLoading={signupMutation.isLoading}
        termsAgreed={!!termsAgreed}
        onTermsChange={(checked) =>
          setValue("termsAgreed", checked, { shouldValidate: true })
        }
        onDuplicateCheck={onDuplicateCheck}
        onBack={() => router.push("/auth/login")}
      />
      {alertModal && (
        <AlertModal
          title={alertModal.title}
          message={alertModal.message}
          confirmLabel={alertModal.confirmLabel}
          onConfirm={alertModal.onConfirm}
        />
      )}
    </>
  );
};

export default UserSignup;
