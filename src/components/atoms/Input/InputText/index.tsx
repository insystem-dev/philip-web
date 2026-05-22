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
}) => {
  return (
    <S.InputCommon
      layout={layout}
      themeType={themeType}
      size={size}
      width={width}
    >
      <label>
        {label && label}
        <input
          type={type || "text"}
          placeholder={placeholder}
          {...register}
          onChange={onChange}
          value={value}
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
