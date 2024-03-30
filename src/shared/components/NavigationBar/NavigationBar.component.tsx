import { Link } from "react-router-dom"
import { RouteList } from "../../../routes/router"
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

export enum PAGES  {
  LESSONS,
  CLASSES,
  ARENA,
  PROFILE
}

const NavButton: FunctionComponent<NavButtonProps> = ({ children, to, icon}) => {
  
  return <Link to={to} className={styles.navButton} >
    <img src={icon} alt="" />
    <span>{children}</span>
    </Link>
}

//navigate(RouteList.LESSONS)

export const NavigationBar = () => {
  return <nav className={styles.navigationWrapper}>
    <NavButton to={RouteList.LESSONS} icon={BookColoredImage}>Lições</NavButton>
    <NavButton to={RouteList.LESSONS} icon={GroupGrayImage}>Turmas</NavButton>
    <NavButton to={RouteList.LESSONS} icon={ArenaGrayImage}>Arena</NavButton>
    <NavButton to={RouteList.PROFILE} icon={ProfileGrayImage}>Perfil</NavButton>

  </nav>
}