import { FunctionComponent, ReactNode } from 'react'
import styles from './CenterContent.module.css'

interface CenterContentProps {
    children: ReactNode
}

export const CenterContent: FunctionComponent<CenterContentProps> =({children}) => {
    return <>
    <div className={styles.contentWrapper}>
        {children}
    </div>
    </>
}