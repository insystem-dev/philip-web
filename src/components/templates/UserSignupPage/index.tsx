import { Button } from "@/components/atoms/Button";
import { InputText } from "@/components/atoms/Input/InputText";
import { InputCheckbox } from "@/components/atoms/Input/InputCheckbox";
import * as S from "./userSignupPage.style";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

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
  const { message } = usePhilipLocale();

  return (
    <S.UserSignupPage>
      <S.SignupBox onSubmit={handleSubmit(Submit)}>
        <S.SignupTit>{message.signup.title}</S.SignupTit>

        <S.FieldList>
          <S.IdField>
            <S.IdRow>
              <InputText
                label={message.signup.userId}
                required
                layout="row"
                size="lg"
                width="100%"
                placeholder={message.signup.userIdPlaceholder}
                register={register("userId")}
                name="userId"
              />
              <Button
                type="button"
                width="92px"
                height={40}
                color="dark"
                layout="solid"
                label={message.signup.duplicateCheck}
                disabled={isIdChecking || isLoading}
                onClick={onDuplicateCheck}
              />
            </S.IdRow>
            {errors?.userId?.message ? (
              <S.IdMessage status="error">{errors.userId.message}</S.IdMessage>
            ) : isIdChecked ? (
              <S.IdMessage status="success">
                {message.signup.userIdAvailable}
              </S.IdMessage>
            ) : (
              ""
            )}
          </S.IdField>

          <InputText
            label={message.signup.password}
            required
            layout="row"
            size="lg"
            width="100%"
            type="password"
            placeholder={message.signup.passwordPlaceholder}
            register={register("password")}
            errors={errors}
            name="password"
          />

          <InputText
            label={message.signup.passwordConfirm}
            required
            layout="row"
            size="lg"
            width="100%"
            type="password"
            placeholder={message.signup.passwordConfirmPlaceholder}
            register={register("passwordCheck")}
            errors={errors}
            name="passwordCheck"
          />

          <InputText
            label={message.signup.name}
            required
            layout="row"
            size="lg"
            width="100%"
            placeholder={message.signup.namePlaceholder}
            register={register("name")}
            errors={errors}
            name="name"
          />

          <InputText
            label={message.signup.phone}
            required
            layout="row"
            size="lg"
            width="100%"
            type="tel"
            placeholder={message.signup.phonePlaceholder}
            register={register("phoneNumber")}
            errors={errors}
            name="phoneNumber"
          />

          <InputText
            label={message.signup.emailOptional}
            layout="row"
            size="lg"
            width="100%"
            type="email"
            placeholder={message.signup.emailPlaceholder}
            register={register("email")}
            errors={errors}
            name="email"
          />
        </S.FieldList>

        <S.Terms>
          <strong>{message.signup.termsTitle}</strong>
          <p>{message.signup.termsDescription}</p>
          <InputCheckbox
            layout="row"
            displayValue={message.signup.termsAgree}
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
            label={message.signup.submit}
            disabled={isLoading || !termsAgreed}
            className={`${isLoading ? "spinner spinner-white spinner-right" : ""}`}
          />
          <Button
            type="button"
            width="100%"
            height={32}
            color="clear"
            layout="solid"
            label={message.signup.backToLogin}
            onClick={onBack}
          />
        </S.ButtonArea>
      </S.SignupBox>
    </S.UserSignupPage>
  );
};
