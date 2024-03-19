import { Link } from "react-router-dom"
import { RouteEnum } from "../../../routes/router"
import { FunctionComponent, ReactNode } from "react"
import styles from "./NavigationBar.module.css"
import BookColoredImage from "../../../assets/images/book_colored.png"

interface NavButtonProps {
  children: ReactNode
  to: string
}

const NavButton: FunctionComponent<NavButtonProps> = ({ children, to }) => {
  return <Link to={to} className={styles.navButton}>
    <img src={BookColoredImage} alt="" />
    <span>{children}</span>
    </Link>
}

export const NavigationBar = () => {
  return <nav className={styles.navigationWrapper}>
    <NavButton to={RouteEnum.LESSONS}>Lições</NavButton>
  </nav>
}