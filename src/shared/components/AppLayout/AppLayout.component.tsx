import { FunctionComponent, ReactNode } from "react"
import { NavigationBar } from "../NavigationBar/NavigationBar.component"
import styles from './AppLayout.module.css'
interface AppLayoutProps {
  children: ReactNode
}

export const AppLayout: FunctionComponent<AppLayoutProps> = (props) => {
  const { children } = props

  return (
    <div className={styles.appLayoutWrapper}>
      <NavigationBar />

      <section>{children}</section>
    </div>
  )
}