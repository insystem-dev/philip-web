import { AdminSignupPage } from "@/components/templates/AdminSignupPage";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { checkDuplicateId, signUpAPI } from "@/apis/adminApi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const schema = yup
    .object({
      adminId: yup.string().nullable().required("구분을 선택해주세요"),
      password: yup.string().nullable().required("비밀번호를 입력해주세요"),
      passwordCheck: yup
        .string()
        .nullable()
        .required("비밀번호를 입력해주세요")
        .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),
      name: yup.string().nullable().required("등록일을 선택해주세요"),
      birth: yup.string().nullable().required("사용여부를 선택해주세요"),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  /** 회원가입 아이디 중복 확인 mutation */
  const checkIdMutation = useMutation("checkDuplicateId", checkDuplicateId, {
    onSuccess() {
      setError("adminId", {
        type: "true",
        message: "사용가능한 아이디 입니다.",
      });
    },
    onError: (err: any) => {
      setError("adminId", {
        type: "false",
        message: "사용할 수 없는 아이디 입니다.",
      });
    },
  });

  const onDuplicateCheck = () => {
    const id = getValues("adminId");
    console.log(id);
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
      console.log(err);
      alert("중복 ID 확인이 필요합니다.");
      setLoading(false);
    },
  });

  const Submit = (data: any) => {
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
