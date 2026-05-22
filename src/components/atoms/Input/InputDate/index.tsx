import * as S from "../Input.style";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextProps {
  width?: string;
  size: string;
  layout: string;
  label?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  errors?: any;
  name?: string;
}

export const InputDate: React.FC<TextProps> = ({
  width,
  size,
  layout,
  label,
  placeholder,
  register,
  errors,
  name,
}) => {
  return (
    <S.InputCommon layout={layout} size={size} width={width}>
      <label>
        {label && label}
        <input type="date" placeholder={placeholder} {...register} />
        {errors ? <p className="err-message">{errors[name!]?.message}</p> : ""}
      </label>
    </S.InputCommon>
  );
};
