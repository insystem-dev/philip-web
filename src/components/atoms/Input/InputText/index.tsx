import * as S from "../Input.style";
import type { UseFormRegisterReturn } from "react-hook-form";

interface TextProps {
  width?: string;
  size: string;
  layout: string;
  themeType?: string;
  label?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  onChange?: any;
  value?: any;
  type?: string;
  errors?: any;
  name?: string;
  /** 라벨 옆에 필수 입력 표시(*) 노출 */
  required?: boolean;
}

export const InputText: React.FC<TextProps> = ({
  width,
  size,
  layout,
  themeType,
  label,
  placeholder,
  register,
  onChange,
  value,
  type,
  errors,
  name,
  required,
}) => {
  return (
    <S.InputCommon
      layout={layout}
      themeType={themeType}
      size={size}
      width={width}
    >
      <label>
        {label && (
          <span className="label-text">
            {label}
            {required && <em className="required">*</em>}
          </span>
        )}
        {/* register 사용 시 onChange/value를 undefined로 덮어써 값이 수집되지 않던 문제 방지 */}
        <input
          type={type || "text"}
          placeholder={placeholder}
          {...register}
          {...(onChange ? { onChange } : {})}
          {...(value !== undefined ? { value } : {})}
        />
        {errors && errors[name!]?.type !== "true" ? (
          <p className="err-message">{errors[name!]?.message}</p>
        ) : (
          ""
        )}
        {errors && errors[name!]?.type === "true" ? (
          <p className="message">{errors[name!]?.message}</p>
        ) : (
          ""
        )}
      </label>
    </S.InputCommon>
  );
};
