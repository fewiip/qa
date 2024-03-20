import { Card } from "../../../../shared/components/Card/Card.component"
import styles from './NextAchievementCard.module.css'
import GroupGrayImage from "../../../../assets/images/badgeLevels_colored.png"

export const NextAchievementCard = () => {
  return <Card>
    PRÓXIMAS CONQUISTAS

    <div className={styles.dataWrapper}>

      <div className={styles.row}>
        <img src={GroupGrayImage} className={styles.image} alt="" />
        <div className={styles.achievementProgressBlock}>
          <div className={styles.achievementTitle}>
            <div>sabio nivel 1</div>
            <div className={styles.caption}> 4/10</div>
          </div>

          <progress value="70" max="100">70 %</progress>

          <div className={styles.caption}>complete 10 lições</div>
        </div>
      </div>

      <div className={styles.button}>
        Ver todas
      </div>
    </div>
  </Card>
}