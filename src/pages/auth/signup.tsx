import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";
import { checkUserIdAPI, localSignupAPI } from "@/apis/kakaoApi";
import { UserSignupPage } from "@/components/templates/UserSignupPage";
import { AlertModal } from "@/components/molecules/AlertModal";

/** 서버 DTO(LocalSignupDto)와 동일한 검증 규칙 */
const schema = yup
  .object({
    userId: yup
      .string()
      .required("아이디를 입력해주세요")
      .matches(/^[a-zA-Z0-9_]+$/, "영문, 숫자, 밑줄(_)만 사용할 수 있습니다")
      .min(4, "아이디는 4~30자로 입력해주세요")
      .max(30, "아이디는 4~30자로 입력해주세요"),
    password: yup
      .string()
      .required("비밀번호를 입력해주세요")
      .min(8, "비밀번호는 8~50자로 입력해주세요")
      .max(50, "비밀번호는 8~50자로 입력해주세요"),
    passwordCheck: yup
      .string()
      .required("비밀번호를 다시 입력해주세요")
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다"),
    name: yup.string().required("이름을 입력해주세요"),
    phoneNumber: yup
      .string()
      .required("휴대폰 번호를 입력해주세요")
      .matches(/^01\d-\d{3,4}-\d{4}$/, "올바른 휴대폰 번호를 입력해주세요"),
    // 이메일은 선택 입력 — 비워두면 검증하지 않고 서버로도 보내지 않는다
    email: yup.string().email("올바른 이메일 형식이 아닙니다"),
    termsAgreed: yup
      .boolean()
      .oneOf([true], "개인정보 수집 및 이용에 동의해 주세요"),
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
          error?.response?.data?.message || "이미 사용 중인 아이디입니다.",
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
        title: "회원가입 완료",
        message: "가입이 완료되었습니다.\n로그인 후 이용해 주세요.",
        confirmLabel: "로그인하기",
        onConfirm: () => router.replace("/auth/login"),
      });
    },
    onError: (error: any) => {
      const status = error?.response?.status;
      const message =
        error?.response?.data?.message || "회원가입에 실패했습니다.";

      // 중복 값(409)은 해당 필드 아래에 노출
      if (status === 409) {
        const isIdDuplicated = /아이디/.test(message);
        const isPhoneDuplicated = /휴대폰|전화|phone/i.test(message);

        // 동시 가입 경합 시 서버가 "아이디 또는 휴대폰" 으로 응답 — 어느 쪽인지 알 수 없어 모달로 안내
        if (isIdDuplicated && isPhoneDuplicated) {
          setIsIdChecked(false);
          setAlertModal({
            title: "회원가입 실패",
            message,
            onConfirm: () => setAlertModal(null),
          });
          return;
        }
        if (isPhoneDuplicated) {
          setError("phoneNumber", { type: "duplicate", message });
        } else {
          setIsIdChecked(false);
          setError("userId", { type: "duplicate", message });
        }
        return;
      }

      setAlertModal({
        title: "회원가입 실패",
        message,
        onConfirm: () => setAlertModal(null),
      });
    },
  });

  const Submit = (data: any) => {
    // 아이디 중복확인을 통과하지 않으면 제출 차단
    if (!isIdChecked) {
      setError("userId", {
        type: "required",
        message: "아이디 중복확인을 해주세요",
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
