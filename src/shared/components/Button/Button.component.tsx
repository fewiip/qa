import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode,
  color?: 'white' | 'yellow' | 'blue' | 'green' | 'red'
  size?: 'small' | 'big'
}

export const Button: FunctionComponent<ButtonProps> = ({children,  ...props}) => {
  const {color = "white"} = props
  const {size = "big"} = props

  function styleButton () {
    if (color === 'green'){
      return styles.buttonGreen as string 
    }else if (color === 'red') {
      return styles.buttonRed as string 
    }
    return styles.buttonWrapper as string
  }

  return <button className={styleButton()} style = {size === 'small' ? {}: { padding: '16px', borderRadius: '8px', fontSize: '12px'} }{...props}>{children}</button>
}