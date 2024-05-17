import { FunctionComponent, ReactNode } from "react";
import styles from './Tip.module.css'

interface TipProps {
    children: ReactNode
    variant?: 'square' | 'rounded'
}

export const Tip : FunctionComponent<TipProps> = (props) => {
    const {children,variant = 'square'} = props
    function styleTip () {
        if (variant === 'square'){
          return styles.tipSquare as string 
        } 
        return styles.tipRounded as string
      }

    return <>
    <div className={styleTip()}  >
        {(variant === 'square') && <b>Dica: </b>}
        
        {children}
    </div></>
} 