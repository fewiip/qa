import { FunctionComponent, ReactNode } from "react";
import styles from './CenterCard.module.css'

interface CenterCardProps {
    children: ReactNode
}
export const CenterCard: FunctionComponent<CenterCardProps> = ({children}) => {
    return<>
    <div className={styles.cardWrapper}>
        {children}
    </div>
    </>
}