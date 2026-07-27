import { AdminSignupPage } from "@/components/templates/AdminSignupPage";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { checkDuplicateId, signUpAPI } from "@/apis/adminApi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const schema = yup
    .object({
      // 실제 필드 의미에 맞는 에러 메시지로 수정
      adminId: yup.string().nullable().required("아이디를 입력해주세요"),
      password: yup.string().nullable().required("비밀번호를 입력해주세요"),
      passwordCheck: yup
        .string()
        .nullable()
        .required("비밀번호를 입력해주세요")
        .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),
      name: yup.string().nullable().required("이름을 입력해주세요"),
      birth: yup.string().nullable().required("생년월일을 입력해주세요"),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
    getValues,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ID 중복확인 통과 여부 (통과해야 회원가입 제출 가능)
  const [isIdChecked, setIsIdChecked] = useState(false);
  const adminIdValue = watch("adminId");

  // 아이디 값이 변경되면 중복확인 상태 리셋
  useEffect(() => {
    setIsIdChecked(false);
  }, [adminIdValue]);

  /** 회원가입 아이디 중복 확인 mutation */
  const checkIdMutation = useMutation("checkDuplicateId", checkDuplicateId, {
    onSuccess() {
      // 중복확인 통과 상태 저장
      setIsIdChecked(true);
      setError("adminId", {
        type: "true",
        message: "사용가능한 아이디 입니다.",
      });
    },
    onError: (err: any) => {
      setIsIdChecked(false);
      setError("adminId", {
        type: "false",
        message: "사용할 수 없는 아이디 입니다.",
      });
    },
  });

  const onDuplicateCheck = () => {
    const id = getValues("adminId");
    const data = {
      id: id,
    };
    checkIdMutation.mutate(data);
  };

  // 회원가입 post mutation
  const signUpMutation = useMutation("signUpAPI", signUpAPI, {
    onSuccess() {
      router.replace("/admin/success");
      setLoading(false);
    },
    onError: (err: any) => {
      console.error(err);
      alert("중복 ID 확인이 필요합니다.");
      setLoading(false);
    },
  });

  const Submit = (data: any) => {
    // ID 중복확인을 통과하지 않으면 제출 차단
    if (!isIdChecked) {
      alert("아이디 중복확인을 먼저 해주세요.");
      return;
    }
    const { adminId, password, passwordCheck, name, birth } = data;
    setLoading(true);
    signUpMutation.mutate({ adminId, password, name, birth });
  };

  return (
    <>
      <AdminSignupPage
        handleSubmit={handleSubmit}
        Submit={Submit}
        register={register}
        errors={errors}
        onDuplicateCheck={onDuplicateCheck}
      />
    </>
  );
};

export default Login;
