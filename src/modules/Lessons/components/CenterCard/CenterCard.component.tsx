import { FunctionComponent, ReactNode } from "react";
import styles from './CenterCard.module.css'

interface CenterCardProps {
    children: ReactNode
    variant?: 'withPadding' | 'withoutPadding' | 'withoutOverflow'
}

const VARIANT = {
    withPadding: styles.cardWrapper,
    withoutPadding: styles.cardWithoutPadding,
    withoutOverflow:  styles.cardWithoutOverflow,
}
export const CenterCard: FunctionComponent<CenterCardProps> = (props) => {
    const {children, variant = 'withPadding' } = props
    return<>
    <div className={VARIANT[variant]}>
        {children}
    </div>
    </>
}