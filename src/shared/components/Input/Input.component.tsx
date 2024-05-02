import { FunctionComponent, InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  icon?: string;
  onIconClick?: () => void
}

export const Input: FunctionComponent<InputProps> = ({
  hasError,
  icon,
  onIconClick,
  ...props
}) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        {...props}
        className={styles.input}
        style={{
          border: hasError ? "1px solid red" : "",
        }}
      />
      {icon && <img src={icon} className={styles.icon} onClick={onIconClick}/>}
    </div>
  );
};
