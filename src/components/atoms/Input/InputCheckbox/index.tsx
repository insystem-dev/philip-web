import * as S from "../Input.style";

interface CheckProps {
  layout: string;
  themeType?: string;
  label?: string;
  value?: any;
  displayValue?: string;
  checked?: boolean;
  onChange?: any;
}

export const InputCheckbox: React.FC<CheckProps> = ({
  layout,
  themeType,
  label,
  value,
  displayValue,
  checked,
  onChange,
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
        />
        <span className="displayValue">{displayValue && displayValue}</span>
      </label>
    </S.InputCommon>
  );
};
