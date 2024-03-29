import { FunctionComponent, InputHTMLAttributes } from "react"
import styles from "./Input.module.css"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export const Input: FunctionComponent<InputProps> = ({hasError, ...props}) => {


  return <input {...props } className={styles.input} style={{
    border: hasError ? '1px solid red': ''
  }} />
}