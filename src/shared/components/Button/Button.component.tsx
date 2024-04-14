import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode,
  color?: 'white' | 'yellow' | 'blue'
  size?: 'small' | 'big'
}



export const Button: FunctionComponent<ButtonProps> = ({children,  ...props}) => {
  const {color = "white"} = props
  const {size = "big"} = props

  return <button className={styles.buttonWrapper} style = {size === 'small' ? {}: { padding: '16px', borderRadius: '8px', fontSize: '12px'} }{...props}>{children}</button>
}