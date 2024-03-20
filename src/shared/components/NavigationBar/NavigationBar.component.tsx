import { Link } from "react-router-dom"
import { RouteEnum } from "../../../routes/router"
import { FunctionComponent, ReactNode } from "react"
import styles from "./NavigationBar.module.css"
import BookColoredImage from "../../../assets/images/book_colored.png"
import GroupGrayImage from "../../../assets/images/group_gray.png"
import ArenaGrayImage from "../../../assets/images/battle2_gray.png"
import ProfileGrayImage from "../../../assets/images/profile_gray.png"

interface NavButtonProps {
  children: ReactNode
  icon: string
  to: string
}

const NavButton: FunctionComponent<NavButtonProps> = ({ children, to, icon}) => {
  
  return <Link to={to} className={styles.navButton} >
    <img src={icon} alt="" />
    <span>{children}</span>
    </Link>
}

export const NavigationBar = () => {
  return <nav className={styles.navigationWrapper}>
    <NavButton to={RouteEnum.LESSONS} icon={BookColoredImage}>Lições</NavButton>
    <NavButton to={RouteEnum.LESSONS} icon={GroupGrayImage}>Turmas</NavButton>
    <NavButton to={RouteEnum.LESSONS} icon={ArenaGrayImage}>Arena</NavButton>
    <NavButton to={RouteEnum.LESSONS} icon={ProfileGrayImage}>Perfil</NavButton>

  </nav>
}