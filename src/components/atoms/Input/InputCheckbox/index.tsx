import * as S from "../Input.style";

interface CheckProps {
  layout: string;
  themeType?: string;
  label?: string;
  value?: any;
  displayValue?: string;
  checked?: boolean;
  onChange?: any;
  disabled?: boolean;
}

export const InputCheckbox: React.FC<CheckProps> = ({
  layout,
  themeType,
  label,
  value,
  displayValue,
  checked,
  onChange,
  disabled,
}) => {
  return (
    <S.InputCommon layout={layout} themeType={themeType}>
      <label>
        {label && label}
        <input
          type="checkbox"
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <span className="displayValue">{displayValue && displayValue}</span>
      </label>
    </S.InputCommon>
  );
};
