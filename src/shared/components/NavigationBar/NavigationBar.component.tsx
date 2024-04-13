import { Link } from "react-router-dom"
import { RouteList } from "../../../routes/router"
import { FunctionComponent, ReactNode } from "react"
import styles from "./NavigationBar.module.css"
import BookColoredImage from "../../../assets/images/book_colored.png"
import BookGreyImage from "../../../assets/images/book_colored.png"
import GroupColoredImage from "../../../assets/images/group_gray.png"
import GroupGreyImage from "../../../assets/images/group_gray.png"
import ArenaColoredImage from "../../../assets/images/battle2_gray.png"
import ArenaGreyImage from "../../../assets/images/battle2_gray.png"
import ProfileColoredImage from "../../../assets/images/profile_gray.png"
import ProfileGreyImage from "../../../assets/images/profile_gray.png"

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

interface NavigationBarProps {
  variant?: 'lessons' | 'classes' | "user"
}

export const NavigationBar: FunctionComponent<NavigationBarProps> = (props) => {
  const { variant = "lessons" } = props

  return <nav className={styles.navigationWrapper}>
    <NavButton to={RouteList.LESSONS} icon={BookColoredImage}>Lições</NavButton>
    <NavButton to={RouteList.LESSONS} icon={GroupGreyImage}>Turmas</NavButton>
    <NavButton to={RouteList.LESSONS} icon={ArenaGreyImage}>Arena</NavButton>
    <NavButton to={RouteList.USER} icon={ProfileGreyImage}>Perfil</NavButton>

  </nav>
}