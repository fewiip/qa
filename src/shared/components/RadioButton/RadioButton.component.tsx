import { FunctionComponent, InputHTMLAttributes } from "react";
import styles from './RadioButton.module.css'

export interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const RadioButton: FunctionComponent<RadioButtonProps> = ({ label, ...props }) => {
  return <label className={styles.radioWrapper} htmlFor={props.id}>
    <input type="radio" {...props} />
    <div  className={styles.radioLabel}>{label}</div>
  </label>
}