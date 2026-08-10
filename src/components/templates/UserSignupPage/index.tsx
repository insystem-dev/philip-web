import { Button } from "@/components/atoms/Button";
import { InputText } from "@/components/atoms/Input/InputText";
import { InputCheckbox } from "@/components/atoms/Input/InputCheckbox";
import * as S from "./userSignupPage.style";

export interface UserSignupValues {
  userId: string;
  password: string;
  passwordCheck: string;
  name: string;
  phoneNumber: string;
  email: string;
  termsAgreed: boolean;
}

export interface UserSignupPageProps {
  handleSubmit: any;
  Submit: (data: any) => void;
  register: any;
  errors: any;
  /** 아이디 중복확인 통과 여부 */
  isIdChecked: boolean;
  /** 중복확인 요청 진행 중 */
  isIdChecking: boolean;
  /** 회원가입 요청 진행 중 (이중 제출 방지) */
  isLoading: boolean;
  termsAgreed: boolean;
  onTermsChange: (checked: boolean) => void;
  onDuplicateCheck: () => void;
  onBack: () => void;
}

export const UserSignupPage = ({
  handleSubmit,
  Submit,
  register,
  errors,
  isIdChecked,
  isIdChecking,
  isLoading,
  termsAgreed,
  onTermsChange,
  onDuplicateCheck,
  onBack,
}: UserSignupPageProps) => {
  return (
    <S.UserSignupPage>
      <S.SignupBox onSubmit={handleSubmit(Submit)}>
        <S.SignupTit>일반 회원가입</S.SignupTit>

        <S.FieldList>
          <S.IdField>
            <S.IdRow>
              <InputText
                label="아이디"
                required
                layout="row"
                size="lg"
                width="100%"
                placeholder="영문, 숫자, 밑줄 4~30자"
                register={register("userId")}
                name="userId"
              />
              <Button
                type="button"
                width="92px"
                height={40}
                color="dark"
                layout="solid"
                label="중복확인"
                disabled={isIdChecking || isLoading}
                onClick={onDuplicateCheck}
              />
            </S.IdRow>
            {errors?.userId?.message ? (
              <S.IdMessage status="error">{errors.userId.message}</S.IdMessage>
            ) : isIdChecked ? (
              <S.IdMessage status="success">
                사용 가능한 아이디입니다.
              </S.IdMessage>
            ) : (
              ""
            )}
          </S.IdField>

          <InputText
            label="비밀번호"
            required
            layout="row"
            size="lg"
            width="100%"
            type="password"
            placeholder="8자 이상 입력해 주세요"
            register={register("password")}
            errors={errors}
            name="password"
          />

          <InputText
            label="비밀번호 확인"
            required
            layout="row"
            size="lg"
            width="100%"
            type="password"
            placeholder="비밀번호를 다시 입력해 주세요"
            register={register("passwordCheck")}
            errors={errors}
            name="passwordCheck"
          />

          <InputText
            label="이름"
            required
            layout="row"
            size="lg"
            width="100%"
            placeholder="이름 입력"
            register={register("name")}
            errors={errors}
            name="name"
          />

          <InputText
            label="휴대폰 번호"
            required
            layout="row"
            size="lg"
            width="100%"
            type="tel"
            placeholder="010-0000-0000"
            register={register("phoneNumber")}
            errors={errors}
            name="phoneNumber"
          />

          <InputText
            label="이메일 (선택)"
            layout="row"
            size="lg"
            width="100%"
            type="email"
            placeholder="philip@example.com"
            register={register("email")}
            errors={errors}
            name="email"
          />
        </S.FieldList>

        <S.Terms>
          <strong>개인정보 수집 및 이용 동의</strong>
          <p>
            회원가입과 서비스 제공을 위해 아이디, 이름, 휴대폰 번호, 이메일을
            수집하며 회원 탈퇴 시까지 보관합니다.
          </p>
          <InputCheckbox
            layout="row"
            displayValue="개인정보 수집 및 이용에 동의합니다."
            checked={termsAgreed}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onTermsChange(event.target.checked)
            }
          />
          {errors?.termsAgreed?.message ? (
            <S.IdMessage status="error">
              {errors.termsAgreed.message}
            </S.IdMessage>
          ) : (
            ""
          )}
        </S.Terms>

        <S.ButtonArea>
          <Button
            type="submit"
            width="100%"
            height={48}
            color="primary"
            layout="solid"
            label="회원가입"
            disabled={isLoading || !termsAgreed}
            className={`${isLoading ? "spinner spinner-white spinner-right" : ""}`}
          />
          <Button
            type="button"
            width="100%"
            height={32}
            color="clear"
            layout="solid"
            label="로그인으로 돌아가기"
            onClick={onBack}
          />
        </S.ButtonArea>
      </S.SignupBox>
    </S.UserSignupPage>
  );
};
