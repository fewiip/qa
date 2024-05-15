import { FunctionComponent, useMemo } from "react"
import { User } from "../../api"
import { Card } from "../../../../shared/components/Card/Card.component"
import ProfileColoredImage from "../../../../assets/images/profile_colored.png"
import styles from "./CourseLeadershipCard.module.css"

interface CourseLeadershipCardProps {
    users: User[]
}
export const CourseLeadershipCard : FunctionComponent<CourseLeadershipCardProps> = (props) => {
    const {users} = props

    const firstThreeUsers = useMemo(() => { 
        return users.filter((_i, index) => index <= 2)
      }, [users])
      
      return <Card>
      <div>QUADRO DE LIDERES</div>
  
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
  
      <div className={styles.button}>
          Ver quadro completo
      </div>
      
      
    </Card>
}