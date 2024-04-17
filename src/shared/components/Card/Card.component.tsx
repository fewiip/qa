import { FunctionComponent, ReactNode } from 'react'
import styles from './Card.module.css'

type CardProps = {
  children: ReactNode
}

export const Card: FunctionComponent<CardProps> = ({ children }) => {
  return <div className={styles.card}>{children}</div>
}