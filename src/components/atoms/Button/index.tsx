import * as S from "./button.style";

interface ButtonGroupProps {
  children: any;
  width?: any;
  height?: number;
  marginTop?: number;
  marginBottom?: number;
  alignItems?: string;
  justifyContent?: string;
}

interface ButtonProps {
  width?: string;
  height?: number;
  size?: string;
  color: string;
  layout: string;
  type: "button" | "submit" | "reset" | undefined;
  label?: string;
  onClick?: any;
  form?: string;
  children?: any;
  disabled?: boolean;
  rotate?: string;
  className?: any;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  ...props
}) => {
  return <S.ButtonGroup {...props}>{children}</S.ButtonGroup>;
};

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <S.Button {...props} className={props.className}>
      {children && children}
      {props.label && props.label}
    </S.Button>
  );
};
