interface ButtonProps {
  children?: any;
}

export const CheckBox: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <input type="checkbox"></input>;
};
