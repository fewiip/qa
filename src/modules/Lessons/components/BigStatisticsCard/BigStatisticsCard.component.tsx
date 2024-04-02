import { Card } from "../../../../shared/components/Card/Card.component"
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import BugsBottleImage from "../../../../assets/images/jar_colored.png"
import SwordsImage from "../../../../assets/images/battle2_colored.png"
import CoinsImage from "../../../../assets/images/coin_colored.png"
import SprayImage from "../../../../assets/images/spray_colored.png"
import styles from './BigStatisticsCard.module.css'
import { Button } from "../../../../shared/components/Button/Button.component";

export const BigStatisticsCard = () => {

  const { user } = useAuthStore();


  return <>


    <div className={styles.cardWrapper}>
    <div className={styles.statisticsCardLine}>
      <div className={styles.titulo}>
      MINHAS ESTATISTICAS
      </div>
       </div>


      <div className={styles.statisticsCardLine}>
        <div className={styles.statisticCardInfo}>
          <div className={styles.statisticsCardItem}>
            <img src={BugsBottleImage} alt="" />
          </div>
          <div className={styles.statisticsCardItem}>
            <b>{user?.bug}</b>  <br />
            Bugs
          </div>
        </div>


        <div className={styles.statisticCardInfo}>
          <div className={styles.statisticsCardItem}>
            <img src={CoinsImage} alt="" />
          </div>
          <div className={styles.statisticsCardItem}>
            <b>{user?.coin}</b>  <br />
            Moedas
          </div>
        </div>


        <div className={styles.statisticCardInfo}>

          <div className={styles.statisticsCardItem}>
            <img src={SwordsImage} alt="" />
          </div>
          <div className={styles.statisticsCardItem}>
            <b>{user?.victory}</b>  <br />
            Vitórias
          </div>

        </div>


        <div className={styles.statisticCardInfo}>

          <div className={styles.statisticsCardItem}>
            <img src={SprayImage} alt="" />
          </div>
          <div className={styles.statisticsCardItem}>
            <b>{user?.refill}</b>  <br />
            Refis <br />
            <Button>repor 5</Button>
          </div>
        </div>

      </div>
    </div>
  </>
}