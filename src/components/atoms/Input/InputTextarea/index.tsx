import * as S from "../Input.style";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextProps {
  width?: string;
  size: string;
  layout: string;
  themeType: string;
  label?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  onChange?: any;
  errors?: any;
  name?: string;
}

export const InputTextarea: React.FC<TextProps> = ({
  width,
  size,
  layout,
  themeType,
  label,
  placeholder,
  register,
  onChange,
  errors,
  name,
}) => {
  return (
    <S.InputCommon
      themeType={themeType}
      layout={layout}
      size={size}
      width={width}
    >
      <label>
        {label && label}
        <textarea placeholder={placeholder} {...register} onChange={onChange} />
        {errors ? <p className="err-message">{errors[name!]?.message}</p> : ""}
      </label>
    </S.InputCommon>
  );
};
