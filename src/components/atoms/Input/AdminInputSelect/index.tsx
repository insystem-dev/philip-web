import type { UseFormRegisterReturn } from "react-hook-form";
import * as S from "../Input.style";

interface SelectProps {
  width?: string;
  size: string;
  layout: string;
  themeType: string;
  label?: string;
  placeholder?: string;
  options: any;
  register?: UseFormRegisterReturn;
  onChange?: any;
  errors?: any;
  name?: string;
}

export const AdminInputSelect: React.FC<SelectProps> = ({
  width,
  layout,
  size,
  options,
  label,
  themeType,
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
        <select {...register} onChange={onChange}>
          {placeholder && <option>{placeholder}</option>}
          {options?.map((option: any, idx: number) => {
            return (
              <option key={idx} value={option.oid}>
                {option.name}
              </option>
            );
          })}
        </select>
        {errors ? <p className="err-message">{errors[name!]?.message}</p> : ""}
      </label>
    </S.InputCommon>
  );
};
