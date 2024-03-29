import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react'
import styles from './Button.module.css'


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode
}
export const Button: FunctionComponent<ButtonProps> = ({children}) => {
  return <button className={styles.buttonWrapper}>{children}</button>
}