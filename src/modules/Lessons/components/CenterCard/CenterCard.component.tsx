import { FunctionComponent, ReactNode } from "react";
import styles from './CenterCard.module.css'

interface CenterCardProps {
    children: ReactNode
    variant?: 'withPadding' | 'withoutPadding'
}
export const CenterCard: FunctionComponent<CenterCardProps> = (props) => {
    const {children, variant = 'withPadding' } = props
    return<>
    <div className={variant == 'withoutPadding'? styles.cardWithoutPadding : styles.cardWrapper}>
        {children}
    </div>
    </>
}