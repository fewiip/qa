import { FunctionComponent, ReactNode } from "react"
import { NavigationBar } from "../NavigationBar/NavigationBar.component"
import styles from './AppLayout.module.css'
interface AppLayoutProps {
  children: ReactNode
  variant: 'grey' | 'white'
}

const VARIANT_COLOR = {
  grey: '#EBEBEB',
  white: 'white' 
}

export const AppLayout: FunctionComponent<AppLayoutProps> = (props) => {
  const { children, variant } = props

  return (
    <div className={styles.appLayoutWrapper} style={{ backgroundColor: VARIANT_COLOR[variant] }}>
      <NavigationBar />

      <section>{children}</section>
    </div>
  )
}