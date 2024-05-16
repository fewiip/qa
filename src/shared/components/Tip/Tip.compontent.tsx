import { FunctionComponent, ReactNode } from "react";
import styles from './Tip.module.css'

interface TipProps {
    children: ReactNode
}

export const Tip : FunctionComponent<TipProps> = (props) => {
    const {children} = props
    return <>
    <div className={styles.tipWrapper}>
        <b>Dica: </b>
        {children}
    </div></>
}