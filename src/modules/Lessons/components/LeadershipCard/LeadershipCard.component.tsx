import { FunctionComponent, useMemo } from "react"
import { Card } from "../../../../shared/components/Card/Card.component"
import ProfileColoredImage from "../../../../assets/images/profile_colored.png"
import styles from "./LeadershipCard.module.css"
import { User } from "../../api"

interface LeadershipCardProps {
  users: User[]
}

export const LeadershipCard: FunctionComponent<LeadershipCardProps> = (props) => {
  const { users } = props

  const firstThreeUsers = useMemo(() => {
    // return users
    return users.filter((_i, index) => index <= 2)
  }, [users])


  return <Card>
    <div><b>QUADRO DE LÍDERES</b></div>

    <div>
      {firstThreeUsers.map((user, index) => (
        <div className={styles.userItem} key={user.id}>
          <div className={styles.info}>
            <span>{index + 1}</span>
            <img src={ProfileColoredImage} alt="" />
            <span>{user?.firstName} {user?.lastName}</span>
          </div>
          <span className={styles.score}>{user?.bug} Bugs</span>
        </div>
      ))}
    </div>
{/*
    <div className={styles.button}>
        Ver quadro completo
    </div>
*/}
    
    
  </Card>
}